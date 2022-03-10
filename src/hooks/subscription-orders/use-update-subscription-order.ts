import { GraphQLResult } from '@aws-amplify/api';
import {
  CreateSubscriptionOrderProductInput,
  CreateSubscriptionOrderProductMutation,
  CreateSubscriptionOrderProductMutationVariables,
  DeleteSubscriptionOrderProductInput,
  DeleteSubscriptionOrderProductMutation,
  DeleteSubscriptionOrderProductMutationVariables,
  ModelSubscriptionOrderProductConnection,
  SubscriptionOrder,
  SubscriptionOrderProduct,
  UpdateSubscriptionOrderInput,
  UpdateSubscriptionOrderMutation,
  UpdateSubscriptionOrderMutationVariables,
} from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { SWRKey } from 'constants/swr-key';
import {
  createSubscriptionOrderProduct,
  deleteSubscriptionOrderProduct,
  updateSubscriptionOrder as updateSubscriptionOrderQuery,
} from 'graphql/mutations';
import { useCallback, useState } from 'react';
import { useSWRConfig } from 'swr';
import { parseResponseError } from 'utilities/parse-response-error';

const updateSubscriptionOrderProducts = async (
  updateSubscriptionOrderID: string,
  productRelations: SubscriptionOrderProduct[],
  prevProductRelations: SubscriptionOrderProduct[],
) => {
  // SubscriptionOrder と Product のリレーション削除
  for (const item of prevProductRelations) {
    const input: DeleteSubscriptionOrderProductInput = { id: item.id };
    const variables: DeleteSubscriptionOrderProductMutationVariables = { input: input };
    // データ削除実行
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
  // SubscriptionOrder と Product のリレーション作成
  for (const item of productRelations) {
    const input: CreateSubscriptionOrderProductInput = {
      subscriptionOrderID: updateSubscriptionOrderID,
      productID: item.productID,
      quantity: item.quantity,
    };
    const variables: CreateSubscriptionOrderProductMutationVariables = { input: input };
    // データ登録実行
    const result = (await API.graphql(
      graphqlOperation(createSubscriptionOrderProduct, variables),
    )) as GraphQLResult<CreateSubscriptionOrderProductMutation>;
    if (result.data && result.data.createSubscriptionOrderProduct) {
      const newSubscriptionOrderProduct = result.data.createSubscriptionOrderProduct;
      console.log('newSubscriptionOrderProduct', newSubscriptionOrderProduct);
    } else {
      throw Error('The API created connection data but it returned null.');
    }
  }
};

export const useUpdateSubscriptionOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();

  // productRelationsは入力フォームsubmitの値、pervProductRelationsは一覧画面からpropsで渡された値
  const updateSubscriptionOrder = async (
    updateSubscriptionOrderID: string,
    productRelations: ModelSubscriptionOrderProductConnection | null | undefined,
    prevProductRelations: ModelSubscriptionOrderProductConnection | null | undefined,
    data: SubscriptionOrder,
  ) => {
    setIsLoading(true);
    try {
      if (!prevProductRelations || !prevProductRelations.items || !productRelations || !productRelations.items) {
        throw Error('A relation object array is null.');
      }
      const subscriptionOrder: UpdateSubscriptionOrderInput = {
        id: updateSubscriptionOrderID,
        deliveryStartYear: data.deliveryStartYear,
        deliveryStartMonth: data.deliveryStartMonth,
        deliveryInterval: data.deliveryInterval,
        staffID: data.staffID,
      };
      const variables: UpdateSubscriptionOrderMutationVariables = { input: subscriptionOrder };
      // データ更新実行
      const result = (await API.graphql(
        graphqlOperation(updateSubscriptionOrderQuery, variables),
      )) as GraphQLResult<UpdateSubscriptionOrderMutation>;

      if (result.data && result.data.updateSubscriptionOrder) {
        // データ更新成功後処理
        setIsLoading(false);
        setError(null);
        const updatedSubscriptionOrder = result.data.updateSubscriptionOrder;
        console.log('updatedSubscriptionOrder:', updatedSubscriptionOrder);
        // productRelations配列中のnull除去
        const nextProductNonNullRelations = productRelations.items.flatMap((x) => (x === null ? [] : [x]));
        const prevProductNonNullRelations = prevProductRelations.items.flatMap((x) => (x === null ? [] : [x]));
        // SubscriptionOrder と Product のリレーション更新
        await updateSubscriptionOrderProducts(
          updateSubscriptionOrderID,
          nextProductNonNullRelations,
          prevProductNonNullRelations,
        );
        // 再フェッチ実行
        mutate(SWRKey.subscriptionOrderList);
      } else {
        throw Error('The API updated data but it returned null.');
      }
    } catch (error) {
      setIsLoading(false);
      const parsedError = parseResponseError(error);
      setError(parsedError);
      return parsedError;
    }
  };

  const resetState = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return { updateSubscriptionOrder, isLoading, error, resetState };
};
