import { GraphQLResult } from '@aws-amplify/api';
import {
  DeleteSubscriptionOrderInput,
  DeleteSubscriptionOrderMutation,
  DeleteSubscriptionOrderMutationVariables,
  SubscriptionOrder,
} from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { SWRKey } from 'constants/swr-key';
import { deleteSubscriptionOrder as deleteSubscriptionOrderQuery } from 'graphql/mutations';
import { useCallback, useState } from 'react';
import { useSWRConfig } from 'swr';
import { parseResponseError } from 'utilities/parse-response-error';

export const useDeleteSubscriptionOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();

  // mutateはstoreで保持しているdataをasyncで取得、加工後のdataをPromiseで返却しstoreのstateを更新する
  const onDeleteSubscriptionOrder = (id: string) => async (data: SubscriptionOrder[]) => {
    setIsLoading(true);
    try {
      const subscriptionOrder: DeleteSubscriptionOrderInput = { id: id };
      const variables: DeleteSubscriptionOrderMutationVariables = { input: subscriptionOrder };
      const result = (await API.graphql(
        graphqlOperation(deleteSubscriptionOrderQuery, variables)
      )) as GraphQLResult<DeleteSubscriptionOrderMutation>;
      if (result.data && result.data.deleteSubscriptionOrder) {
        setIsLoading(false);
        setError(null);
        console.log('deleteSubscriptionOrder:', result.data.deleteSubscriptionOrder);
        return data.filter((item) => item.id !== id);
      } else {
        throw Error('The API deleted data but it returned null.');
      }
    } catch (error) {
      setIsLoading(false);
      setError(parseResponseError(error));
      console.error('delete error:', error);
    }
  };

  // mutateを実行してstoreで保持しているstateを更新。mutateの第1引数にはkeyを指定し、第2引数で状態変更を実行する関数を指定。mutateの戻り値はPromise<any>。
  const deleteSubscriptionOrder = useCallback(
    async (id: string) => mutate(SWRKey.SubscriptionOrderList, onDeleteSubscriptionOrder(id), false),
    []
  );

  const resetState = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return { deleteSubscriptionOrder, isLoading, error, resetState };
};
