import { GraphQLResult } from '@aws-amplify/api';
import { ListStaffsQuery, Staff } from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { SWRKey } from 'constants/swr-key';
import { listStaffs } from 'graphql/queries';
import useSWR from 'swr';
import { parseErrorResponse } from 'utilities/parse-error-response';

export const useFetchStaffList = () => {
  const fetcher = async () => {
    const result = (await API.graphql(graphqlOperation(listStaffs))) as GraphQLResult<ListStaffsQuery>;
    if (result.data && result.data.listStaffs && result.data.listStaffs.items) {
      return result.data.listStaffs.items as Staff[];
    } else {
      throw Error('The API fetched data but it returned null.');
    }
  };
  const { data, error: errorResult } = useSWR(SWRKey.StaffList, fetcher);
  const error = parseErrorResponse(errorResult);
  return { data, error };
};
