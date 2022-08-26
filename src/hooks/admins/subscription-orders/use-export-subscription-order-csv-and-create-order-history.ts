import { GraphQLResult } from '@aws-amplify/api';
import {
  CreateSubscriptionOrderHistoryInput,
  CreateSubscriptionOrderHistoryMutation,
  CreateSubscriptionOrderHistoryMutationVariables,
  CreateSubscriptionOrderHistoryProductInput,
  CreateSubscriptionOrderHistoryProductMutation,
  CreateSubscriptionOrderHistoryProductMutationVariables,
  SubscriptionOrder,
  Type,
  UpdateSubscriptionOrderInput,
  UpdateSubscriptionOrderMutation,
  UpdateSubscriptionOrderMutationVariables,
} from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { SWRKey } from 'constants/swr-key';
import {
  filteredPromiseFulfilledResult,
  filteredPromiseRejectedResult,
} from 'functions/filter-promise-settled-results';
import { filterNonShippingSubscriptionOrderThisMonth } from 'functions/orders/is-shipping-all-subscription-order-this-month';
import { sendOperationMail } from 'functions/send-operation-mail';
import {
  createSubscriptionOrderHistory,
  createSubscriptionOrderHistoryProduct,
  updateSubscriptionOrder as updateSubscriptionOrderMutation,
} from 'graphql/mutations';
import { useExportOrderCSV } from 'hooks/admins/use-export-order-csv';
import { useSendMail } from 'hooks/commons/use-send-mail';
import { ExtendedOrder } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { useCallback, useState } from 'react';
import { useNowDate } from 'stores/use-now-date';
import { useSWRConfig } from 'swr';
import { parseResponseError } from 'utilities/parse-response-error';

export const useExportSubscriptionOrderCSVAndCreateOrderHistory = () => {
  const { data: now } = useNowDate();
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const { exportCSV } = useExportOrderCSV();
  const { sendDeliverySubscriptionOrderMail, createSendMailResultBody } = useSendMail();

  const exportSubscriptionOrderCSVAndCreateOrderHistory = async (orders: ExtendedOrder<SubscriptionOrder>[]) => {
    setIsLoading(true);

    // エラーは全てPromise.allSettledでハンドリングする為、try-catchしない
    // try {

    if (!now) {
      setError(Error('A current date is not found.'));
      return;
    }
    // 定期便注文リストから当月未配送の定期便注文をフィルタリング
    const nonShippedOrders = filterNonShippingSubscriptionOrderThisMonth(orders, now);

    const orderTotal = nonShippedOrders.length;
    if (orderTotal === 0) {
      setError(Error('当月配送予定の定期便がありません'));
      return;
    }

    // 定期便履歴データ作成処理。内部的にPromise.allSettledでメール送信処理を同時並列実行
    // 定期便履歴データは不整合を許容する為、エラーが発生しても特にハンドリングしない
    const { createdHistorySuccesses, createdHistoryFails } = await createOrderHistory(nonShippedOrders, now);

    // SubscriptionOrderのlastDeliveredAtを更新。内部的にPromise.allSettledでメール送信処理を同時並列実行
    // lastDeliveredAtは当月CSV出力ボタン表示判定に使用する為、エラー発生時はエラーメッセージを表示しハンドリング
    const { updatedDeliveredAtSuccesses, updatedDeliveredAtFails } = await updateOrderDeliveredAt(
      nonShippedOrders,
      now,
    );

    // lastDeliveredAt更新成功データのみメール送信。Promise.allSettledでメール送信処理を同時並列実行
    const { sendMailSuccesses, sendMailFails } = await sendDeliverySubscriptionOrderMail(updatedDeliveredAtSuccesses);

    // lastDeliveredAt更新成功データのみCSV出力
    const records = await exportCSV(updatedDeliveredAtSuccesses);
    if (!records) {
      setError(Error('CSV出力に失敗しました'));
      return;
    }

    // lastDeliveredAt更新総件数
    const updatedDeliveredAtSuccessTotal = updatedDeliveredAtSuccesses.length;
    // lastDeliveredAt更新成功フラグ
    const isUpdatedDeliveredSuccess = updatedDeliveredAtFails.length === 0;
    // 運用メール件名
    const notificationMailSubject = isUpdatedDeliveredSuccess
      ? '定期便のCSVを出力しました'
      : '定期便のCSV出力に失敗した注文があります。システム管理者に問い合わせてください。';

    // lastDeliveredAt更新メール本文
    const createUpdatedDeliveredAtBody = () => {
      // recordsは出力したcsvデータを保持。医院名+商品名を取得
      const outputCSVProducts = records.map((r) => `${r.toCompanyName} ${r.productName}`).join('\n');
      const outputCSVCount = `CSV出力件数:${records.length}件`;
      const updatedSuccessCountBody = `発送日時更新成功件数:${updatedDeliveredAtSuccesses.length}/${orderTotal}`;
      const updatedFailedCountBody = `発送日時更新失敗件数:${updatedDeliveredAtFails.length}/${orderTotal}`;
      const updatedSuccessBody = `${outputCSVProducts}\n${outputCSVCount}\n\n${updatedSuccessCountBody}`;
      const updatedFailedBody = `エラー:\n${updatedDeliveredAtFails.join('\n')}\n${updatedFailedCountBody}`;
      return isUpdatedDeliveredSuccess ? updatedSuccessBody : `${updatedSuccessBody}\n${updatedFailedBody}`;
    };
    // 定期便発送メール送信結果メール本文
    const sendMailResultBody = createSendMailResultBody(
      sendMailSuccesses,
      sendMailFails,
      updatedDeliveredAtSuccessTotal,
    );

    // 定期便履歴データ登録結果メール本文
    const createHistoryBody = () => {
      const createdSuccessBody = `定期便履歴データ登録成功件数:${createdHistorySuccesses.length}/${orderTotal}`;
      const createdFailedCount = `定期便履歴データ登録失敗件数:${createdHistoryFails.length}/${orderTotal}`;
      const errorMessages = createdHistoryFails.join('\n');
      const createdFailedBody = `定期便履歴データ登録エラー:\n${errorMessages}\n${createdFailedCount}`;
      return createdHistoryFails.length === 0 ? createdSuccessBody : `${createdSuccessBody}\n${createdFailedBody}`;
    };

    // 運用メール本文
    const notificationMailBody = `${createUpdatedDeliveredAtBody()}\n\n\n${sendMailResultBody}\n\n\n${createHistoryBody()}`;

    // Order履歴データ作成、メール送信結果を運用メール通知
    await sendOperationMail({
      subject: notificationMailSubject,
      body: notificationMailBody,
    });

    // ダイアログにCSV出力成功 or 失敗メッセージ表示
    const resultMessage = `${notificationMailSubject}\n\n${notificationMailBody}`;
    if (isUpdatedDeliveredSuccess) {
      setSuccessMessage(resultMessage);
      setError(null);
    } else {
      setSuccessMessage(null);
      setError(Error(resultMessage));
    }

    // lastDeliveredAtの更新を反映させる為一覧の再取得・更新
    mutate(SWRKey.subscriptionOrderList);

    // エラーは全てPromise.allSettledでハンドリングする為、try-catchしない
    // } catch (error) {
    //   setIsLoading(false);
    //   const parsedError = parseResponseError(error);
    //   setError(parsedError);
    //   throw parsedError;
    // }
  };

  const resetState = useCallback(() => {
    setIsLoading(false);
    // setError(null);
  }, []);

  return { exportSubscriptionOrderCSVAndCreateOrderHistory, isLoading, successMessage, error, resetState };
};

const createOrderHistory = async (orders: ExtendedOrder<SubscriptionOrder>[], now: Date) => {
  // Promise.allSettledで並列処理。allSettledは途中でErrorが発生しても全ての処理を最後まで実行する
  const createdHistoryStatuses: PromiseSettledResult<ExtendedOrder<SubscriptionOrder>>[] = await Promise.allSettled(
    // mapはasync/awaitを使用するとpromiseを返却
    orders.map(async (order) => {
      try {
        if (!order.products || !order.owner) {
          throw Error('It is null that product items which create a order history.');
        }

        // SubscriptionOrderからOrder履歴データ作成
        const input: CreateSubscriptionOrderHistoryInput = {
          type: Type.order,
          clinicID: order.clinicID,
          staffID: order.staffID,
          deliveryStartYear: order.deliveryStartYear,
          deliveryStartMonth: order.deliveryStartMonth,
          deliveryInterval: order.deliveryInterval,
          nextDeliveryYear: order.nextDeliveryYear,
          nextDeliveryMonth: order.nextDeliveryMonth,
          owner: order.owner, // 定期便作成カスタマーユーザが履歴を見れるようにSubscriptionOrderのownerをOrderのownerコピー
        };

        // SubscriptionOrderHistoryデータ作成実行
        const variables: CreateSubscriptionOrderHistoryMutationVariables = { input: input };
        const result = (await API.graphql(
          graphqlOperation(createSubscriptionOrderHistory, variables),
        )) as GraphQLResult<CreateSubscriptionOrderHistoryMutation>;

        if (!result.data || !result.data.createSubscriptionOrderHistory) {
          throw Error('It returned null that an API which executed to create subscription order history data.');
        }
        const newOrder = result.data.createSubscriptionOrderHistory;
        console.log('create new order history', newOrder);

        // Order と Product のリレーション作成
        for (const item of order.products.items) {
          if (!item) {
            throw Error('It is null that product items which create a order history.');
          }

          const input: CreateSubscriptionOrderHistoryProductInput = {
            orderID: newOrder.id,
            name: item.product.name,
            unitPrice: item.product.unitPrice,
            quantity: item.quantity,
            viewOrder: item.product.viewOrder,
            isExportCSV: item.product.isExportCSV,
            owner: order.owner, // 定期便作成カスタマーユーザが履歴を見れるようにSubscriptionOrderのownerをOrderのownerコピー
          };

          console.log('newOrderID', newOrder.id, 'name', item.product.name);
          // データ新規登録実行
          const variables: CreateSubscriptionOrderHistoryProductMutationVariables = { input: input };
          const result = (await API.graphql(
            graphqlOperation(createSubscriptionOrderHistoryProduct, variables),
          )) as GraphQLResult<CreateSubscriptionOrderHistoryProductMutation>;

          if (!result.data || !result.data.createSubscriptionOrderHistoryProduct) {
            throw Error('It returned null that an API witch executed to create an order and a product relation data.');
          }
          console.log('newSubscriptionOrderHistoryProduct', result.data.createSubscriptionOrderHistoryProduct);
        }

        // SubscriptionOrderのlastDeliveredAtの更新
        const subscriptionOrderInput: UpdateSubscriptionOrderInput = {
          id: order.id,
          lastDeliveredAt: now.toISOString(), // 当月発送日時は現在日時
        };

        const subscriptionOrderVariables: UpdateSubscriptionOrderMutationVariables = { input: subscriptionOrderInput };
        // SubscriptionOrderデータ更新実行
        const subscriptionOrderResult = (await API.graphql(
          graphqlOperation(updateSubscriptionOrderMutation, subscriptionOrderVariables),
        )) as GraphQLResult<UpdateSubscriptionOrderMutation>;

        if (!subscriptionOrderResult.data || !subscriptionOrderResult.data.updateSubscriptionOrder) {
          throw Error('It returned null that an API which executed to update subscription order data.');
        }

        console.log('updateSubscriptionOrder', subscriptionOrderResult.data.updateSubscriptionOrder);
      } catch (err) {
        const error = parseResponseError(err);
        console.error('create order history error:', error);
        throw Error(`${order.clinic.name}: ${error}`);
      }
      // 処理成功時のresolveの値としてorderを返却
      return order;
    }),
  );
  // 処理成功/失敗orderリスト抽出
  const createdHistorySuccesses = filteredPromiseFulfilledResult(createdHistoryStatuses);
  const createdHistoryFails = filteredPromiseRejectedResult(createdHistoryStatuses);
  return { createdHistorySuccesses, createdHistoryFails };
};

const updateOrderDeliveredAt = async (orders: ExtendedOrder<SubscriptionOrder>[], now: Date) => {
  // Promise.allSettledで並列処理。allSettledは途中でErrorが発生しても全ての処理を最後まで実行する
  const updatedStatuses: PromiseSettledResult<ExtendedOrder<SubscriptionOrder>>[] = await Promise.allSettled(
    // mapはasync/awaitを使用するとpromiseを返却
    orders.map(async (order) => {
      try {
        if (!order.products || !order.owner) {
          throw Error('It is null that product items which create a order history.');
        }

        // SubscriptionOrderのlastDeliveredAtの更新
        const subscriptionOrderInput: UpdateSubscriptionOrderInput = {
          id: order.id,
          lastDeliveredAt: now.toISOString(), // 当月発送日時は現在日時
        };

        const subscriptionOrderVariables: UpdateSubscriptionOrderMutationVariables = { input: subscriptionOrderInput };
        // SubscriptionOrderデータ更新実行
        const subscriptionOrderResult = (await API.graphql(
          graphqlOperation(updateSubscriptionOrderMutation, subscriptionOrderVariables),
        )) as GraphQLResult<UpdateSubscriptionOrderMutation>;

        if (!subscriptionOrderResult.data || !subscriptionOrderResult.data.updateSubscriptionOrder) {
          throw Error('It returned null that an API which executed to update subscription order data.');
        }

        console.log('updateSubscriptionOrder', subscriptionOrderResult.data.updateSubscriptionOrder);
      } catch (err) {
        const error = parseResponseError(err);
        console.error('updates delivered at error:', error);
        throw Error(`${order.clinic.name}: ${error}`);
      }
      // 処理成功時のresolveの値としてorderを返却
      return order;
    }),
  );
  // 処理成功/失敗orderリスト抽出
  const updatedDeliveredAtSuccesses = filteredPromiseFulfilledResult(updatedStatuses);
  const updatedDeliveredAtFails = filteredPromiseRejectedResult(updatedStatuses);
  return { updatedDeliveredAtSuccesses, updatedDeliveredAtFails };
};
