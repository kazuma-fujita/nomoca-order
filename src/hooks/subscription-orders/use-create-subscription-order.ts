import { GraphQLResult } from '@aws-amplify/api';
import {
  CreateSubscriptionOrderInput,
  CreateSubscriptionOrderMutation,
  CreateSubscriptionOrderMutationVariables,
  SubscriptionOrder,
} from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { SWRKey } from 'constants/swr-key';
import { createSubscriptionOrder as createSubscriptionOrderQuery } from 'graphql/mutations';
import { useCallback, useState } from 'react';
import { useSWRConfig } from 'swr';
import { parseResponseError } from 'utilities/parse-response-error';

export const useCreateSubscriptionOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();

  // mutateの第2引数function
  // mutateはstoreで保持しているdataをasyncで取得、加工後のdataをPromiseで返却しstoreのstateを更新する
  const onCreateSubscriptionOrder =
    () =>
    async (data: SubscriptionOrder[]): Promise<SubscriptionOrder[]> => {
      setIsLoading(true);
      try {
        const subscriptionOrder: CreateSubscriptionOrderInput = {};
        const variables: CreateSubscriptionOrderMutationVariables = { input: subscriptionOrder };
        const result = (await API.graphql(
          graphqlOperation(createSubscriptionOrderQuery, variables)
        )) as GraphQLResult<CreateSubscriptionOrderMutation>;
        setIsLoading(false);
        setError(null);
        if (result.data && result.data.createSubscriptionOrder) {
          console.log('newSubscriptionOrder:', result.data.createSubscriptionOrder);
          return [...data, result.data.createSubscriptionOrder];
        } else {
          throw Error('The API created data but it returned null.');
        }
      } catch (error) {
        setIsLoading(false);
        setError(parseResponseError(error));
        console.error('create error:', error);
        throw error as Error;
      }
    };

  // mutateを実行してstoreで保持しているstateを更新。mutateの第1引数にはkeyを指定し、第2引数で状態変更を実行する関数を指定。mutateの戻り値はPromise<any>。
  const createSubscriptionOrder = useCallback(
    async () => mutate(SWRKey.SubscriptionOrderList, onCreateSubscriptionOrder(), false),
    []
  );

  const resetState = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return { createSubscriptionOrder, isLoading, error, resetState };
};
