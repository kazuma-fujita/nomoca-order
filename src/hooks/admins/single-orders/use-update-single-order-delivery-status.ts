import { GraphQLResult } from '@aws-amplify/api';
import { DeliveryStatus, Order, UpdateOrderInput, UpdateOrderMutation, UpdateOrderMutationVariables } from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { SWRKey } from 'constants/swr-key';
import { updateOrder } from 'graphql/mutations';
import { ExtendedOrder } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { useCallback, useState } from 'react';
import { useNowDate } from 'stores/use-now-date';
import { useSWRConfig } from 'swr';
import { parseResponseError } from 'utilities/parse-response-error';

export const useUpdateSingleOrderDeliveryStatus = () => {
  const { now } = useNowDate();
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateOrderDeliveryStatus = async (orders: ExtendedOrder<Order>[]) => {
    setIsLoading(true);
    try {
      if (orders.length === 0) {
        throw Error('It is empty that an ID list which update a delivery status.');
      }
      for (const order of orders) {
        // deliveryStatusが発送前以外はcontinue
        if (order.deliveryStatus !== DeliveryStatus.ordered) {
          continue;
        }
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
      }
      setIsLoading(false);
      setError(null);
      // deliveryStatusの変更を一覧に反映
      mutate(SWRKey.orderList);
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

  return { updateOrderDeliveryStatus, isLoading, error, resetState };
};
