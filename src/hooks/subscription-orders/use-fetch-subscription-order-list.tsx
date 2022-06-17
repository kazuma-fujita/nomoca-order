import { GraphQLResult } from '@aws-amplify/api';
import {
  ListSubscriptionOrdersSortedByCreatedAtQuery,
  ListSubscriptionOrdersSortedByCreatedAtQueryVariables,
  ModelSortDirection,
  SubscriptionOrder,
  SubscriptionOrderProduct,
  Type,
  SubscriptionOrdersResponse,
} from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { SWRKey } from 'constants/swr-key';
import { listAdminSubscriptionOrders, listSubscriptionOrdersSortedByCreatedAt } from 'graphql/queries';
import { FetchResponse, useFetch } from 'hooks/swr/use-fetch';
import { createContext, useContext } from 'react';

export type NormalizedProduct = {
  relationID: string;
  productID: string; // use-hook-formで入力フォームにセットする商品ID。他、productのDBキャッシュからviewOrderなどの値を取得する為に使用
  name: string;
  unitPrice: number;
  quantity: number;
  viewOrder?: number | null; // 入力確認画面で商品を表示するソート順。useCreateOrderでは値をOrderProductに登録
};

export type ExtendedOrder<T> = T & {
  normalizedProducts: NormalizedProduct[];
};

const createNormalizedProduct = (orderProduct: SubscriptionOrderProduct | null): NormalizedProduct =>
  ({
    relationID: orderProduct?.id,
    productID: orderProduct?.productID,
    name: orderProduct?.product.name,
    unitPrice: orderProduct?.product.unitPrice,
    quantity: orderProduct?.quantity,
  } as NormalizedProduct);

const createNormalizedProducts = (order: SubscriptionOrder): NormalizedProduct[] =>
  order.products?.items.map((orderProduct) => createNormalizedProduct(orderProduct)) as NormalizedProduct[];

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
  console.log('items', items);
  for (const item of items) {
    console.log('item', item.products);
    if (!item || !item.products || !item.products.items) {
      throw Error('The API fetched products but it returned null.');
    }
  }

  const extendedItems: ExtendedOrder<SubscriptionOrder>[] = items.map((item) => ({
    ...item,
    normalizedProducts: createNormalizedProducts(item),
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

const adminFetcher = async (): Promise<ExtendedOrder<SubscriptionOrder>[]> => {
  // schema.graphqlのKeyディレクティブでtypeとcreatedAtのsort条件を追加。sortを実行する為にtypeを指定。
  // const sortVariables: ListSubscriptionOrdersSortedByCreatedAtQueryVariables = {
  //   type: Type.subscriptionOrder,
  //   sortDirection: ModelSortDirection.DESC,
  // };
  console.log('here');

  const result = (await API.graphql(
    // graphqlOperation(listSubscriptionOrders, sortVariables),
    graphqlOperation(listAdminSubscriptionOrders),
  )) as GraphQLResult<SubscriptionOrdersResponse>;

  console.log('result', result);
  if (!result.data || !result.data.items) {
    throw Error('The API fetched data but it returned null.');
  }

  const items = result.data.items as SubscriptionOrder[];
  console.log('items', items);
  for (const item of items) {
    console.log('item', item.products);
    if (!item || !item.products || !item.products.items) {
      throw Error('The API fetched products but it returned null.');
    }
  }

  const extendedItems: ExtendedOrder<SubscriptionOrder>[] = items.map((item) => ({
    ...item,
    normalizedProducts: createNormalizedProducts(item),
  }));

  return extendedItems;
};

const AdminSubscriptionOrderListContext = createContext({} as AdminSubscriptionOrderResponse);

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
