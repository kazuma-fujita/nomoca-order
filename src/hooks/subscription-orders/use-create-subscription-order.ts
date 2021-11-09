import { GraphQLResult } from '@aws-amplify/api';
import {
  CreateSubscriptionOrderInput,
  CreateSubscriptionOrderMutation,
  CreateSubscriptionOrderMutationVariables,
  CreateSubscriptionOrderProductInput,
  CreateSubscriptionOrderProductMutation,
  CreateSubscriptionOrderProductMutationVariables,
  ModelSubscriptionOrderProductConnection,
  SubscriptionOrderProduct,
} from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { SWRKey } from 'constants/swr-key';
import {
  createSubscriptionOrder as createSubscriptionOrderQuery,
  createSubscriptionOrderProduct,
} from 'graphql/mutations';
import { useCallback, useState } from 'react';
import { useSWRConfig } from 'swr';
import { parseResponseError } from 'utilities/parse-response-error';
import { ObjectType } from '../../constants/object-type';

const createSubscriptionOrderProducts = async (
  productRelations: SubscriptionOrderProduct[],
  newSubscriptionOrderID: string
) => {
  // SubscriptionOrder と Product のリレーション作成
  for (const item of productRelations) {
    const input: CreateSubscriptionOrderProductInput = {
      subscriptionOrderID: newSubscriptionOrderID,
      productID: item.productID,
    };
    const variables: CreateSubscriptionOrderProductMutationVariables = { input: input };
    const result = (await API.graphql(
      graphqlOperation(createSubscriptionOrderProduct, variables)
    )) as GraphQLResult<CreateSubscriptionOrderProductMutation>;
    if (result.data && result.data.createSubscriptionOrderProduct) {
      const newSubscriptionOrderProduct = result.data.createSubscriptionOrderProduct;
      console.log('newSubscriptionOrderProduct', newSubscriptionOrderProduct);
    } else {
      throw Error('The API created connection data but it returned null.');
    }
  }
};

export const useCreateSubscriptionOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();

  // mutateはstoreで保持しているdataをasyncで取得、加工後のdataをPromiseで返却しstoreのstateを更新する
  const createSubscriptionOrder = async (
    productRelations: ModelSubscriptionOrderProductConnection | null | undefined,
    staffID: string
  ) => {
    setIsLoading(true);
    try {
      if (!productRelations || !productRelations.items) {
        throw Error('A relation object array is null.');
      }
      const input: CreateSubscriptionOrderInput = { staffID: staffID, type: ObjectType.SubscriptionOrder };
      const variables: CreateSubscriptionOrderMutationVariables = { input: input };
      const result = (await API.graphql(
        graphqlOperation(createSubscriptionOrderQuery, variables)
      )) as GraphQLResult<CreateSubscriptionOrderMutation>;
      if (result.data && result.data.createSubscriptionOrder) {
        const newSubscriptionOrder = result.data.createSubscriptionOrder;
        // 配列中のnull除去
        const items = productRelations.items.flatMap((x) => (x === null ? [] : [x]));
        // SubscriptionOrder と Product のリレーション作成
        await createSubscriptionOrderProducts(items, newSubscriptionOrder.id);
        setIsLoading(false);
        setError(null);
        // データ再取得
        mutate(SWRKey.SubscriptionOrderList);
        console.log('newSubscriptionOrder:', newSubscriptionOrder);
      } else {
        throw Error('The API created data but it returned null.');
      }
    } catch (error) {
      setIsLoading(false);
      setError(parseResponseError(error));
      console.error('create error:', error);
    }
  };

  const resetState = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return { createSubscriptionOrder, isLoading, error, resetState };
};

// export const useCreateSubscriptionOrder = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<Error | null>(null);
//   const { mutate } = useSWRConfig();

//   // mutateはstoreで保持しているdataをasyncで取得、加工後のdataをPromiseで返却しstoreのstateを更新する
//   const onCreateSubscriptionOrder =
//     (productIDs: SubscriptionOrderProduct[], staffID: string) =>
//     async (data: SubscriptionOrder[]) => {
//       setIsLoading(true);
//       try {
//         const input: CreateSubscriptionOrderInput = { staffID: staffID };
//         const variables: CreateSubscriptionOrderMutationVariables = { input: input };
//         const result = (await API.graphql(
//           graphqlOperation(createSubscriptionOrderQuery, variables)
//         )) as GraphQLResult<CreateSubscriptionOrderMutation>;
//         if (result.data && result.data.createSubscriptionOrder) {
//           const newSubscriptionOrder = result.data.createSubscriptionOrder;
//           const newSubscriptionOrderProducts = productIDs.map(async (item) => {
//             const input: CreateSubscriptionOrderProductInput = {
//               subscriptionOrderID: newSubscriptionOrder.id,
//               productID: item.productID,
//             };
//             const variables: CreateSubscriptionOrderProductMutationVariables = { input: input };
//             const result = (await API.graphql(
//               graphqlOperation(createSubscriptionOrderProduct, variables)
//             )) as GraphQLResult<CreateSubscriptionOrderProductMutation>;
//             if (result.data && result.data.createSubscriptionOrderProduct) {
//               const newSubscriptionOrderProduct = result.data.createSubscriptionOrderProduct;
//               console.log('newSubscriptionOrderProduct', newSubscriptionOrderProduct);
//               return newSubscriptionOrderProduct;
//             } else {
//               return null;
//             }
//           });

//           const connection = { products: { items: newSubscriptionOrderProducts } };
//           const subscriptionOrder = { ...newSubscriptionOrder, connection };
//           setIsLoading(false);
//           setError(null);
//           console.log('newSubscriptionOrder:', newSubscriptionOrder);
//           console.log('fullSubscriptionOrder:', subscriptionOrder);
//           return [...data, newSubscriptionOrder];
//           // return [...data, subscriptionOrder];
//         } else {
//           throw Error('The API created data but it returned null.');
//         }
//       } catch (error) {
//         setIsLoading(false);
//         setError(parseResponseError(error));
//         console.error('create error:', error);
//         return data;
//       }
//     };

//   // mutateを実行してstoreで保持しているstateを更新。mutateの第1引数にはkeyを指定し、第2引数で状態変更を実行する関数を指定。mutateの戻り値はPromise<any>。
//   const createSubscriptionOrder = useCallback(
//     async (productIDs: SubscriptionOrderProduct[], staffID: string) =>
//       mutate(SWRKey.SubscriptionOrderList, onCreateSubscriptionOrder(productIDs, staffID), false),
//     []
//   );

//   const resetState = useCallback(() => {
//     setIsLoading(false);
//     setError(null);
//   }, []);

//   return { createSubscriptionOrder, isLoading, error, resetState };
// };
