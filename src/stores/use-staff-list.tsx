import { GraphQLResult } from '@aws-amplify/api';
import { ModelStaffFilterInput, Staff } from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { ObjectType } from 'constants/object-type';
import { SWRMultiKey } from 'constants/swr-key';
import { listStaffsSortedByViewOrder } from 'graphql/queries';
import { FetchResponse, useFetch } from 'hooks/swr/use-fetch';
import { createContext, useContext } from 'react';
import { ListStaffsSortedByViewOrderQuery, ListStaffsSortedByViewOrderQueryVariables } from '../API';

// type ProviderProps = {
//   data: Staff[] | null;
//   error: Error | null;
//   isLoading: boolean;
//   mutate: KeyedMutator<Staff[]>;
// };

// const StaffListContext = createContext({} as ProviderProps);
const StaffListContext = createContext({} as FetchResponse<Staff[]>);

export const useStaffList = () => useContext(StaffListContext);

const fetcher = async (key: string, filterWithActiveStaff: boolean = false) => {
  console.log('fetcher key:', key, 'filterWithActiveStaff:', filterWithActiveStaff);
  // activeなstaffのみを抽出する条件
  const filter: ModelStaffFilterInput = { disabled: { eq: false } };
  // schema.graphqlのKeyディレクティブでtypeとviewOrderのsort条件を追加。sortを実行する為にtypeを指定。defaultでviewOrderの降順でsortを実行
  const sortVariables: ListStaffsSortedByViewOrderQueryVariables = { type: ObjectType.Staff };
  // activeなstaffのみ抽出する場合filter条件追加
  const variables: ListStaffsSortedByViewOrderQueryVariables = filterWithActiveStaff
    ? { ...sortVariables, filter: filter }
    : sortVariables;
  const operation = graphqlOperation(listStaffsSortedByViewOrder, variables);
  // Graphql query操作実行
  const result = (await API.graphql(operation)) as GraphQLResult<ListStaffsSortedByViewOrderQuery>;
  if (result.data && result.data.listStaffsSortedByViewOrder && result.data.listStaffsSortedByViewOrder.items) {
    // console.log('staff fetcher:', result.data.listStaffsSortedByViewOrder.items);
    return result.data.listStaffsSortedByViewOrder.items as Staff[];
  } else {
    throw Error('The API fetched data but it returned null.');
  }
};

type Props = {
  filterWithActiveStaff: boolean;
};

// 担当者一覧画面の他、各画面の担当者プルダウンのマスターデータとなる為、
// 担当者プルダウンを実装する画面はTop階層(pages)で一回のみデータfetch、useContextを利用してdataを使い回す
export const StaffListContextProvider: React.FC<Props> = ({ filterWithActiveStaff, ...rest }) => {
  // SWRKeyは [SWRKeyString, boolean] の配列を指定
  const key = filterWithActiveStaff ? SWRMultiKey.ActiveStaffList : SWRMultiKey.AllStaffList;
  // const { data, error, mutate } = useSWR(key, fetcher);
  // const { data, error, isLoading, isListEmpty, mutate } = useFetch<Staff[]>(key, fetcher);
  const response = useFetch<Staff[]>(key, fetcher);
  // const props: FetchResponse = {
  //   data: data,
  //   error: error ? parseResponseError(error) : null,
  //   isLoading: Boolean(!data && !error),
  //   mutate: mutate,
  // };
  // return <StaffListContext.Provider value={props} {...rest} />;
  return <StaffListContext.Provider value={response} {...rest} />;
};
