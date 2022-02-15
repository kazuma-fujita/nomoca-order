import { GraphQLResult } from '@aws-amplify/api';
import {
  DeliveryStatus,
  GetOrderQuery,
  UpdateOrderInput,
  UpdateOrderMutation,
  UpdateOrderMutationVariables,
} from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { updateOrder } from 'graphql/mutations';
import { useCallback, useState } from 'react';
import { parseResponseError } from 'utilities/parse-response-error';
import { useNowDate } from 'stores/use-now-date';
import { getOrder } from 'graphql/queries';
import { SWRKey } from 'constants/swr-key';
import { useSWRConfig } from 'swr';

export const useUpdateSingleOrderStatus = () => {
  const { now } = useNowDate();
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateOrderStatus = async (updateOrderIDs: string[]) => {
    setIsLoading(true);
    try {
      if (updateOrderIDs.length === 0) {
        throw Error('It is empty that an ID list which update a delivery status.');
      }
      for (const updateOrderID of updateOrderIDs) {
        // deliveryStatus判別の為、order取得
        const getResult = (await API.graphql(
          graphqlOperation(getOrder, { id: updateOrderID }),
        )) as GraphQLResult<GetOrderQuery>;

        if (!getResult.data || !getResult.data.getOrder) {
          throw Error('It returned null that an API which gets order data.');
        }
        // deliveryStatusが発送前以外はcontinue
        if (getResult.data.getOrder.deliveryStatus !== DeliveryStatus.ordered) {
          continue;
        }
        // deliveryStatusを発送済みに設定
        const input: UpdateOrderInput = {
          id: updateOrderID,
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

  return { updateOrderStatus, isLoading, error, resetState };
};
