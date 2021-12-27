import { GraphQLResult } from '@aws-amplify/api';
import {
  ListSubscriptionOrdersSortedByCreatedAtQuery,
  ListSubscriptionOrdersSortedByCreatedAtQueryVariables,
  ModelSortDirection,
  SubscriptionOrder,
} from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { ObjectType } from 'constants/object-type';
import { SWRKey } from 'constants/swr-key';
import { listSubscriptionOrdersSortedByCreatedAt } from 'graphql/queries';
import { FetchResponse, useFetch } from 'hooks/swr/use-fetch';
import { createContext, useContext } from 'react';

export type AdminSubscriptionOrderResponse = FetchResponse<SubscriptionOrder[]> & {
  allData: SubscriptionOrder[] | null;
};

const AdminSubscriptionOrderListContext = createContext({} as AdminSubscriptionOrderResponse);

export const useAdminSubscriptionOrderList = () => useContext(AdminSubscriptionOrderListContext);

const fetcher = async (): Promise<SubscriptionOrder[]> => {
  // schema.graphqlのKeyディレクティブでtypeとcreatedAtのsort条件を追加。sortを実行する為にtypeを指定。
  const sortVariables: ListSubscriptionOrdersSortedByCreatedAtQueryVariables = {
    type: ObjectType.SubscriptionOrder,
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
  const items = result.data.listSubscriptionOrdersSortedByCreatedAt.items;
  for (const item of items) {
    if (!item || !item.products || !item.products.items) {
      throw Error('The API fetched a data element but it returned null.');
    }
  }
  return items;
};

export const useFetchSubscriptionOrderList = (): FetchResponse<SubscriptionOrder[]> =>
  useFetch<SubscriptionOrder[]>(SWRKey.SubscriptionOrderList, fetcher);

export const AdminSubscriptionOrderListContextProvider: React.FC = ({ children }) => {
  // Windowにフォーカスが外れて再度当たった時のrevalidationを停止する
  const fetchResponse = useFetch<SubscriptionOrder[]>(SWRKey.AdminSubscriptionOrderList, fetcher, {
    revalidateOnFocus: false,
  });
  const { data } = fetchResponse;
  // メモリ上に全件データ保存するstate生成
  const { data: allData, mutate } = useFetch<SubscriptionOrder[]>(SWRKey.AdminAllSubscriptionOrderList, null);
  // 全件データstateが存在しない(初回アクセス)、かつAPIからデータ取得成功時
  if (!allData && data) {
    // 全件データ保存
    mutate(data, false);
  }
  const responseData = { ...fetchResponse, allData: allData };
  return (
    <AdminSubscriptionOrderListContext.Provider value={responseData}>
      {children}
    </AdminSubscriptionOrderListContext.Provider>
  );
};
