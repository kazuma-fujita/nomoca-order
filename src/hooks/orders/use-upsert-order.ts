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
  DeleteSubscriptionOrderProductInput,
  DeleteSubscriptionOrderProductMutation,
  DeleteSubscriptionOrderProductMutationVariables,
  DeliveryStatus,
  GetClinicQuery,
  GetStaffQuery,
  OrderType,
  SendMailType,
  Type,
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
  updateSubscriptionOrder as updateSubscriptionOrderMutation,
  deleteSubscriptionOrderProduct,
} from 'graphql/mutations';
import { getClinic, getStaff } from 'graphql/queries';
import { useSendMail } from 'hooks/commons/use-send-mail';
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
    console.table(variables);
    // データ削除実行
    const result = (await API.graphql(
      graphqlOperation(deleteSubscriptionOrderProduct, variables),
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
    if (!item.viewOrder) {
      throw Error('A view order is not found.');
    }
    const input: CreateSubscriptionOrderProductInput = {
      subscriptionOrderID: newSubscriptionOrderID,
      productID: item.productID,
      quantity: item.quantity,
    };

    // データ新規登録実行
    const variables: CreateSubscriptionOrderProductMutationVariables = { input: input };
    const result = (await API.graphql(
      graphqlOperation(createSubscriptionOrderProduct, variables),
    )) as GraphQLResult<CreateSubscriptionOrderProductMutation>;

    if (!result.data || !result.data.createSubscriptionOrderProduct) {
      throw Error('The API created connection data but it returned null.');
    }
    console.log('newSubscriptionOrderProduct', result.data.createSubscriptionOrderProduct);
  }
};

const createOrderProducts = async (newOrderID: string, productRelations: NormalizedProduct[]) => {
  // Order と Product のリレーション作成
  for (const item of productRelations) {
    if (!item.viewOrder) {
      throw Error('The view order of products is not found.');
    }
    const input: CreateOrderProductInput = {
      orderID: newOrderID,
      name: item.name,
      unitPrice: item.unitPrice,
      quantity: item.quantity,
      viewOrder: item.viewOrder,
      isExportCSV: item.isExportCSV,
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

const createSingleOrder = async (param: OrderFormParam) => {
  if (!param.deliveryType || !param.clinicID || !param.staffID || !param.products) {
    throw Error('It is null that a required field which use to create or update order param.');
  }

  // 注文は新規作成のみ。更新時のidが見つかった場合エラー
  if (param.id) {
    throw Error('A order ID is found while creating an order.');
  }

  // It executes to create order data.
  const input: CreateOrderInput = {
    type: Type.order,
    deliveryStatus: DeliveryStatus.ordered,
    deliveryType: param.deliveryType,
    clinicID: param.clinicID,
    staffID: param.staffID,
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
};

// 定期便作成・更新
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

// 注文・定期便共通処理
export const useCreateOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();
  const { sendMail } = useSendMail();

  const createOrder = async (orderType: OrderType, param: OrderFormParam) => {
    setIsLoading(true);
    try {
      // OrderTypeはpagesでContextに保存している値
      orderType === OrderType.singleOrder ? await createSingleOrder(param) : await createSubscriptionOrder(param);
      // 更新後データ再fetch実行
      mutate(orderType === OrderType.singleOrder ? SWRKey.orderList : SWRKey.subscriptionOrderList);
      setError(null);
    } catch (error) {
      setIsLoading(false);
      const parsedError = parseResponseError(error);
      setError(parsedError);
      console.error(parsedError);
      throw parsedError;
    }

    // メール送信は補助的な機能なので失敗してもDB登録処理をrollbackしない
    try {
      if (!param.products) {
        throw Error('A products param is not found.');
      }

      // メール送信に必要な情報をDBから取得
      const { sendMailType, clinic, staff } = await fetchSendMailRequestParams(orderType, param);

      // 注文 or 定期便申し込み or 定期便更新メール送信
      await sendMail({
        sendMailType: sendMailType,
        products: param.products,
        clinic: clinic,
        staff: staff,
        deliveryType: param.deliveryType,
        deliveryStartYear: param.deliveryStartYear,
        deliveryStartMonth: param.deliveryStartMonth,
        deliveryInterval: param.deliveryInterval,
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

  return { createOrder, isLoading, error, resetState };
};

const fetchSendMailRequestParams = async (orderType: OrderType, param: OrderFormParam) => {
  // sendMailType生成
  let sendMailType;
  if (orderType === OrderType.singleOrder) {
    // 通常注文メール
    sendMailType = SendMailType.orderedSingleOrder;
  } else if (orderType === OrderType.subscriptionOrder && param.id) {
    // 定期便内容変更メール
    sendMailType = SendMailType.updatedSubscriptionOrder;
  } else {
    // 定期便申し込みメール
    sendMailType = SendMailType.orderedSubscriptionOrder;
  }

  // staff情報取得
  const staffResult = (await API.graphql(
    graphqlOperation(getStaff, { id: param.staffID }),
  )) as GraphQLResult<GetStaffQuery>;

  if (!staffResult.data || !staffResult.data.getStaff) {
    throw Error('A staff fetching result is not found.');
  }
  const staff = staffResult.data.getStaff;

  // clinic情報取得
  const clinicResult = (await API.graphql(
    graphqlOperation(getClinic, { id: param.clinicID }),
  )) as GraphQLResult<GetClinicQuery>;

  if (!clinicResult.data || !clinicResult.data.getClinic) {
    throw Error('A clinic fetching result is not found.');
  }
  const clinic = clinicResult.data.getClinic;

  return {
    sendMailType,
    clinic,
    staff,
  };
};
