import { GraphQLResult } from '@aws-amplify/api';
import {
  ListSubscriptionOrdersSortedByCreatedAtQuery,
  ListSubscriptionOrdersSortedByCreatedAtQueryVariables,
  ModelSortDirection,
  SubscriptionOrder,
  Type,
} from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { SWRKey } from 'constants/swr-key';
import { listAdminSubscriptionOrders, listSubscriptionOrdersSortedByCreatedAt } from 'graphql/queries';
import { FetchResponse, useFetch } from 'hooks/swr/use-fetch';
import { createContext, useContext } from 'react';

export type NormalizedProduct = {
  relationID: string; // OrderProduct or SubscriptionOrderProduct の ID。定期便削除時はrelationIDでProductとのリレーションレコードであるSubscriptionOrderProductを削除
  productID: string; // use-hook-formで入力フォームにセットする商品ID。他、productのDBキャッシュからviewOrderなどの値を取得する為に使用
  name: string;
  unitPrice: number;
  quantity: number;
  viewOrder?: number | null; // 入力確認画面で商品を表示するソート順。useCreateOrderでは値をOrderProductに登録
};

export type ExtendedOrder<T> = T & {
  normalizedProducts: NormalizedProduct[];
};

const generateNormalizedProducts = (order: SubscriptionOrder): NormalizedProduct[] => {
  if (!order.products) {
    throw Error('Subscription order products is null.');
  }
  return order.products.items.map((orderProduct) => {
    if (!orderProduct) {
      throw Error('Subscription order products is null.');
    }
    return {
      relationID: orderProduct.id,
      productID: orderProduct.productID,
      name: orderProduct.product.name,
      unitPrice: orderProduct.product.unitPrice,
      quantity: orderProduct.quantity,
    };
  });
};

const fetcher = async (): Promise<ExtendedOrder<SubscriptionOrder>[]> => {
  // schema.graphqlのKeyディレクティブでtypeとcreatedAtのsort条件を追加。sortを実行する為にtypeを指定。
  const sortVariables: ListSubscriptionOrdersSortedByCreatedAtQueryVariables = {
    type: Type.subscriptionOrder,
    sortDirection: ModelSortDirection.DESC,
  };

  const result = (await API.graphql(
    graphqlOperation(listSubscriptionOrdersSortedByCreatedAt, sortVariables),
  )) as GraphQLResult<ListSubscriptionOrdersSortedByCreatedAtQuery>;

  if (
    !result.data ||
    !result.data.listSubscriptionOrdersSortedByCreatedAt ||
    !result.data.listSubscriptionOrdersSortedByCreatedAt.items
  ) {
    throw Error('The API fetched data but it returned null.');
  }

  const items = result.data.listSubscriptionOrdersSortedByCreatedAt.items as SubscriptionOrder[];
  for (const item of items) {
    if (!item || !item.products || !item.products.items) {
      throw Error('The API fetched products but it returned null.');
    }
  }

  const extendedItems: ExtendedOrder<SubscriptionOrder>[] = items.map((item) => ({
    ...item,
    normalizedProducts: generateNormalizedProducts(item),
  }));

  return extendedItems;
};

const SubscriptionOrderListContext = createContext({} as FetchResponse<ExtendedOrder<SubscriptionOrder>[]>);

export const useFetchSubscriptionOrderList = () => useContext(SubscriptionOrderListContext);

type Props = {
  mockResponse?: FetchResponse<ExtendedOrder<SubscriptionOrder>[]>;
};

export const SubscriptionOrderListContextProvider: React.FC<Props> = ({ mockResponse, children }) => {
  const fetchResponse = useFetch<ExtendedOrder<SubscriptionOrder>[]>(
    SWRKey.subscriptionOrderList,
    fetcher,
    {},
    mockResponse,
  );

  return (
    <SubscriptionOrderListContext.Provider value={fetchResponse}>{children}</SubscriptionOrderListContext.Provider>
  );
};

export type AdminSubscriptionOrderResponse = FetchResponse<ExtendedOrder<SubscriptionOrder>[]> & {
  allData: ExtendedOrder<SubscriptionOrder>[] | null;
};

const AdminSubscriptionOrderListContext = createContext({} as AdminSubscriptionOrderResponse);

const adminFetcher = async (): Promise<ExtendedOrder<SubscriptionOrder>[]> => {
  const result = (await API.graphql(graphqlOperation(listAdminSubscriptionOrders))) as GraphQLResult<{
    listAdminSubscriptionOrders: [SubscriptionOrder];
  }>;

  if (!result.data) {
    throw Error('The API fetched data but it returned null.');
  }

  const items = result.data.listAdminSubscriptionOrders as SubscriptionOrder[];
  for (const item of items) {
    if (!item || !item.products || !item.products.items) {
      throw Error('The API fetched products but it returned null.');
    }
  }

  const extendedItems: ExtendedOrder<SubscriptionOrder>[] = items.map((item) => ({
    ...item,
    normalizedProducts: generateNormalizedProducts(item),
  }));

  return extendedItems;
};

export const useAdminSubscriptionOrderList = () => useContext(AdminSubscriptionOrderListContext);

// TODO: 一覧生成ロジックをバックエンドに移したらSubscriptionOrderListContextProviderと統合すること
export const AdminSubscriptionOrderListContextProvider: React.FC<Props> = ({ mockResponse, children }) => {
  // Windowにフォーカスが外れて再度当たった時のrevalidationを停止する
  const fetchResponse = useFetch<ExtendedOrder<SubscriptionOrder>[]>(
    SWRKey.AdminSubscriptionOrderList,
    adminFetcher,
    { revalidateOnFocus: false },
    mockResponse,
  );

  const { data } = fetchResponse;
  // メモリ上に全件データ保存するstate生成
  // const { data: allData, mutate } = useFetch<ExtendedOrder<SubscriptionOrder>[]>(
  // const { data: allData } = useFetch<ExtendedOrder<SubscriptionOrder>[]>(SWRKey.AdminAllSubscriptionOrderList, null);
  // 全件データstateが存在しない(初回アクセス)、かつAPIからデータ取得成功時
  // if (!allData && data) {
  //   // 全件データ保存
  //   mutate(data, false);
  // }
  // const responseData = { ...fetchResponse, allData: allData };
  const responseData = { ...fetchResponse, allData: data };
  return (
    <AdminSubscriptionOrderListContext.Provider value={responseData}>
      {children}
    </AdminSubscriptionOrderListContext.Provider>
  );
};
