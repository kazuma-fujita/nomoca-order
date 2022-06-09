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
  OrderType,
  SubscriptionOrder,
  Type,
} from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { createOrderProduct, updateOrder } from 'graphql/mutations';
import { ExtendedOrder } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { useCallback, useState } from 'react';
import { useNowDate } from 'stores/use-now-date';
import { parseResponseError } from 'utilities/parse-response-error';

export const useCreateSubscriptionOrderHistory = () => {
  const { now } = useNowDate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createOrderProducts = async (newOrderID: string, products: ModelSubscriptionOrderProductConnection) => {
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
      };

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

  const updateOrderStatus = async (orders: ExtendedOrder<SubscriptionOrder>[]) => {
    setIsLoading(true);
    try {
      if (orders.length === 0) {
        throw Error('It is empty that an ID list which create a order history.');
      }

      for (const order of orders) {
        if (!order.products) {
          throw Error('It is null that product items which create a order history.');
        }

        // deliveryTypeを定期便に設定
        // deliveryStatusを発送済み、発送日時に現在日時を設定
        const input: CreateOrderInput = {
          type: Type.order,
          orderType: OrderType.singleOrder,
          deliveryType: DeliveryType.subscription,
          deliveryStatus: DeliveryStatus.delivered,
          deliveredAt: now.toISOString(),
          clinicID: order.clinicID,
          staffID: order.staffID,
          owner: order.owner,
        };

        // データ更新実行
        const variables: CreateOrderMutationVariables = { input: input };
        const result = (await API.graphql(
          graphqlOperation(updateOrder, variables),
        )) as GraphQLResult<CreateOrderMutation>;

        if (!result.data || !result.data.createOrder) {
          throw Error('It returned null that an API which executed to create order data.');
        }
        const newOrder = result.data.createOrder;
        console.log('create new order owner', newOrder.owner);
        // SubscriptionOrder と Product のリレーション作成
        await createOrderProducts(newOrder.id, order.products);
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

  return { updateOrderStatus, isLoading, error, resetState };
};
