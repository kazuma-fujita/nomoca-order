import { GraphQLResult } from '@aws-amplify/api';
import {
  ListStaffSortedByViewOrderQuery,
  ListStaffSortedByViewOrderQueryVariables,
  ModelStaffFilterInput,
  Staff,
  Type,
} from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { SWRKey } from 'constants/swr-key';
import { listStaffSortedByViewOrder } from 'graphql/queries';
import { FetchResponse, useFetch } from 'hooks/swr/use-fetch';
import { createContext, useContext } from 'react';

type ProviderProps = FetchResponse<Staff[]> & {
  swrKey: (string | boolean)[];
};

const StaffListContext = createContext({} as ProviderProps);

export const useFetchStaffList = () => useContext(StaffListContext);

const fetcher = async (_: string, isFilterByActiveStaff: boolean): Promise<Staff[]> => {
  // activeなstaffのみを抽出する条件
  const filter: ModelStaffFilterInput = { disabled: { eq: false } };
  // schema.graphqlのKeyディレクティブでtypeとviewOrderのsort条件を追加。sortを実行する為にtypeを指定。defaultでviewOrderの降順でsortを実行
  const sortVariables: ListStaffSortedByViewOrderQueryVariables = { type: Type.staff };
  // activeなstaffのみ抽出する場合filter条件追加
  const variables: ListStaffSortedByViewOrderQueryVariables = isFilterByActiveStaff
    ? { ...sortVariables, filter: filter }
    : sortVariables;
  const operation = graphqlOperation(listStaffSortedByViewOrder, variables);
  // Graphql query操作実行
  const result = (await API.graphql(operation)) as GraphQLResult<ListStaffSortedByViewOrderQuery>;
  if (!result.data || !result.data.listStaffSortedByViewOrder || !result.data.listStaffSortedByViewOrder.items) {
    throw Error('The API fetched data but it returned null.');
  }
  return result.data.listStaffSortedByViewOrder.items as Staff[];
};

type Props = {
  isFilterByActiveStaff: boolean;
  isRevalidateOnFocus?: boolean;
  mockResponse?: FetchResponse<Staff[]>;
};

// 発注担当者一覧画面の他、各画面の発注担当者プルダウンのマスターデータとなる為、
// 発注担当者プルダウンを実装する画面はTop階層(pages)で一回のみデータfetch、useContextを利用してdataを使い回す
export const StaffListContextProvider: React.FC<Props> = ({
  isFilterByActiveStaff,
  isRevalidateOnFocus = true,
  mockResponse,
  ...rest
}) => {
  // SWRKeyは [SWRKeyString, boolean] の配列を指定
  const swrKey = [SWRKey.staffList, isFilterByActiveStaff];
  const response = useFetch<Staff[]>(swrKey, fetcher, { revalidateOnFocus: isRevalidateOnFocus }, mockResponse);
  return <StaffListContext.Provider value={{ ...response, swrKey }} {...rest} />;
};
