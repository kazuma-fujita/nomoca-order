import { GraphQLResult } from '@aws-amplify/api';
import {
  DeleteSubscriptionOrderInput,
  DeleteSubscriptionOrderMutation,
  DeleteSubscriptionOrderMutationVariables,
  DeleteSubscriptionOrderProductInput,
  DeleteSubscriptionOrderProductMutation,
  DeleteSubscriptionOrderProductMutationVariables,
  SubscriptionOrder,
  SubscriptionOrderProduct,
} from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { SWRKey } from 'constants/swr-key';
import {
  deleteSubscriptionOrder as deleteSubscriptionOrderQuery,
  deleteSubscriptionOrderProduct,
} from 'graphql/mutations';
import { useCallback, useState } from 'react';
import { useSWRConfig } from 'swr';
import { parseResponseError } from 'utilities/parse-response-error';
import { ModelSubscriptionOrderProductConnection } from 'API';

const deleteSubscriptionOrderProducts = async (productRelations: SubscriptionOrderProduct[]) => {
  // SubscriptionOrder と Product のリレーション削除
  for (const item of productRelations) {
    const input: DeleteSubscriptionOrderProductInput = { id: item.id };
    const variables: DeleteSubscriptionOrderProductMutationVariables = { input: input };
    const result = (await API.graphql(
      graphqlOperation(deleteSubscriptionOrderProduct, variables),
    )) as GraphQLResult<DeleteSubscriptionOrderProductMutation>;
    if (result.data && result.data.deleteSubscriptionOrderProduct) {
      const deleteSubscriptionOrderProduct = result.data.deleteSubscriptionOrderProduct;
      console.log('deleteSubscriptionOrderProduct', deleteSubscriptionOrderProduct);
    } else {
      throw Error('The API deleted connection data but it returned null.');
    }
  }
};

export const useDeleteSubscriptionOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();

  const deleteSubscriptionOrder = async (
    subscriptionOrderId: string,
    productRelations: ModelSubscriptionOrderProductConnection,
  ) => {
    setIsLoading(true);
    try {
      if (!productRelations.items) {
        throw Error('A relation object array is null.');
      }
      const subscriptionOrder: DeleteSubscriptionOrderInput = { id: subscriptionOrderId };
      const variables: DeleteSubscriptionOrderMutationVariables = { input: subscriptionOrder };
      const result = (await API.graphql(
        graphqlOperation(deleteSubscriptionOrderQuery, variables),
      )) as GraphQLResult<DeleteSubscriptionOrderMutation>;
      if (result.data && result.data.deleteSubscriptionOrder) {
        setIsLoading(false);
        setError(null);
        console.log('deleteSubscriptionOrder:', result.data.deleteSubscriptionOrder);
        // SubscriptionOrder と Product のリレーション削除
        const items = productRelations.items.flatMap((x) => (x === null ? [] : [x]));
        await deleteSubscriptionOrderProducts(items);
        // 再フェッチ実行
        mutate(SWRKey.subscriptionOrderList);
      } else {
        throw Error('The API deleted data but it returned null.');
      }
    } catch (error) {
      setIsLoading(false);
      setError(parseResponseError(error));
      console.error('delete error:', error);
      return error;
    }
  };

  const resetState = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return { deleteSubscriptionOrder, isLoading, error, resetState };
};

// export const useDeleteSubscriptionOrder = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<Error | null>(null);
//   const { mutate } = useSWRConfig();

//   // mutateはstoreで保持しているdataをasyncで取得、加工後のdataをPromiseで返却しstoreのstateを更新する
//   const onDeleteSubscriptionOrder = (id: string) => async (data: SubscriptionOrder[]) => {
//     setIsLoading(true);
//     try {
//       const subscriptionOrder: DeleteSubscriptionOrderInput = { id: id };
//       const variables: DeleteSubscriptionOrderMutationVariables = { input: subscriptionOrder };
//       const result = (await API.graphql(
//         graphqlOperation(deleteSubscriptionOrderQuery, variables)
//       )) as GraphQLResult<DeleteSubscriptionOrderMutation>;
//       if (result.data && result.data.deleteSubscriptionOrder) {
//         setIsLoading(false);
//         setError(null);
//         return data.filter((item) => item.id !== id);
//       } else {
//         throw Error('The API deleted data but it returned null.');
//       }
//     } catch (error) {
//       setIsLoading(false);
//       setError(parseResponseError(error));
//       console.error('delete error:', error);
//     }
//   };

//   // mutateを実行してstoreで保持しているstateを更新。mutateの第1引数にはkeyを指定し、第2引数で状態変更を実行する関数を指定。mutateの戻り値はPromise<any>。
//   const deleteSubscriptionOrder = useCallback(
//     async (id: string) => mutate(SWRKey.subscriptionOrderList, onDeleteSubscriptionOrder(id), false),
//     []
//   );

//   const resetState = useCallback(() => {
//     setIsLoading(false);
//     setError(null);
//   }, []);

//   return { deleteSubscriptionOrder, isLoading, error, resetState };
// };
