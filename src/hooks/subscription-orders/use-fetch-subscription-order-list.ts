import { GraphQLResult } from '@aws-amplify/api';
import {
  ListSubscriptionOrdersSortedByCreatedAtQuery,
  ListSubscriptionOrdersSortedByCreatedAtQueryVariables,
  ModelSortDirection,
  SubscriptionOrder,
} from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { ObjectType } from 'constants/object-type';
import { SWRKey } from 'constants/swr-key';
import { listSubscriptionOrdersSortedByCreatedAt } from 'graphql/queries';
import { FetchResponse, useFetch } from 'hooks/swr/use-fetch';

const fetcher = async (): Promise<SubscriptionOrder[]> => {
  // schema.graphqlのKeyディレクティブでtypeとcreatedAtのsort条件を追加。sortを実行する為にtypeを指定。
  const sortVariables: ListSubscriptionOrdersSortedByCreatedAtQueryVariables = {
    type: ObjectType.SubscriptionOrder,
    sortDirection: ModelSortDirection.DESC,
  };
  const result = (await API.graphql(
    graphqlOperation(listSubscriptionOrdersSortedByCreatedAt, sortVariables),
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
  return items;
};

export const useFetchSubscriptionOrderList = (): FetchResponse<SubscriptionOrder[]> =>
  useFetch<SubscriptionOrder[]>(SWRKey.SubscriptionOrderList, fetcher);

export const useFetchAdminSubscriptionOrderList = (): FetchResponse<SubscriptionOrder[]> =>
  useFetch<SubscriptionOrder[]>(SWRKey.AdminSubscriptionOrderList, fetcher);
