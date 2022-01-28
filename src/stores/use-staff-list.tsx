import { GraphQLResult } from '@aws-amplify/api';
import { ModelStaffFilterInput, Staff, Type } from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { SWRMultiKey } from 'constants/swr-key';
import { listStaffsSortedByViewOrder } from 'graphql/queries';
import { FetchResponse, useFetch } from 'hooks/swr/use-fetch';
import { createContext, useContext } from 'react';
import { ListStaffsSortedByViewOrderQuery, ListStaffsSortedByViewOrderQueryVariables } from 'API';

const StaffListContext = createContext({} as FetchResponse<Staff[]>);

export const useStaffList = () => useContext(StaffListContext);

const fetcher = async (key: string, isFilterByActiveStaff: boolean = false) => {
  // activeなstaffのみを抽出する条件
  const filter: ModelStaffFilterInput = { disabled: { eq: false } };
  // schema.graphqlのKeyディレクティブでtypeとviewOrderのsort条件を追加。sortを実行する為にtypeを指定。defaultでviewOrderの降順でsortを実行
  const sortVariables: ListStaffsSortedByViewOrderQueryVariables = { type: Type.staff };
  // activeなstaffのみ抽出する場合filter条件追加
  const variables: ListStaffsSortedByViewOrderQueryVariables = isFilterByActiveStaff
    ? { ...sortVariables, filter: filter }
    : sortVariables;
  const operation = graphqlOperation(listStaffsSortedByViewOrder, variables);
  // Graphql query操作実行
  const result = (await API.graphql(operation)) as GraphQLResult<ListStaffsSortedByViewOrderQuery>;
  if (result.data && result.data.listStaffsSortedByViewOrder && result.data.listStaffsSortedByViewOrder.items) {
    return result.data.listStaffsSortedByViewOrder.items as Staff[];
  } else {
    throw Error('The API fetched data but it returned null.');
  }
};

type Props = {
  isFilterByActiveStaff: boolean;
};

// 担当者一覧画面の他、各画面の担当者プルダウンのマスターデータとなる為、
// 担当者プルダウンを実装する画面はTop階層(pages)で一回のみデータfetch、useContextを利用してdataを使い回す
export const StaffListContextProvider: React.FC<Props> = ({ isFilterByActiveStaff, ...rest }) => {
  // SWRKeyは [SWRKeyString, boolean] の配列を指定
  const key = isFilterByActiveStaff ? SWRMultiKey.ActiveStaffList : SWRMultiKey.AllStaffList;
  const response = useFetch<Staff[]>(key, fetcher);
  return <StaffListContext.Provider value={response} {...rest} />;
};
