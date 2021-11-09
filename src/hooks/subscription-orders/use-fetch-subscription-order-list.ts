import { GraphQLResult } from '@aws-amplify/api';
import {
  ListSubscriptionOrdersQuery,
  ListSubscriptionOrdersSortedByCreatedAtQuery,
  ModelSortDirection,
  SubscriptionOrder,
} from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { SWRKey } from 'constants/swr-key';
import { listSubscriptionOrders } from 'graphql/queries';
import useSWR from 'swr';
import { parseResponseError } from 'utilities/parse-response-error';
import { listSubscriptionOrdersSortedByCreatedAt } from 'graphql/queries';
import { ListSubscriptionOrdersSortedByCreatedAtQueryVariables } from 'API';
import { ObjectType } from 'constants/object-type';

const fetcher = async () => {
  // schema.graphqlのKeyディレクティブでtypeとcreatedAtのsort条件を追加。sortを実行する為にtypeを指定。
  const sortVariables: ListSubscriptionOrdersSortedByCreatedAtQueryVariables = {
    type: ObjectType.SubscriptionOrder,
    sortDirection: ModelSortDirection.DESC,
  };
  const result = (await API.graphql(
    graphqlOperation(listSubscriptionOrdersSortedByCreatedAt, sortVariables)
  )) as GraphQLResult<ListSubscriptionOrdersSortedByCreatedAtQuery>;

  if (
    !result.data ||
    !result.data.listSubscriptionOrdersSortedByCreatedAt ||
    !result.data.listSubscriptionOrdersSortedByCreatedAt.items
  ) {
    throw Error('The API fetched data but it returned null.');
  }
  const items = result.data.listSubscriptionOrdersSortedByCreatedAt.items;
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
