import { GraphQLResult } from '@aws-amplify/api';
import { ListSubscriptionOrdersQuery, SubscriptionOrder } from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { SWRKey } from 'constants/swr-key';
import { listSubscriptionOrders } from 'graphql/queries';
import useSWR from 'swr';
import { parseResponseError } from 'utilities/parse-response-error';

const fetcher = async () => {
  const result = (await API.graphql(
    graphqlOperation(listSubscriptionOrders)
    // graphqlOperation(listSubscriptionOrders, { filter: { id: { contains: '25' } } })
  )) as GraphQLResult<ListSubscriptionOrdersQuery>;
  console.log('order fetcher:', result);
  if (result.data && result.data.listSubscriptionOrders && result.data.listSubscriptionOrders.items) {
    return result.data.listSubscriptionOrders.items as SubscriptionOrder[];
  } else {
    throw Error('The API fetched data but it returned null.');
  }
};

export const useFetchSubscriptionOrderList = () => {
  const { data, error: responseError } = useSWR(SWRKey.SubscriptionOrderList, fetcher);
  const error = parseResponseError(responseError);
  return { data, error };
};
