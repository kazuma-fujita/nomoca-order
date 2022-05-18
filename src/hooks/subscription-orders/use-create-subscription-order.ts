import { GraphQLResult } from '@aws-amplify/api';
import { API, graphqlOperation } from 'aws-amplify';
import { useCallback, useState } from 'react';
import { useSWRConfig } from 'swr';
import {
  CreateSubscriptionOrderInput,
  CreateSubscriptionOrderMutation,
  CreateSubscriptionOrderMutationVariables,
  CreateSubscriptionOrderProductInput,
  CreateSubscriptionOrderProductMutation,
  CreateSubscriptionOrderProductMutationVariables,
  SubscriptionOrder,
  SubscriptionOrderProduct,
  Type,
} from 'API';
import { SWRKey } from 'constants/swr-key';
import {
  createSubscriptionOrder as createSubscriptionOrderQuery,
  createSubscriptionOrderProduct,
} from 'graphql/mutations';
import { parseResponseError } from 'utilities/parse-response-error';

const createSubscriptionOrderProducts = async (
  productRelations: SubscriptionOrderProduct[],
  newSubscriptionOrderID: string,
) => {
  // SubscriptionOrder と Product のリレーション作成
  for (const item of productRelations) {
    const input: CreateSubscriptionOrderProductInput = {
      subscriptionOrderID: newSubscriptionOrderID,
      productID: item.productID,
      quantity: item.quantity,
    };
    const variables: CreateSubscriptionOrderProductMutationVariables = { input: input };
    // データ新規登録実行
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

export const useCreateSubscriptionOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();

  // mutateはstoreで保持しているdataをasyncで取得、加工後のdataをPromiseで返却しstoreのstateを更新する
  const createSubscriptionOrder = async (data: SubscriptionOrder) => {
    setIsLoading(true);
    try {
      const productRelations = data.products;
      if (!productRelations || !productRelations.items) {
        throw Error('A relation object array is null.');
      }
      const input: CreateSubscriptionOrderInput = {
        type: Type.subscriptionOrder,
        clinicID: data.clinicID,
        staffID: data.staffID,
        deliveryStartYear: data.deliveryStartYear,
        deliveryStartMonth: data.deliveryStartMonth,
        deliveryInterval: data.deliveryInterval,
      };
      const variables: CreateSubscriptionOrderMutationVariables = { input: input };
      const result = (await API.graphql(
        graphqlOperation(createSubscriptionOrderQuery, variables),
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
        mutate(SWRKey.subscriptionOrderList);
      } else {
        throw Error('The API created data but it returned null.');
      }
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

  return { createSubscriptionOrder, isLoading, error, resetState };
};
