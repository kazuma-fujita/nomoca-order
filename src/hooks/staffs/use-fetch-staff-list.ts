import { format, parseISO } from 'date-fns';
import { GraphQLResult } from '@aws-amplify/api';
import { ListStaffsQuery, Staff } from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { SWRKey } from 'constants/swr-key';
import { listStaffs } from 'graphql/queries';
import useSWR from 'swr';
import { parseResponseError } from 'utilities/parse-response-error';

const translator = (item: Staff): Staff => {
  const copyItem: Staff = { ...item };
  copyItem.updatedAt = format(parseISO(item.updatedAt), 'yyyy/MM/dd HH:mm');
  return copyItem;
};

const fetcher = async () => {
  const result = (await API.graphql(graphqlOperation(listStaffs))) as GraphQLResult<ListStaffsQuery>;
  console.log('call staff fetcher:', result);
  if (result.data && result.data.listStaffs && result.data.listStaffs.items) {
    return result.data.listStaffs.items as Staff[];
  } else {
    throw Error('The API fetched data but it returned null.');
  }
};

export const useFetchStaffList = () => {
  const { data: responseData, error: responseError } = useSWR(SWRKey.StaffList, fetcher);
  const error = parseResponseError(responseError);
  const data = responseData && responseData.map(translator);
  return { data, error };
};
