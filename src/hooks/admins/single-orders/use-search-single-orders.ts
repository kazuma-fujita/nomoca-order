import {
  SubscriptionOrder,
  DeliveryStatus,
  Order,
  ListOrdersSortedByCreatedAtQueryVariables,
  ModelSortDirection,
  Type,
  ListOrdersSortedByCreatedAtQuery,
} from 'API';
import { SWRKey } from 'constants/swr-key';
// import { useFetchSubscriptionOrderList, ExtendedOrder } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { useCallback, useState } from 'react';
import { useSWRConfig } from 'swr';
import { isFilterWithDeliveryMonth, maxMonth, minMonth } from 'functions/delivery-dates/is-filter-with-delivery-month';
import { SingleOrderSearchParam } from 'components/organisms/admins/single-orders/search-form/single-order-search-form';
import { ExtendedOrder } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { API, graphqlOperation } from 'aws-amplify';
import { listOrdersSortedByCreatedAt } from 'graphql/queries';
import { GraphQLResult } from '@aws-amplify/api';
import { transformOrderListIntoExtendedList } from 'hooks/orders/use-fetch-order-list';

export const useSearchSingleOrders = () => {
  // const { data } = useFetchSubscriptionOrderList();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();
  // この検索ロジックでは保存用の全件dataをcontextから取得、データ加工し画面表示用stateを更新。
  const onSearch =
    (param: SingleOrderSearchParam) =>
    async (data: ExtendedOrder<Order>[]): Promise<ExtendedOrder<Order>[]> => {
      setIsLoading(true);

      if (!data) {
        setIsLoading(false);
        setError(Error('All list data did not find.'));
        throw error;
      }
      console.log('param', param);

      // schema.graphqlのKeyディレクティブでtypeとcreatedAtのsort条件を追加。sortを実行する為にtypeを指定。
      const sortVariables: ListOrdersSortedByCreatedAtQueryVariables = {
        type: Type.order,
        sortDirection: ModelSortDirection.DESC,
      };

      // 全件検索以外はfilter指定
      const variables =
        param.deliveryStatus !== DeliveryStatus.none
          ? { ...sortVariables, filter: { deliveryStatus: { eq: param.deliveryStatus } } }
          : sortVariables;

      const result = (await API.graphql(
        graphqlOperation(listOrdersSortedByCreatedAt, variables),
      )) as GraphQLResult<ListOrdersSortedByCreatedAtQuery>;

      setIsLoading(false);
      setError(null);
      // 加工後データで画面表示用stateを更新。
      return transformOrderListIntoExtendedList(result);
    };

  const search = async (param: SingleOrderSearchParam) => mutate(SWRKey.orderList, onSearch(param), false);

  const resetState = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return { search, isLoading, error, resetState };
};
