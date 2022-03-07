import { GraphQLResult } from '@aws-amplify/api';
import { ModelStaffFilterInput, Staff, Type } from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { SWRMultiKey } from 'constants/swr-key';
import { listStaffSortedByViewOrder } from 'graphql/queries';
import { FetchResponse, useFetch } from 'hooks/swr/use-fetch';
import { createContext, useContext } from 'react';
import { ListStaffSortedByViewOrderQuery, ListStaffSortedByViewOrderQueryVariables } from 'API';

const StaffListContext = createContext({} as FetchResponse<Staff[]>);

export const useStaffList = () => useContext(StaffListContext);

const fetcher = async (key: string, isFilterByActiveStaff: boolean = false) => {
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
  if (result.data && result.data.listStaffSortedByViewOrder && result.data.listStaffSortedByViewOrder.items) {
    return result.data.listStaffSortedByViewOrder.items as Staff[];
  } else {
    throw Error('The API fetched data but it returned null.');
  }
};

type Props = {
  isFilterByActiveStaff: boolean;
  isRevalidateOnFocus?: boolean;
};

// 担当者一覧画面の他、各画面の担当者プルダウンのマスターデータとなる為、
// 担当者プルダウンを実装する画面はTop階層(pages)で一回のみデータfetch、useContextを利用してdataを使い回す
export const StaffListContextProvider: React.FC<Props> = ({
  isFilterByActiveStaff,
  isRevalidateOnFocus = true,
  ...rest
}) => {
  // SWRKeyは [SWRKeyString, boolean] の配列を指定
  const key = isFilterByActiveStaff ? SWRMultiKey.ActiveStaffList : SWRMultiKey.AllStaffList;
  const response = useFetch<Staff[]>(key, fetcher, { revalidateOnFocus: isRevalidateOnFocus });
  return <StaffListContext.Provider value={response} {...rest} />;
};
