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
  ModelSubscriptionOrderProductConnection,
  SubscriptionOrder,
  Type,
} from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { createOrder, createOrderProduct } from 'graphql/mutations';
import { ExtendedOrder } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { useCallback, useState } from 'react';
import { useNowDate } from 'stores/use-now-date';
import { parseResponseError } from 'utilities/parse-response-error';

export const useCreateSubscriptionOrderHistory = () => {
  const { data: now } = useNowDate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createOrderProducts = async (
    newOrderID: string,
    products: ModelSubscriptionOrderProductConnection,
    owner: string,
  ) => {
    // Order と Product のリレーション作成
    for (const item of products.items) {
      if (!item) {
        throw Error('It is null that product items which create a order history.');
      }

      const input: CreateOrderProductInput = {
        orderID: newOrderID,
        name: item.product.name,
        unitPrice: item.product.unitPrice,
        quantity: item.quantity,
        viewOrder: item.product.viewOrder,
        owner: owner,
      };

      console.log('newOrderID', newOrderID, 'name', item.product.name);
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
  };

  const createOrderHistory = async (orders: ExtendedOrder<SubscriptionOrder>[]) => {
    setIsLoading(true);
    try {
      if (!now) {
        throw Error('A current date is not found.');
      }
      if (orders.length === 0) {
        throw Error('It is empty that an ID list which create a order history.');
      }

      for (const order of orders) {
        if (!order.products || !order.owner) {
          throw Error('It is null that product items which create a order history.');
        }

        // SubscriptionOrderからOrderデータ作成
        const input: CreateOrderInput = {
          type: Type.order,
          deliveryType: DeliveryType.subscription, // 発送方法を定期便に設定
          deliveryStatus: DeliveryStatus.delivered, // 発送状況を発送済みに設定
          orderedAt: order.createdAt, // orderedAtは定期便申し込み日時。注文一覧上の注文日時として表示される
          deliveredAt: now.toISOString(), // 発送日時は現在日時
          clinicID: order.clinicID,
          staffID: order.staffID,
          owner: order.owner, // Owner権限定期便作成者が注文履歴を見れるようにSubscriptionOrderのownerをOrderのownerコピー
        };

        // データ作成実行
        const variables: CreateOrderMutationVariables = { input: input };
        const result = (await API.graphql(
          graphqlOperation(createOrder, variables),
        )) as GraphQLResult<CreateOrderMutation>;

        if (!result.data || !result.data.createOrder) {
          throw Error('It returned null that an API which executed to create order data.');
        }
        const newOrder = result.data.createOrder;
        console.log('create new order', newOrder);
        // SubscriptionOrder と Product のリレーション作成
        await createOrderProducts(newOrder.id, order.products, order.owner);
      }
      setIsLoading(false);
      setError(null);
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

  return { createOrderHistory, isLoading, error, resetState };
};
