import { GraphQLResult } from '@aws-amplify/api';
import {
  DeliveryStatus,
  ListOrdersSortedByCreatedAtQuery,
  ListOrdersSortedByCreatedAtQueryVariables,
  ModelSortDirection,
  Order,
  Type,
} from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { SingleOrderSearchParam } from 'components/organisms/admins/single-orders/search-form/single-order-search-form';
import { SWRKey } from 'constants/swr-key';
import { listOrdersSortedByCreatedAt } from 'graphql/queries';
import { ExtendedOrder, NormalizedProduct } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { FetchResponse, useFetch } from 'hooks/swr/use-fetch';
import { createContext, useContext } from 'react';
import { useSingleOrderSearchParam } from 'hooks/admins/single-orders/use-single-order-search-param';
import { useCurrentUser } from 'stores/use-current-user';

const generateNormalizedProducts = (order: Order): NormalizedProduct[] => {
  if (!order.products) {
    throw Error('Order products are null.');
  }

  return order.products.items.map((orderProduct) => {
    if (!orderProduct) {
      throw Error('An order product relation is null.');
    }
    return {
      relationID: orderProduct.id,
      productID: orderProduct.orderID,
      name: orderProduct.name,
      unitPrice: orderProduct.unitPrice,
      quantity: orderProduct.quantity,
      isExportCSV: orderProduct.isExportCSV,
    } as NormalizedProduct;
  });
};

const fetcher = async (
  _: string,
  isOperator: boolean,
  searchState: SingleOrderSearchParam,
): Promise<ExtendedOrder<Order>[]> => {
  // schema.graphqlのKeyディレクティブでtypeとcreatedAtのsort条件を追加。sortを実行する為にtypeを指定。
  const sortVariables: ListOrdersSortedByCreatedAtQueryVariables = {
    type: Type.order,
    sortDirection: ModelSortDirection.DESC,
  };

  // admin権限かつ検索条件が全件検索以外はfilter指定をしてAPI実行
  const variables =
    isOperator && searchState.deliveryStatus !== DeliveryStatus.none
      ? { ...sortVariables, filter: { deliveryStatus: { eq: searchState.deliveryStatus } } }
      : sortVariables;

  const result = (await API.graphql(
    graphqlOperation(listOrdersSortedByCreatedAt, variables),
  )) as GraphQLResult<ListOrdersSortedByCreatedAtQuery>;

  if (!result.data || !result.data.listOrdersSortedByCreatedAt || !result.data.listOrdersSortedByCreatedAt.items) {
    throw Error('An API returned null.');
  }

  const items = result.data.listOrdersSortedByCreatedAt.items as Order[];

  for (const item of items) {
    if (!item || !item.products || !item.products.items) {
      throw Error('The API fetched product data but it returned null.');
    }
    for (const orderProduct of item.products.items) {
      if (!orderProduct) {
        throw Error('The API fetched order product data but it returned null.');
      }
    }
  }

  const extendedItems: ExtendedOrder<Order>[] = items.map((item) => ({
    ...item,
    normalizedProducts: generateNormalizedProducts(item),
  }));

  return extendedItems;
};

const OrderListContext = createContext({} as ProviderProps);

export const useFetchOrderList = () => useContext(OrderListContext);

// storybook用mock param
type Props = {
  mockResponse?: FetchResponse<ExtendedOrder<Order>[]>;
};

type ProviderProps = FetchResponse<ExtendedOrder<Order>[]> & {
  swrKey: (string | boolean | SingleOrderSearchParam)[];
};

export const OrderListContextProvider: React.FC<Props> = ({ mockResponse, children }) => {
  // adminユーザのみ検索をかける為、ログインユーザ権限取得
  const { isOperator } = useCurrentUser();
  // グローバルに保存された注文検索条件(admin管理画面用)
  const { searchState } = useSingleOrderSearchParam();
  // 検索条件もSWRキャッシュの対象
  const swrKey = [SWRKey.orderList, isOperator, searchState];
  const fetchResponse = useFetch<ExtendedOrder<Order>[]>(swrKey, fetcher, {}, mockResponse);
  return <OrderListContext.Provider value={{ ...fetchResponse, swrKey }}>{children}</OrderListContext.Provider>;
};
