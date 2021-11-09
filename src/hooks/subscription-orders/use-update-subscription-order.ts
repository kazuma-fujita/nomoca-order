import { GraphQLResult } from '@aws-amplify/api';
import {
  ModelSubscriptionOrderProductConnection,
  SubscriptionOrderProduct,
  UpdateSubscriptionOrderInput,
  UpdateSubscriptionOrderMutation,
  UpdateSubscriptionOrderMutationVariables,
  UpdateSubscriptionOrderProductInput,
  UpdateSubscriptionOrderProductMutation,
  UpdateSubscriptionOrderProductMutationVariables,
} from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { SWRKey } from 'constants/swr-key';
import {
  updateSubscriptionOrder as updateSubscriptionOrderQuery,
  updateSubscriptionOrderProduct,
} from 'graphql/mutations';
import { useCallback, useState } from 'react';
import { useSWRConfig } from 'swr';
import { parseResponseError } from 'utilities/parse-response-error';

const updateSubscriptionOrderProducts = async (productRelations: SubscriptionOrderProduct[]) => {
  // SubscriptionOrder と Product のリレーション更新
  for (const item of productRelations) {
    const input: UpdateSubscriptionOrderProductInput = {
      id: item.id,
      subscriptionOrderID: item.subscriptionOrderID,
      productID: item.productID,
    };
    const variables: UpdateSubscriptionOrderProductMutationVariables = { input: input };
    const result = (await API.graphql(
      graphqlOperation(updateSubscriptionOrderProduct, variables)
    )) as GraphQLResult<UpdateSubscriptionOrderProductMutation>;
    if (result.data && result.data.updateSubscriptionOrderProduct) {
      const updateSubscriptionOrderProduct = result.data.updateSubscriptionOrderProduct;
      console.log('updateSubscriptionOrderProduct', updateSubscriptionOrderProduct);
    } else {
      throw Error('The API created connection data but it returned null.');
    }
  }
};

export const useUpdateSubscriptionOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();

  const updateSubscriptionOrder = async (
    id: string,
    productRelations: ModelSubscriptionOrderProductConnection | null | undefined,
    staffID: string
  ) => {
    setIsLoading(true);
    try {
      if (!productRelations || !productRelations.items) {
        throw Error('A relation object array is null.');
      }
      const subscriptionOrder: UpdateSubscriptionOrderInput = { id: id, staffID: staffID };
      const variables: UpdateSubscriptionOrderMutationVariables = { input: subscriptionOrder };
      const result = (await API.graphql(
        graphqlOperation(updateSubscriptionOrderQuery, variables)
      )) as GraphQLResult<UpdateSubscriptionOrderMutation>;
      if (result.data && result.data.updateSubscriptionOrder) {
        setIsLoading(false);
        setError(null);
        const updatedSubscriptionOrder = result.data.updateSubscriptionOrder;
        console.log('updatedSubscriptionOrder:', updatedSubscriptionOrder);
        // 配列中のnull除去
        const items = productRelations.items.flatMap((x) => (x === null ? [] : [x]));
        // SubscriptionOrder と Product のリレーション更新
        await updateSubscriptionOrderProducts(items);
        // 再フェッチ実行
        mutate(SWRKey.SubscriptionOrderList);
      } else {
        throw Error('The API updated data but it returned null.');
      }
    } catch (error) {
      setIsLoading(false);
      setError(parseResponseError(error));
      console.error('update error:', error);
    }
  };

  const resetState = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return { updateSubscriptionOrder, isLoading, error, resetState };
};

// export const useUpdateSubscriptionOrder = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<Error | null>(null);
//   const { mutate } = useSWRConfig();

//   // mutateはstoreで保持しているdataをasyncで取得、加工後のdataをPromiseで返却しstoreのstateを更新する
//   const onUpdateSubscriptionOrder =
//     (id: string, staffID: string) =>
//     async (data: SubscriptionOrder[]): Promise<SubscriptionOrder[]> => {
//       setIsLoading(true);
//       try {
//         const subscriptionOrder: UpdateSubscriptionOrderInput = { id: id, staffID: staffID };
//         const variables: UpdateSubscriptionOrderMutationVariables = { input: subscriptionOrder };
//         const result = (await API.graphql(
//           graphqlOperation(updateSubscriptionOrderQuery, variables)
//         )) as GraphQLResult<UpdateSubscriptionOrderMutation>;
//         if (result.data && result.data.updateSubscriptionOrder) {
//           setIsLoading(false);
//           setError(null);
//           const updatedSubscriptionOrder = result.data.updateSubscriptionOrder;
//           console.log('updatedSubscriptionOrder:', updatedSubscriptionOrder);
//           return data.map((item) => (item.id === id ? updatedSubscriptionOrder : item));
//         } else {
//           throw Error('The API updated data but it returned null.');
//         }
//       } catch (error) {
//         setIsLoading(false);
//         setError(parseResponseError(error));
//         console.error('update error:', error);
//         return data;
//       }
//     };

//   // mutateを実行してstoreで保持しているstateを更新。mutateの第1引数にはkeyを指定し、第2引数で状態変更を実行する関数を指定。mutateの戻り値はPromise<any>。
//   const updateSubscriptionOrder = useCallback(
//     async (id: string, staffID: string) =>
//       mutate(SWRKey.SubscriptionOrderList, onUpdateSubscriptionOrder(id, staffID), false),
//     []
//   );

//   const resetState = useCallback(() => {
//     setIsLoading(false);
//     setError(null);
//   }, []);

//   return { updateSubscriptionOrder, isLoading, error, resetState };
// };
