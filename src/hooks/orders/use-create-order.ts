import { GraphQLResult } from '@aws-amplify/api';
import {
  CreateOrderInput,
  CreateOrderMutation,
  CreateOrderMutationVariables,
  CreateOrderProductInput,
  CreateOrderProductMutation,
  CreateOrderProductMutationVariables,
  Order,
  OrderType,
  SubscriptionOrder,
  OrderProduct,
  Type,
} from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { SWRKey } from 'constants/swr-key';
import { createOrder as createOrderQuery, createOrderProduct } from 'graphql/mutations';
import { useCallback, useState } from 'react';
import { useSWRConfig } from 'swr';
import { parseResponseError } from 'utilities/parse-response-error';

const createOrderProducts = async (productRelations: OrderProduct[], newOrderID: string) => {
  // SubscriptionOrder と Product のリレーション作成
  for (const item of productRelations) {
    const input: CreateOrderProductInput = {
      orderID: newOrderID,
      productID: item.productID,
      quantity: item.quantity,
    };
    const variables: CreateOrderProductMutationVariables = { input: input };
    // データ新規登録実行
    const result = (await API.graphql(
      graphqlOperation(createOrderProduct, variables),
    )) as GraphQLResult<CreateOrderProductMutation>;
    if (result.data && result.data.createOrderProduct) {
      const newOrderProduct = result.data.createOrderProduct;
      console.log('newOrderProduct', newOrderProduct);
    } else {
      throw Error('The API created connection data but it returned null.');
    }
  }
};

export const useCreateOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();

  // mutateはstoreで保持しているdataをasyncで取得、加工後のdataをPromiseで返却しstoreのstateを更新する
  const createOrder = async (data: Order) => {
    setIsLoading(true);
    try {
      const productRelations = data.products;
      if (!productRelations || !productRelations.items) {
        throw Error('A relation object array is null.');
      }
      const input: CreateOrderInput = {
        type: Type.order,
        orderType: OrderType.subscriptionOrder,
        deliveryStartYear: data.deliveryStartYear,
        deliveryStartMonth: data.deliveryStartMonth,
        deliveryInterval: data.deliveryInterval,
        staffID: data.staffID,
      };
      const variables: CreateOrderMutationVariables = { input: input };
      const result = (await API.graphql(
        graphqlOperation(createOrderQuery, variables),
      )) as GraphQLResult<CreateOrderMutation>;
      if (result.data && result.data.createOrder) {
        const newOrder = result.data.createOrder;
        // 配列中のnull除去
        const items = productRelations.items.flatMap((x) => (x === null ? [] : [x]));
        // SubscriptionOrder と Product のリレーション作成
        await createOrderProducts(items, newOrder.id);
        setIsLoading(false);
        setError(null);
        // データ再取得
        mutate(SWRKey.SubscriptionOrderList);
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

  return { createOrder, isLoading, error, resetState };
};
