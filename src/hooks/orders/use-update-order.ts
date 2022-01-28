import { GraphQLResult } from '@aws-amplify/api';
import {
  CreateOrderProductInput,
  CreateOrderProductMutation,
  CreateOrderProductMutationVariables,
  DeleteOrderProductInput,
  DeleteOrderProductMutation,
  DeleteOrderProductMutationVariables,
  ModelOrderProductConnection,
  Order,
  OrderProduct,
  UpdateOrderInput,
  UpdateOrderMutation,
  UpdateOrderMutationVariables,
} from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { SWRKey } from 'constants/swr-key';
import { createOrderProduct, deleteOrderProduct, updateOrder as updateOrderQuery } from 'graphql/mutations';
import { useCallback, useState } from 'react';
import { useSWRConfig } from 'swr';
import { parseResponseError } from 'utilities/parse-response-error';

const updateOrderProducts = async (
  updateOrderID: string,
  nextProductRelations: OrderProduct[],
  prevProductRelations: OrderProduct[],
) => {
  // Order と Product のリレーション削除
  for (const item of prevProductRelations) {
    const input: DeleteOrderProductInput = { id: item.id };
    const variables: DeleteOrderProductMutationVariables = { input: input };
    // データ削除実行
    const result = (await API.graphql(
      graphqlOperation(deleteOrderProduct, variables),
    )) as GraphQLResult<DeleteOrderProductMutation>;
    if (result.data && result.data.deleteOrderProduct) {
      const deleteOrderProduct = result.data.deleteOrderProduct;
      console.log('deleteOrderProduct', deleteOrderProduct);
    } else {
      throw Error('The API deleted connection data but it returned null.');
    }
  }
  // Order と Product のリレーション作成
  for (const item of nextProductRelations) {
    const input: CreateOrderProductInput = {
      orderID: updateOrderID,
      productID: item.productID,
      quantity: item.quantity,
    };
    const variables: CreateOrderProductMutationVariables = { input: input };
    // データ登録実行
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

export const useUpdateOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();

  // nextProductRelationsは入力フォームsubmitの値、pervProductRelationsは一覧画面からpropsで渡された値
  const updateOrder = async (
    updateOrderID: string,
    nextProductRelations: ModelOrderProductConnection | null | undefined,
    prevProductRelations: ModelOrderProductConnection | null | undefined,
    data: Order,
  ) => {
    setIsLoading(true);
    try {
      if (
        !prevProductRelations ||
        !prevProductRelations.items ||
        !nextProductRelations ||
        !nextProductRelations.items
      ) {
        throw Error('A relation object array is null.');
      }
      const subscriptionOrder: UpdateOrderInput = {
        id: updateOrderID,
        deliveryStartYear: data.deliveryStartYear,
        deliveryStartMonth: data.deliveryStartMonth,
        deliveryInterval: data.deliveryInterval,
        staffID: data.staffID,
      };
      const variables: UpdateOrderMutationVariables = { input: subscriptionOrder };
      // データ更新実行
      const result = (await API.graphql(
        graphqlOperation(updateOrderQuery, variables),
      )) as GraphQLResult<UpdateOrderMutation>;

      if (result.data && result.data.updateOrder) {
        // データ更新成功後処理
        setIsLoading(false);
        setError(null);
        const updatedOrder = result.data.updateOrder;
        console.log('updatedOrder:', updatedOrder);
        // productRelations配列中のnull除去
        const nextProductNonNullRelations = nextProductRelations.items.flatMap((x) => (x === null ? [] : [x]));
        const prevProductNonNullRelations = prevProductRelations.items.flatMap((x) => (x === null ? [] : [x]));
        // Order と Product のリレーション更新
        await updateOrderProducts(updateOrderID, nextProductNonNullRelations, prevProductNonNullRelations);
        // 再フェッチ実行
        mutate(SWRKey.SingleOrderList);
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

  return { updateOrder, isLoading, error, resetState };
};
