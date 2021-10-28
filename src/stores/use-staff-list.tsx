import { GraphQLResult } from '@aws-amplify/api';
import { ListStaffsQuery, Staff } from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { SWRKey } from 'constants/swr-key';
import { format, parseISO } from 'date-fns';
import { listStaffs } from 'graphql/queries';
import { createContext, useContext, useMemo } from 'react';
import useSWR from 'swr';
import { parseResponseError } from 'utilities/parse-response-error';

type ProviderProps = {
  data: Staff[] | undefined;
  error: Error | undefined;
};

const StaffListContext = createContext({} as ProviderProps);

export const useStaffList = () => useContext(StaffListContext);

const translator = (item: Staff): Staff => {
  const copyItem: Staff = { ...item };
  copyItem.updatedAt = format(parseISO(item.updatedAt), 'yyyy/MM/dd HH:mm');
  return copyItem;
};

const fetcher = async () => {
  const result = (await API.graphql(graphqlOperation(listStaffs))) as GraphQLResult<ListStaffsQuery>;
  console.log('staff fetcher:', result);
  if (result.data && result.data.listStaffs && result.data.listStaffs.items) {
    return result.data.listStaffs.items as Staff[];
  } else {
    throw Error('The API fetched data but it returned null.');
  }
};

// 担当者一覧画面の他、各画面の担当者プルダウンのマスターデータとなる為、
// 担当者プルダウンを実装する画面はTop階層(pages)で一回のみデータfetch、useContextを利用してdataを使います
export const StaffListContextProvider = ({ ...props }) => {
  const { data: responseData, error: responseError } = useSWR(SWRKey.StaffList, fetcher);
  const error = responseError && parseResponseError(responseError);
  const data = responseData && responseData.map(translator);
  const value = useMemo(() => ({ data, error }), [data, error]);
  return <StaffListContext.Provider value={value} {...props} />;
};
