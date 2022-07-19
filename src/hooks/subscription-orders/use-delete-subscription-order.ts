import { GraphQLResult } from '@aws-amplify/api';
import {
  DeleteSubscriptionOrderInput,
  DeleteSubscriptionOrderMutation,
  DeleteSubscriptionOrderMutationVariables,
  DeleteSubscriptionOrderProductInput,
  DeleteSubscriptionOrderProductMutation,
  DeleteSubscriptionOrderProductMutationVariables,
  SendMailType,
  SubscriptionOrder,
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
import { useSendMail } from 'hooks/commons/use-send-mail';
import { ExtendedOrder, NormalizedProduct } from './use-fetch-subscription-order-list';

// const deleteSubscriptionOrderProducts = async (productRelations: SubscriptionOrderProduct[]) => {
const deleteSubscriptionOrderProducts = async (products: NormalizedProduct[]) => {
  // SubscriptionOrder と Product のリレーション削除
  // for (const item of productRelations) {
  for (const product of products) {
    const input: DeleteSubscriptionOrderProductInput = { id: product.relationID };
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
  const { sendMail } = useSendMail();

  const deleteSubscriptionOrder = async (item: ExtendedOrder<SubscriptionOrder>) => {
    setIsLoading(true);
    try {
      // SubscriptionOrder と ProductのリレーションレコードであるSubscriptionOrderProductを削除
      await deleteSubscriptionOrderProducts(item.normalizedProducts);

      // SubscriptionOrder削除
      const input: DeleteSubscriptionOrderInput = { id: item.id };
      const variables: DeleteSubscriptionOrderMutationVariables = { input: input };

      const result = (await API.graphql(
        graphqlOperation(deleteSubscriptionOrderQuery, variables),
      )) as GraphQLResult<DeleteSubscriptionOrderMutation>;

      if (!result.data || !result.data.deleteSubscriptionOrder) {
        throw Error('The API deleted data but it returned null.');
      }
      console.log('deleteSubscriptionOrder:', result.data.deleteSubscriptionOrder);

      setIsLoading(false);
      setError(null);
      // 再フェッチ実行
      mutate(SWRKey.subscriptionOrderList);
    } catch (error) {
      setIsLoading(false);
      setError(parseResponseError(error));
      console.error('delete error:', error);
      return error;
    }

    // メール送信は補助的な機能なので失敗してもDB登録処理をrollbackしない
    try {
      // 定期便解約メール送信
      await sendMail({
        sendMailType: SendMailType.canceledSubscriptionOrder,
        products: item.normalizedProducts,
        clinic: item.clinic,
        staff: item.staff,
        deliveryStartYear: item.deliveryStartYear,
        deliveryStartMonth: item.deliveryStartMonth,
        deliveryInterval: item.deliveryInterval,
      });
    } catch (err) {
      const error = err as Error;
      // TODO: Slack or CloudWatch通知
      console.error('It failed sending an email after ordering a single order item', error);
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
