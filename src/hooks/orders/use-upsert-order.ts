import { GraphQLResult } from '@aws-amplify/api';
import {
  CreateOrderInput,
  CreateOrderMutation,
  CreateOrderMutationVariables,
  CreateOrderProductInput,
  CreateOrderProductMutation,
  CreateOrderProductMutationVariables,
  CreateSubscriptionOrderInput,
  CreateSubscriptionOrderMutation,
  CreateSubscriptionOrderMutationVariables,
  CreateSubscriptionOrderProductInput,
  CreateSubscriptionOrderProductMutation,
  CreateSubscriptionOrderProductMutationVariables,
  DeleteOrderProductInput,
  DeleteOrderProductMutation,
  DeleteOrderProductMutationVariables,
  DeleteSubscriptionOrderProductInput,
  DeleteSubscriptionOrderProductMutation,
  DeleteSubscriptionOrderProductMutationVariables,
  DeliveryStatus,
  OrderType,
  Type,
  UpdateOrderInput,
  UpdateOrderMutation,
  UpdateOrderMutationVariables,
  UpdateSubscriptionOrderInput,
  UpdateSubscriptionOrderMutation,
  UpdateSubscriptionOrderMutationVariables,
} from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { SWRKey } from 'constants/swr-key';
import {
  createOrder as createOrderMutation,
  createOrderProduct,
  createSubscriptionOrder as createSubscriptionOrderMutation,
  createSubscriptionOrderProduct,
  deleteOrderProduct,
  updateOrder as updateOrderMutation,
  updateSubscriptionOrder as updateSubscriptionOrderMutation,
} from 'graphql/mutations';
import { NormalizedProduct } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { useCallback, useState } from 'react';
import { OrderFormParam } from 'stores/use-order-form-param';
import { useSWRConfig } from 'swr';
import { parseResponseError } from 'utilities/parse-response-error';

const updateSubscriptionOrderProducts = async (
  updateOrderID: string,
  updateProducts: NormalizedProduct[],
  deleteProducts: NormalizedProduct[],
) => {
  // Order と Product のリレーション削除
  for (const item of deleteProducts) {
    if (!item.relationID) {
      throw Error('It is null that an id which relations an order and a product.');
    }
    const input: DeleteSubscriptionOrderProductInput = { id: item.relationID };
    const variables: DeleteSubscriptionOrderProductMutationVariables = { input: input };
    // データ削除実行
    const result = (await API.graphql(
      graphqlOperation(deleteOrderProduct, variables),
    )) as GraphQLResult<DeleteSubscriptionOrderProductMutation>;
    if (!result.data || !result.data.deleteSubscriptionOrderProduct) {
      throw Error('It returned null that an API which executed to delete an order and a product relation data.');
    }
    console.log('deleteOrderProduct', result.data.deleteSubscriptionOrderProduct);
  }
  // Order と Product のリレーション作成
  await createSubscriptionOrderProducts(updateOrderID, updateProducts);
};

const createSubscriptionOrderProducts = async (newSubscriptionOrderID: string, createProducts: NormalizedProduct[]) => {
  // SubscriptionOrder と Product のリレーション作成
  for (const item of createProducts) {
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
    if (!result.data || !result.data.createSubscriptionOrderProduct) {
      throw Error('The API created connection data but it returned null.');
    }
    console.log('newSubscriptionOrderProduct', result.data.createSubscriptionOrderProduct);
  }
};

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
      name: item.name,
      unitPrice: item.unitPrice,
      quantity: item.quantity!,
      viewOrder: item.viewOrder!,
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

const createSingleOrder = async (orderType: OrderType, param: OrderFormParam) => {
  if (!param.deliveryType || !param.clinicID || !param.staffID || !param.products) {
    throw Error('It is null that a required field which use to create or update order param.');
  }
  const inputParam = {
    orderType: orderType,
    deliveryType: param.deliveryType,
    clinicID: param.clinicID,
    staffID: param.staffID,
  };

  if (!param.id) {
    // It executes to create order data.
    const input: CreateOrderInput = {
      type: Type.order,
      deliveryStatus: DeliveryStatus.ordered,
      ...inputParam,
    };
    const variables: CreateOrderMutationVariables = { input: input };
    const result = (await API.graphql(
      graphqlOperation(createOrderMutation, variables),
    )) as GraphQLResult<CreateOrderMutation>;
    if (!result.data || !result.data.createOrder) {
      throw Error('It returned null that an API which executed to create order data.');
    }
    const newOrder = result.data.createOrder;
    // SubscriptionOrder と Product のリレーション作成
    await createOrderProducts(newOrder.id, param.products);
  } else {
    // It executes to update order data.
    if (!param.deleteProducts) {
      throw Error('It is null that a required field which use to delete order data.');
    }
    const input: UpdateOrderInput = {
      id: param.id,
      ...inputParam,
    };
    const variables: UpdateOrderMutationVariables = { input: input };
    // データ更新実行
    const result = (await API.graphql(
      graphqlOperation(updateOrderMutation, variables),
    )) as GraphQLResult<UpdateOrderMutation>;

    if (!result.data || !result.data.updateOrder) {
      throw Error('It returned null that an API which executed to update order data.');
    }
    // データ更新成功後処理
    // Order と Product のリレーション更新
    await updateOrderProducts(param.id, param.products, param.deleteProducts);
  }
};

const createSubscriptionOrder = async (param: OrderFormParam) => {
  if (
    !param.deliveryStartYear ||
    !param.deliveryStartMonth ||
    !param.deliveryInterval ||
    !param.clinicID ||
    !param.staffID ||
    !param.products
  ) {
    throw Error('It is null that a required field which use to create or update order param.');
  }
  const inputParam = {
    deliveryStartYear: param.deliveryStartYear,
    deliveryStartMonth: param.deliveryStartMonth,
    deliveryInterval: param.deliveryInterval,
    clinicID: param.clinicID,
    staffID: param.staffID,
  };

  if (!param.id) {
    // It executes to create order data.
    const input: CreateSubscriptionOrderInput = {
      type: Type.subscriptionOrder,
      ...inputParam,
    };
    const variables: CreateSubscriptionOrderMutationVariables = { input: input };
    const result = (await API.graphql(
      graphqlOperation(createSubscriptionOrderMutation, variables),
    )) as GraphQLResult<CreateSubscriptionOrderMutation>;
    if (!result.data || !result.data.createSubscriptionOrder) {
      throw Error('It returned null that an API which executed to create order data.');
    }
    const newSubscriptionOrder = result.data.createSubscriptionOrder;
    // SubscriptionOrder と Product のリレーション作成
    await createSubscriptionOrderProducts(newSubscriptionOrder.id, param.products);
  } else {
    // It executes to update order data.
    if (!param.deleteProducts) {
      throw Error('It is null that a required field which use to delete order data.');
    }
    const input: UpdateSubscriptionOrderInput = {
      id: param.id,
      ...inputParam,
    };
    const variables: UpdateSubscriptionOrderMutationVariables = { input: input };
    // データ更新実行
    const result = (await API.graphql(
      graphqlOperation(updateSubscriptionOrderMutation, variables),
    )) as GraphQLResult<UpdateSubscriptionOrderMutation>;

    if (!result.data || !result.data.updateSubscriptionOrder) {
      throw Error('It returned null that an API which executed to update order data.');
    }
    // データ更新成功後処理
    // Order と Product のリレーション更新
    await updateSubscriptionOrderProducts(param.id, param.products, param.deleteProducts);
  }
};

export const useCreateOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();

  const createOrder = async (orderType: OrderType, param: OrderFormParam) => {
    setIsLoading(true);
    try {
      // OrderTypeはpagesでContextに保存している値
      orderType === OrderType.singleOrder
        ? await createSingleOrder(orderType, param)
        : await createSubscriptionOrder(param);
      setIsLoading(false);
      setError(null);
      // 更新後データ再fetch実行
      mutate(orderType === OrderType.singleOrder ? SWRKey.orderList : SWRKey.subscriptionOrderList);
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
