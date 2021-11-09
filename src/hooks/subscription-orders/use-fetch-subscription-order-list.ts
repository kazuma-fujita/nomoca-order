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

  if (!result.data || !result.data.listSubscriptionOrders || !result.data.listSubscriptionOrders.items) {
    throw Error('The API fetched data but it returned null.');
  }
  const items = result.data.listSubscriptionOrders.items;
  for (const item of items) {
    if (!item || !item.products || !item.products.items) {
      throw Error('The API fetched a data element but it returned null.');
    }
  }
  console.log('order fetcher:', items);
  return items as SubscriptionOrder[];
};

export const useFetchSubscriptionOrderList = () => {
  const { data, error: responseError } = useSWR(SWRKey.SubscriptionOrderList, fetcher);
  const error = parseResponseError(responseError);
  return { data, error };
};
