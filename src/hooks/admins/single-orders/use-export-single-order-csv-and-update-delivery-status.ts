import { GraphQLResult } from '@aws-amplify/api';
import { DeliveryStatus, Order, UpdateOrderInput, UpdateOrderMutation, UpdateOrderMutationVariables } from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import {
  filteredPromiseFulfilledResult,
  filteredPromiseRejectedResult,
} from 'functions/filter-promise-settled-results';
import { sendErrorMail } from 'functions/send-error-mail';
import { updateOrder } from 'graphql/mutations';
import { useExportOrderCSV } from 'hooks/admins/use-export-order-csv';
import { useSendMail } from 'hooks/commons/use-send-mail';
import { useFetchOrderList } from 'hooks/orders/use-fetch-order-list';
import { ExtendedOrder } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { useCallback, useState } from 'react';
import { useNowDate } from 'stores/use-now-date';
import { useSWRConfig } from 'swr';
import { parseResponseError } from 'utilities/parse-response-error';

export const useExportSingleOrderCSVAndUpdateDeliveryStatus = () => {
  const { data: now } = useNowDate();
  const { mutate } = useSWRConfig();
  const { swrKey } = useFetchOrderList();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { exportCSV } = useExportOrderCSV();
  const { sendDeliverySingleOrderMail } = useSendMail();

  const exportSingleOrderCSVAndUpdateDeliveryStatus = async (orders: ExtendedOrder<Order>[]) => {
    setIsLoading(true);
    try {
      if (!now) {
        throw Error('A current date is not found.');
      }

      if (orders.length === 0) {
        throw Error('注文を選択してください');
      }

      // 未発送ステータスのorderのみステータス変更、CSV出力、メール送信実行。発送済、注文キャンセルステータスは除外
      const filteredOrders = orders.filter((order) => order.deliveryStatus === DeliveryStatus.ordered);

      if (filteredOrders.length === 0) {
        throw Error('未発送の注文を選択してください');
      }

      // 配送状況更新処理実行。内部的にPromise.allSettledでメール送信処理を同時並列実行
      const { updatedSuccesses, updatedFails } = await updateDeliveryStatus(filteredOrders, now);

      // 配送状況更新成功したデータのみCSV出力
      await exportCSV(updatedSuccesses);

      // 配送状況更新成功データのみメール送信。Promise.allSettledでメール送信処理を同時並列実行
      const { sendMailSuccesses, sendMailFails } = await sendDeliverySingleOrderMail(updatedSuccesses);

      // 運用通知メールの件名・本文作成
      const notificationMailSubject = 'Completed to export a single order csv and to update a delivery status';
      const updatedSuccessBody = `Successful delivery status updates:\n${updatedSuccesses
        .map((order) => order.clinic.name)
        .join('\n')}\ntotal: ${updatedSuccesses.length}`;
      const updatedFailedBody = `Failed delivery status updates:\n${updatedFails.join('\n')}\ntotal: ${
        updatedFails.length
      }`;
      const sendMailSuccessBody = `Successful email sending:\n${sendMailSuccesses.join('\n')}\ntotal: ${
        sendMailSuccesses.length
      }`;
      const sendMailFailedBody = `Failed email sending:\n${sendMailFails.join('\n')}\ntotal: ${sendMailFails.length}`;
      const notificationMailBody = `${updatedSuccessBody}\n${updatedFailedBody}\n\n${sendMailSuccessBody}\n${sendMailFailedBody}`;
      // 注文状況更新、メール送信結果を運用メール通知
      await sendErrorMail({
        subject: notificationMailSubject,
        body: notificationMailBody,
      });

      // 注文状況変更反映の為、注文一覧データ再取得・更新
      mutate(swrKey);
    } catch (error) {
      setIsLoading(false);
      const parsedError = parseResponseError(error);
      setError(parsedError);
      throw parsedError;
    }
  };

  const resetState = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return { exportSingleOrderCSVAndUpdateDeliveryStatus, isLoading, error, resetState };
};

const updateDeliveryStatus = async (filteredOrders: ExtendedOrder<Order>[], now: Date) => {
  // Promise.allSettledで並列処理。allSettledは途中でErrorが発生しても全ての処理を最後まで実行する
  const updatedStatuses: PromiseSettledResult<ExtendedOrder<Order>>[] = await Promise.allSettled(
    // mapはasync/awaitを使用するとpromiseを返却
    filteredOrders.map(async (order) => {
      // deliveryStatusを発送済み、発送日時に現在日時を設定
      const input: UpdateOrderInput = {
        id: order.id,
        deliveryStatus: DeliveryStatus.delivered,
        deliveredAt: now.toISOString(),
      };
      const variables: UpdateOrderMutationVariables = { input: input };

      // データ更新実行
      const result = (await API.graphql(
        graphqlOperation(updateOrder, variables),
      )) as GraphQLResult<UpdateOrderMutation>;

      if (!result.data || !result.data.updateOrder) {
        throw Error('It returned null that an API which executed to update order data.');
      }
      console.log('updatedOrder:', result.data.updateOrder);
      // 処理成功時のresolveの値としてorderを返却
      return order;
    }),
  );
  // 配送状況更新成功/失敗orderリスト抽出
  const updatedSuccesses = filteredPromiseFulfilledResult(updatedStatuses);
  const updatedFails = filteredPromiseRejectedResult(updatedStatuses);
  return { updatedSuccesses, updatedFails };
};
