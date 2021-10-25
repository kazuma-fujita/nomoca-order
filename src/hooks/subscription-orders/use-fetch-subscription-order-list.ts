import { format, parseISO } from 'date-fns';
import { GraphQLResult } from '@aws-amplify/api';
import { ListSubscriptionOrdersQuery, SubscriptionOrder } from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { SWRKey } from 'constants/swr-key';
import { listSubscriptionOrders } from 'graphql/queries';
import useSWR from 'swr';
import { parseResponseError } from 'utilities/parse-response-error';

const translator = (item: SubscriptionOrder): SubscriptionOrder => {
  const copyItem: SubscriptionOrder = { ...item };
  copyItem.createdAt = format(parseISO(item.createdAt), 'yyyy/MM/dd');
  copyItem.updatedAt = format(parseISO(item.updatedAt), 'yyyy/MM/dd HH:mm');
  return copyItem;
};

const fetcher = async () => {
  const result = (await API.graphql(
    graphqlOperation(listSubscriptionOrders)
  )) as GraphQLResult<ListSubscriptionOrdersQuery>;
  if (result.data && result.data.listSubscriptionOrders && result.data.listSubscriptionOrders.items) {
    return result.data.listSubscriptionOrders.items as SubscriptionOrder[];
  } else {
    throw Error('The API fetched data but it returned null.');
  }
};

export const useFetchSubscriptionOrderList = () => {
  const { data: responseData, error: responseError } = useSWR(SWRKey.SubscriptionOrderList, fetcher);
  const error = parseResponseError(responseError);
  const data = responseData && responseData.map(translator);
  return { data, error };
};