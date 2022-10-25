import { GraphQLResult } from '@aws-amplify/api';
import {
  OrderType,
  UpdateOrderInput,
  UpdateOrderMutation,
  UpdateOrderMutationVariables,
  UpdateSubscriptionOrderHistoryInput,
  UpdateSubscriptionOrderHistoryMutation,
  UpdateSubscriptionOrderHistoryMutationVariables,
} from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import {
  updateOrder as updateOrderMutation,
  updateSubscriptionOrderHistory as updateSubscriptionOrderHistoryMutation,
} from 'graphql/mutations';
import { useCallback, useState } from 'react';
import { OrderFormParam } from 'stores/use-order-form-param';
import { useSWRConfig } from 'swr';
import { parseResponseError } from 'utilities/parse-response-error';
import { useFetchSubscriptionOrderHistoryList } from '../subscription-order-histories/use-fetch-subscription-order-history-list';
import { useFetchSingleOrderList } from './use-fetch-single-order-list';

// 注文・定期便共通処理
export const useUpdateOrderNote = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();
  const { swrKey: singleOrderSWRKey } = useFetchSingleOrderList();
  const { swrKey: subscriptionOrderHistorySWRKey } = useFetchSubscriptionOrderHistoryList();

  const updateOrderNote = async (orderType: OrderType, param: OrderFormParam) => {
    setIsLoading(true);
    try {
      // 注文は新規作成のみ。更新時のidが見つかった場合エラー
      if (!param.id) {
        throw Error('A order ID is note found while updating an order note.');
      }
      if (orderType === OrderType.singleOrder) {
        // orderの備考更新処理
        const input: UpdateOrderInput = {
          id: param.id,
          note: param.note,
        };
        const variables: UpdateOrderMutationVariables = { input: input };
        const result = (await API.graphql(
          graphqlOperation(updateOrderMutation, variables),
        )) as GraphQLResult<UpdateOrderMutation>;
        if (!result.data || !result.data.updateOrder) {
          throw Error('It returned null that an API which executed to update order data.');
        }
        // 更新後データ再fetch実行
        mutate(singleOrderSWRKey);
      } else if (orderType === OrderType.subscriptionOrderHistory) {
        // subscriptionOrderHistoryの備考更新処理
        const input: UpdateSubscriptionOrderHistoryInput = {
          id: param.id,
          note: param.note,
        };
        const variables: UpdateSubscriptionOrderHistoryMutationVariables = { input: input };
        const result = (await API.graphql(
          graphqlOperation(updateSubscriptionOrderHistoryMutation, variables),
        )) as GraphQLResult<UpdateSubscriptionOrderHistoryMutation>;
        if (!result.data || !result.data.updateSubscriptionOrderHistory) {
          throw Error('It returned null that an API which executed to update subscription order history data.');
        }
        // 更新後データ再fetch実行
        mutate(subscriptionOrderHistorySWRKey);
      }
      setError(null);
    } catch (error) {
      setIsLoading(false);
      const parsedError = parseResponseError(error);
      setError(parsedError);
      console.error(parsedError);
      throw parsedError;
    }
  };

  const resetState = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return { updateOrderNote, isLoading, error, resetState };
};
