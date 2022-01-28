import { GraphQLResult } from '@aws-amplify/api';
import {
  DeleteOrderProductInput,
  DeleteOrderInput,
  DeleteOrderMutation,
  DeleteOrderMutationVariables,
  DeleteOrderProductMutation,
  DeleteOrderProductMutationVariables,
  ModelOrderProductConnection,
  OrderProduct,
} from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { SWRKey } from 'constants/swr-key';
import { deleteOrder as deleteOrderQuery, deleteOrderProduct } from 'graphql/mutations';
import { useCallback, useState } from 'react';
import { useSWRConfig } from 'swr';
import { parseResponseError } from 'utilities/parse-response-error';

const deleteOrderProducts = async (productRelations: OrderProduct[]) => {
  // SubscriptionOrder と Product のリレーション削除
  for (const item of productRelations) {
    const input: DeleteOrderProductInput = { id: item.id };
    const variables: DeleteOrderProductMutationVariables = { input: input };
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
};

export const useDeleteOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();

  const deleteOrder = async (subscriptionOrderId: string, productRelations: ModelOrderProductConnection) => {
    setIsLoading(true);
    try {
      if (!productRelations.items) {
        throw Error('A relation object array is null.');
      }
      const subscriptionOrder: DeleteOrderInput = { id: subscriptionOrderId };
      const variables: DeleteOrderMutationVariables = { input: subscriptionOrder };
      const result = (await API.graphql(
        graphqlOperation(deleteOrderQuery, variables),
      )) as GraphQLResult<DeleteOrderMutation>;
      if (result.data && result.data.deleteOrder) {
        setIsLoading(false);
        setError(null);
        console.log('deleteOrder:', result.data.deleteOrder);
        // SubscriptionOrder と Product のリレーション削除
        const items = productRelations.items.flatMap((x) => (x === null ? [] : [x]));
        await deleteOrderProducts(items);
        // 再フェッチ実行
        mutate(SWRKey.SubscriptionOrderList);
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

  return { deleteOrder, isLoading, error, resetState };
};
