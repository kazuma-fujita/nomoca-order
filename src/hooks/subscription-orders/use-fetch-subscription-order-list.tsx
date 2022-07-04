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
import { listSubscriptionOrdersSortedByCreatedAt } from 'graphql/queries';
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
  // nextDeliveryYearMonth?: string | null; // 次回配送予定月。定期便画面のみ使用
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
    // nextDeliveryYearMonth: generateFormattedNextDeliveryYearMonth(
    //   item.deliveryStartYear,
    //   item.deliveryStartMonth,
    //   item.deliveryInterval,
    //   now.getFullYear(),
    //   now.getMonth() + 1,
    // ),
  }));

  return extendedItems;
};

const SubscriptionOrderListContext = createContext({} as FetchResponse<ExtendedOrder<SubscriptionOrder>[]>);

export const useFetchSubscriptionOrderList = () => useContext(SubscriptionOrderListContext);

type Props = {
  mockResponse?: FetchResponse<ExtendedOrder<SubscriptionOrder>[]>;
};

export const SubscriptionOrderListContextProvider: React.FC<Props> = ({ mockResponse, children }) => {
  // const { now } = useNowDate();
  // const swrKey = [SWRKey.subscriptionOrderList, now];
  const fetchResponse = useFetch<ExtendedOrder<SubscriptionOrder>[]>(
    SWRKey.subscriptionOrderList,
    // swrKey,
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

export const useAdminSubscriptionOrderList = () => useContext(AdminSubscriptionOrderListContext);

// TODO: 一覧生成ロジックをバックエンドに移したらSubscriptionOrderListContextProviderと統合すること
export const AdminSubscriptionOrderListContextProvider: React.FC<Props> = ({ mockResponse, children }) => {
  // const { now } = useNowDate();
  // const swrKey = [SWRKey.subscriptionOrderList, now];
  // Windowにフォーカスが外れて再度当たった時のrevalidationを停止する
  const fetchResponse = useFetch<ExtendedOrder<SubscriptionOrder>[]>(
    SWRKey.AdminSubscriptionOrderList,
    // swrKey,
    fetcher,
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
