import { GraphQLResult } from '@aws-amplify/api';
import { ListStaffsQuery, ListStaffsQueryVariables, ModelStaffFilterInput, Staff } from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { SWRKey } from 'constants/swr-key';
import { format, parseISO } from 'date-fns';
import { listStaffs } from 'graphql/queries';
import { createContext, useContext, useMemo } from 'react';
import useSWR, { KeyedMutator } from 'swr';
import { parseResponseError } from 'utilities/parse-response-error';
import { ListStaffsSortedByViewOrderQuery, ListStaffsSortedByViewOrderQueryVariables } from '../API';
import { listStaffsSortedByViewOrder } from 'graphql/queries';
import { ObjectType } from 'constants/object-type';

type ProviderProps = {
  data: Staff[] | undefined;
  error: Error | undefined;
  mutate: KeyedMutator<Staff[]>;
};

const StaffListContext = createContext({} as ProviderProps);

export const useStaffList = () => useContext(StaffListContext);

const fetcher = async (key: string, filterWithActiveStaff: boolean = false) => {
  console.log('fetcher key:', key, 'filterWithActiveStaff:', filterWithActiveStaff);
  // activeなstaffのみを抽出する条件
  const filter: ModelStaffFilterInput = { disabled: { eq: false } };
  // schema.graphqlのKeyディレクティブでtypeとviewOrderのsort条件を追加。sortを実行する為にtypeを指定
  const variables: ListStaffsSortedByViewOrderQueryVariables = filterWithActiveStaff
    ? { type: ObjectType.Staff, filter: filter }
    : { type: ObjectType.Staff };
  const operation = graphqlOperation(listStaffsSortedByViewOrder, variables);
  const result = (await API.graphql(operation)) as GraphQLResult<ListStaffsSortedByViewOrderQuery>;
  if (result.data && result.data.listStaffsSortedByViewOrder && result.data.listStaffsSortedByViewOrder.items) {
    console.log('staff fetcher:', result.data.listStaffsSortedByViewOrder.items);
    return result.data.listStaffsSortedByViewOrder.items as Staff[];
  } else {
    throw Error('The API fetched data but it returned null.');
  }
};

type Props = {
  filterWithActiveStaff: boolean;
};

// 担当者一覧画面の他、各画面の担当者プルダウンのマスターデータとなる為、
// 担当者プルダウンを実装する画面はTop階層(pages)で一回のみデータfetch、useContextを利用してdataを使います
export const StaffListContextProvider: React.FC<Props> = ({ filterWithActiveStaff, ...rest }) => {
  const { data, error: responseError, mutate } = useSWR([SWRKey.StaffList, filterWithActiveStaff], fetcher);
  const error = responseError && parseResponseError(responseError);
  // const data = responseData && responseData.map(translator);
  // const value = useMemo(() => ({ data, error, mutate }), [data, error, mutate]);
  // return <StaffListContext.Provider value={value} {...rest} />;
  return <StaffListContext.Provider value={{ data, error, mutate }} {...rest} />;
};
