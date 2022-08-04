import {
  DeliveryStatus,
  Order,
  SendMailType,
  UpdateOrderInput,
  UpdateOrderMutation,
  UpdateOrderMutationVariables,
} from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { updateOrder } from 'graphql/mutations';
import { useExportOrderCSV } from 'hooks/admins/use-export-order-csv';
import { useSendMail } from 'hooks/commons/use-send-mail';
import { ExtendedOrder } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { useCallback, useState } from 'react';
import { parseResponseError } from 'utilities/parse-response-error';
import { GraphQLResult } from '@aws-amplify/api';
import { useNowDate } from 'stores/use-now-date';
import {
  filteredPromiseFulfilledResult,
  filteredPromiseRejectedResult,
} from 'functions/filter-promise-settled-results';
import { sendErrorMail } from 'functions/send-error-mail';

export const useExportSingleOrderCSVAndUpdateDeliveryStatus = () => {
  const { data: now } = useNowDate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { exportCSV } = useExportOrderCSV();
  const { sendMail } = useSendMail();

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
      console.table(updatedStatuses);

      // 配送状況DB更新成功orderリスト抽出
      const updatedSuccesses = filteredPromiseFulfilledResult(updatedStatuses);
      // const updatedSuccesses = updatedStatuses
      //   .filter((result) => result.status === 'fulfilled')
      //   .map((result) => {
      //     const fulfilled = result as PromiseFulfilledResult<ExtendedOrder<Order>>;
      //     return fulfilled.value;
      //   });

      // 配送状況DB更新失敗orderリスト抽出
      const updatedFails = filteredPromiseRejectedResult(updatedStatuses);
      // const updatedFails = updatedStatuses
      //   .filter((result) => result.status === 'rejected')
      //   .map((result) => {
      //     const fulfilled = result as PromiseRejectedResult;
      //     return fulfilled.reason;
      //   });

      // 配送状況DB更新成功したデータのみCSV出力
      await exportCSV(updatedSuccesses);

      // Promise.allSettledでメール送信処理を同時並列実行
      const sendMailStatuses = await Promise.allSettled(
        updatedSuccesses.map(
          async (order) =>
            // 注文配送メール送信
            await sendMail({
              sendMailType: SendMailType.deliveredSingleOrder,
              products: order.normalizedProducts,
              clinic: order.clinic,
              staff: order.staff,
              deliveryType: order.deliveryType,
            }),
        ),
      );

      const sendMailSuccesses = filteredPromiseFulfilledResult(sendMailStatuses);
      const sendMailFails = filteredPromiseRejectedResult(sendMailStatuses);

      const notificationMailSubject = 'Completed to export a single order csv and to update a delivery status';
      const notificationMailBody = `
Successful updates:\n${updatedSuccesses.map((order) => order.clinic.name).join('\n')}\ntotal: ${
        updatedSuccesses.length
      }\n
Failed updates:\n${updatedFails.join('\n')}\ntotal: ${updatedFails.length}\n
Successful email sending:\n${sendMailSuccesses.join('\n')}\ntotal: ${sendMailSuccesses.length}\n
Failed email sending:\n${sendMailFails.join('\n')}\ntotal: ${sendMailFails.length}\n
`;

      sendErrorMail({
        subject: notificationMailSubject,
        body: notificationMailBody,
      });
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
