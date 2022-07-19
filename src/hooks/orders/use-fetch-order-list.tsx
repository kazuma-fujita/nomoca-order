import { GraphQLResult } from '@aws-amplify/api';
import {
  ListOrdersSortedByCreatedAtQuery,
  ListOrdersSortedByCreatedAtQueryVariables,
  ModelSortDirection,
  Order,
  OrderProduct,
  Type,
} from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { SWRKey } from 'constants/swr-key';
import { listOrdersSortedByCreatedAt } from 'graphql/queries';
import { ExtendedOrder, NormalizedProduct } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { FetchResponse, useFetch } from 'hooks/swr/use-fetch';
import { createContext, useContext } from 'react';

const createNormalizedProduct = (orderProduct: OrderProduct | null): NormalizedProduct =>
  ({
    relationID: orderProduct?.id,
    productID: orderProduct?.orderID,
    name: orderProduct?.name,
    unitPrice: orderProduct?.unitPrice,
    quantity: orderProduct?.quantity,
  } as NormalizedProduct);

const createNormalizedProducts = (order: Order): NormalizedProduct[] =>
  order.products?.items.map((orderProduct) => createNormalizedProduct(orderProduct)) as NormalizedProduct[];

const fetcher = async (): Promise<ExtendedOrder<Order>[]> => {
  // schema.graphqlのKeyディレクティブでtypeとcreatedAtのsort条件を追加。sortを実行する為にtypeを指定。
  const sortVariables: ListOrdersSortedByCreatedAtQueryVariables = {
    type: Type.order,
    sortDirection: ModelSortDirection.DESC,
  };
  const result = (await API.graphql(
    graphqlOperation(listOrdersSortedByCreatedAt, sortVariables),
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
    normalizedProducts: createNormalizedProducts(item),
  }));

  return extendedItems;
};

const OrderListContext = createContext({} as FetchResponse<ExtendedOrder<Order>[]>);

export const useFetchOrderList = () => useContext(OrderListContext);

type Props = {
  mockResponse?: FetchResponse<ExtendedOrder<Order>[]>;
};

export const OrderListContextProvider: React.FC<Props> = ({ mockResponse, children }) => {
  const fetchResponse = useFetch<ExtendedOrder<Order>[]>(SWRKey.orderList, fetcher, {}, mockResponse);

  return <OrderListContext.Provider value={fetchResponse}>{children}</OrderListContext.Provider>;
};
