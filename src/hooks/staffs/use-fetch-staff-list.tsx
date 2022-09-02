import { GraphQLResult } from '@aws-amplify/api';
import { ListStaffSortedByViewOrderQuery, ListStaffSortedByViewOrderQueryVariables, Staff, Type } from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { SWRKey } from 'constants/swr-key';
import { listStaffSortedByViewOrder } from 'graphql/queries';
import { FetchResponse, useFetch } from 'hooks/swr/use-fetch';
import { createContext, useContext } from 'react';

const StaffListContext = createContext({} as FetchResponse<Staff[]>);

export const useFetchStaffList = () => useContext(StaffListContext);

const fetcher = async (): Promise<Staff[]> => {
  // schema.graphqlのKeyディレクティブでtypeとviewOrderのsort条件を追加。sortを実行する為にtypeを指定。defaultでviewOrderの降順でsortを実行
  const sortVariables: ListStaffSortedByViewOrderQueryVariables = { type: Type.staff };
  const operation = graphqlOperation(listStaffSortedByViewOrder, sortVariables);
  // Graphql query操作実行
  const result = (await API.graphql(operation)) as GraphQLResult<ListStaffSortedByViewOrderQuery>;
  if (!result.data || !result.data.listStaffSortedByViewOrder || !result.data.listStaffSortedByViewOrder.items) {
    throw Error('The API fetched data but it returned null.');
  }
  return result.data.listStaffSortedByViewOrder.items as Staff[];
};

type Props = {
  isRevalidateOnFocus?: boolean;
  mockResponse?: FetchResponse<Staff[]>;
};

// 発注担当者一覧画面の他、各画面の発注担当者プルダウンのマスターデータとなる為、
// 発注担当者プルダウンを実装する画面はTop階層(pages)で一回のみデータfetch、useContextを利用してdataを使い回す
export const StaffListContextProvider: React.FC<Props> = ({ isRevalidateOnFocus = true, mockResponse, ...rest }) => {
  const response = useFetch<Staff[]>(
    SWRKey.staffList,
    fetcher,
    { revalidateOnFocus: isRevalidateOnFocus },
    mockResponse,
  );
  return <StaffListContext.Provider value={{ ...response }} {...rest} />;
};
