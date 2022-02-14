import { GraphQLResult } from '@aws-amplify/api';
import {
  CreateOrderInput,
  CreateOrderMutation,
  CreateOrderMutationVariables,
  CreateOrderProductInput,
  CreateOrderProductMutation,
  CreateOrderProductMutationVariables,
  DeleteOrderProductInput,
  DeleteOrderProductMutation,
  DeleteOrderProductMutationVariables,
  DeliveryType,
  Type,
  UpdateOrderInput,
  UpdateOrderMutation,
  UpdateOrderMutationVariables,
} from 'API';
import { API, graphqlOperation, input } from 'aws-amplify';
import { SWRKey } from 'constants/swr-key';
import {
  createOrder as createOrderQuery,
  createOrderProduct,
  deleteOrderProduct,
  updateOrder as updateOrderQuery,
} from 'graphql/mutations';
import { useCallback, useState } from 'react';
import { OrderFormParam, useOrderFormParam } from 'stores/use-order-form-param';
import { useSWRConfig } from 'swr';
import { parseResponseError } from 'utilities/parse-response-error';
import { NormalizedProduct } from 'hooks/orders/use-fetch-order-list';
import { DeliveryStatus } from '../../API';

const updateOrderProducts = async (
  updateOrderID: string,
  productRelations: NormalizedProduct[],
  deleteNormalizedProducts: NormalizedProduct[],
) => {
  // Order と Product のリレーション削除
  for (const item of deleteNormalizedProducts) {
    if (!item.relationID) {
      throw Error('It is null that an id which relations an order and a product.');
    }
    const input: DeleteOrderProductInput = { id: item.relationID! };
    const variables: DeleteOrderProductMutationVariables = { input: input };
    // データ削除実行
    const result = (await API.graphql(
      graphqlOperation(deleteOrderProduct, variables),
    )) as GraphQLResult<DeleteOrderProductMutation>;
    if (!result.data || !result.data.deleteOrderProduct) {
      throw Error('It returned null that an API which executed to delete an order and a product relation data.');
    }
    console.log('deleteOrderProduct', result.data.deleteOrderProduct);
  }
  // Order と Product のリレーション作成
  await createOrderProducts(updateOrderID, productRelations);
};

const createOrderProducts = async (newOrderID: string, productRelations: NormalizedProduct[]) => {
  // Order と Product のリレーション作成
  for (const item of productRelations) {
    const input: CreateOrderProductInput = {
      orderID: newOrderID,
      productID: item.productID!,
      quantity: item.quantity!,
    };
    const variables: CreateOrderProductMutationVariables = { input: input };
    // データ新規登録実行
    const result = (await API.graphql(
      graphqlOperation(createOrderProduct, variables),
    )) as GraphQLResult<CreateOrderProductMutation>;
    if (!result.data || !result.data.createOrderProduct) {
      throw Error('It returned null that an API witch executed to create an order and a product relation data.');
    }
    console.log('newOrderProduct', result.data.createOrderProduct);
  }
};

export const useCreateOrder = () => {
  const { orderType } = useOrderFormParam();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();

  const createOrder = async (data: OrderFormParam) => {
    setIsLoading(true);
    try {
      const productRelations = data.products;
      if (!data.staffID || !productRelations) {
        throw Error('It is null that a required field which use to create or update order data.');
      }

      const inputParam = {
        deliveryType: data.deliveryType,
        deliveryStartYear: data.deliveryStartYear,
        deliveryStartMonth: data.deliveryStartMonth,
        deliveryInterval: data.deliveryInterval,
        staffID: data.staffID,
      };

      if (!data.id) {
        // It executes to create order data.
        const input: CreateOrderInput = {
          type: Type.order,
          orderType: orderType,
          deliveryStatus: DeliveryStatus.ordered,
          ...inputParam,
        };
        const variables: CreateOrderMutationVariables = { input: input };
        const result = (await API.graphql(
          graphqlOperation(createOrderQuery, variables),
        )) as GraphQLResult<CreateOrderMutation>;
        if (!result.data || !result.data.createOrder) {
          throw Error('It returned null that an API which executed to create order data.');
        }
        const newOrder = result.data.createOrder;
        // SubscriptionOrder と Product のリレーション作成
        await createOrderProducts(newOrder.id, productRelations);
      } else {
        // It executes to update order data.
        const deleteNormalizedProducts = data.deleteProducts;
        if (!deleteNormalizedProducts) {
          throw Error('It is null that a required field which use to delete order data.');
        }
        const input: UpdateOrderInput = {
          id: data.id,
          ...inputParam,
        };
        const variables: UpdateOrderMutationVariables = { input: input };
        // データ更新実行
        const result = (await API.graphql(
          graphqlOperation(updateOrderQuery, variables),
        )) as GraphQLResult<UpdateOrderMutation>;

        if (!result.data || !result.data.updateOrder) {
          throw Error('It returned null that an API witch executed to update order data.');
        }
        // データ更新成功後処理
        // Order と Product のリレーション更新
        await updateOrderProducts(data.id, productRelations, deleteNormalizedProducts);
      }
      setIsLoading(false);
      setError(null);
      // データ再取得
      mutate(SWRKey.orderList);
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
