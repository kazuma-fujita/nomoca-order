import { GraphQLResult } from '@aws-amplify/api';
import {
  CreateOrderInput,
  CreateOrderMutation,
  CreateOrderMutationVariables,
  CreateOrderProductInput,
  CreateOrderProductMutation,
  CreateOrderProductMutationVariables,
  DeliveryStatus,
  DeliveryType,
  SubscriptionOrder,
  Type,
} from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import {
  filteredPromiseFulfilledResult,
  filteredPromiseRejectedResult,
} from 'functions/filter-promise-settled-results';
import { sendErrorMail } from 'functions/send-error-mail';
import { createOrder, createOrderProduct } from 'graphql/mutations';
import { useExportOrderCSV } from 'hooks/admins/use-export-order-csv';
import { useSendMail } from 'hooks/commons/use-send-mail';
import { ExtendedOrder } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { useCallback, useState } from 'react';
import { useNowDate } from 'stores/use-now-date';
import { parseResponseError } from 'utilities/parse-response-error';

export const useExportSubscriptionOrderCSVAndCreateOrderHistory = () => {
  const { data: now } = useNowDate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { exportCSV } = useExportOrderCSV();
  const { sendDeliverySubscriptionOrderMail } = useSendMail();

  const exportSubscriptionOrderCSVAndCreateOrderHistory = async (orders: ExtendedOrder<SubscriptionOrder>[]) => {
    setIsLoading(true);
    try {
      if (!now) {
        throw Error('A current date is not found.');
      }

      if (orders.length === 0) {
        throw Error('当月配送予定の定期便がありません');
      }

      // Order履歴データ作成処理。内部的にPromise.allSettledでメール送信処理を同時並列実行
      const { updatedSuccesses, updatedFails } = await createOrderHistory(orders, now);

      // Order履歴データ作成成功したデータのみCSV出力
      await exportCSV(updatedSuccesses);

      // Order履歴データ作成成功データのみメール送信。Promise.allSettledでメール送信処理を同時並列実行
      const { sendMailSuccesses, sendMailFails } = await sendDeliverySubscriptionOrderMail(updatedSuccesses);

      // 運用通知メールの件名・本文作成
      const notificationMailSubject = 'Completed to export a subscription order csv and to create order histories';
      const updatedSuccessBody = `Successful order histories creates:\n${updatedSuccesses
        .map((order) => order.clinic.name)
        .join('\n')}\ntotal: ${updatedSuccesses.length}`;
      const updatedFailedBody = `Failed order histories creates:\n${updatedFails.join('\n')}\ntotal: ${
        updatedFails.length
      }`;
      const sendMailSuccessBody = `Successful email sending:\n${sendMailSuccesses.join('\n')}\ntotal: ${
        sendMailSuccesses.length
      }`;
      const sendMailFailedBody = `Failed email sending:\n${sendMailFails.join('\n')}\ntotal: ${sendMailFails.length}`;
      const notificationMailBody = `${updatedSuccessBody}\n${updatedFailedBody}\n\n${sendMailSuccessBody}\n${sendMailFailedBody}`;

      // Order履歴データ作成、メール送信結果を運用メール通知
      await sendErrorMail({
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

  return { exportSubscriptionOrderCSVAndCreateOrderHistory, isLoading, error, resetState };
};

const createOrderHistory = async (orders: ExtendedOrder<SubscriptionOrder>[], now: Date) => {
  // Promise.allSettledで並列処理。allSettledは途中でErrorが発生しても全ての処理を最後まで実行する
  const updatedStatuses: PromiseSettledResult<ExtendedOrder<SubscriptionOrder>>[] = await Promise.allSettled(
    // mapはasync/awaitを使用するとpromiseを返却
    orders.map(async (order) => {
      if (!order.products || !order.owner) {
        throw Error('It is null that product items which create a order history.');
      }

      // SubscriptionOrderからOrderデータ作成
      const input: CreateOrderInput = {
        type: Type.order,
        deliveryType: DeliveryType.subscription, // 発送方法を定期便に設定
        deliveryStatus: DeliveryStatus.delivered, // 発送状況を発送済みに設定
        deliveredAt: now.toISOString(), // 発送日時は現在日時
        clinicID: order.clinicID,
        staffID: order.staffID,
        owner: order.owner, // Owner権限定期便作成者が注文履歴を見れるようにSubscriptionOrderのownerをOrderのownerコピー
      };

      // Orderデータ作成実行
      const variables: CreateOrderMutationVariables = { input: input };
      const result = (await API.graphql(
        graphqlOperation(createOrder, variables),
      )) as GraphQLResult<CreateOrderMutation>;

      if (!result.data || !result.data.createOrder) {
        throw Error('It returned null that an API which executed to create order data.');
      }
      const newOrder = result.data.createOrder;
      console.log('create new order', newOrder);
      // Order と Product のリレーション作成
      for (const item of order.products.items) {
        if (!item) {
          throw Error('It is null that product items which create a order history.');
        }

        const input: CreateOrderProductInput = {
          orderID: newOrder.id,
          name: item.product.name,
          unitPrice: item.product.unitPrice,
          quantity: item.quantity,
          viewOrder: item.product.viewOrder,
          owner: order.owner,
        };

        console.log('newOrderID', newOrder.id, 'name', item.product.name);
        // データ新規登録実行
        const variables: CreateOrderProductMutationVariables = { input: input };
        const result = (await API.graphql(
          graphqlOperation(createOrderProduct, variables),
        )) as GraphQLResult<CreateOrderProductMutation>;

        if (!result.data || !result.data.createOrderProduct) {
          throw Error('It returned null that an API witch executed to create an order and a product relation data.');
        }
        console.log('newOrderProduct', result.data.createOrderProduct);
      }
      // 処理成功時のresolveの値としてorderを返却
      return order;
    }),
  );
  // 処理成功/失敗orderリスト抽出
  const updatedSuccesses = filteredPromiseFulfilledResult(updatedStatuses);
  const updatedFails = filteredPromiseRejectedResult(updatedStatuses);
  return { updatedSuccesses, updatedFails };
};
