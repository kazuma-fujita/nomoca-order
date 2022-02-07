import { GraphQLResult } from '@aws-amplify/api';
import {
  ListOrdersSortedByCreatedAtQuery,
  ListOrdersSortedByCreatedAtQueryVariables,
  ModelSortDirection,
  Order,
  Type,
} from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { SWRKey } from 'constants/swr-key';
import { listOrdersSortedByCreatedAt } from 'graphql/queries';
import { FetchResponse, useFetch } from 'hooks/swr/use-fetch';
import { createContext, useContext } from 'react';
import { OrderProduct, OrderType } from 'API';
import { addDeliveryFeeAndExpressObjectToProductList } from 'functions/orders/add-delivery-fee-and-express-object-to-product-list';

const createNormalizedProduct = (orderProduct: OrderProduct): NormalizedProduct =>
  ({
    relationID: orderProduct?.id,
    productID: orderProduct?.productID,
    name: orderProduct?.product.name,
    unitPrice: orderProduct?.product.unitPrice,
    quantity: orderProduct?.quantity,
  } as NormalizedProduct);

const createNormalizedProducts = (order: Order): NormalizedProduct[] => {
  const normalizedProducts = order.products?.items.map((orderProduct) =>
    createNormalizedProduct(orderProduct!),
  ) as NormalizedProduct[];
  return order.orderType === OrderType.singleOrder
    ? addDeliveryFeeAndExpressObjectToProductList(normalizedProducts, order.deliveryType!)
    : normalizedProducts;
};

const fetcher = async (): Promise<ExtendedOrder[]> => {
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

  const extendedItems: ExtendedOrder[] = items.map((item) => ({
    ...item,
    normalizedProducts: createNormalizedProducts(item),
  }));

  return extendedItems;
};

export type NormalizedProduct = {
  relationID: string;
  productID: string;
  name: string;
  unitPrice: number;
  quantity: number;
};

export type ExtendedOrder = Order & {
  normalizedProducts: NormalizedProduct[];
};

export const useFetchOrderList = (): FetchResponse<ExtendedOrder[]> =>
  useFetch<ExtendedOrder[]>(SWRKey.orderList, fetcher);

export type AdminOrderResponse = FetchResponse<Order[]> & {
  allData: Order[] | null;
};

const AdminOrderListContext = createContext({} as AdminOrderResponse);

export const useAdminOrderList = () => useContext(AdminOrderListContext);

export const AdminOrderListContextProvider: React.FC = ({ children }) => {
  // Windowにフォーカスが外れて再度当たった時のrevalidationを停止する
  const fetchResponse = useFetch<Order[]>(SWRKey.AdminSubscriptionOrderList, fetcher, {
    revalidateOnFocus: false,
  });
  const { data } = fetchResponse;
  // メモリ上に全件データ保存するstate生成
  const { data: allData, mutate } = useFetch<Order[]>(SWRKey.AdminAllSubscriptionOrderList, null);
  // 全件データstateが存在しない(初回アクセス)、かつAPIからデータ取得成功時
  if (!allData && data) {
    // 全件データ保存
    mutate(data, false);
  }
  const responseData = { ...fetchResponse, allData: allData };
  return <AdminOrderListContext.Provider value={responseData}>{children}</AdminOrderListContext.Provider>;
};
