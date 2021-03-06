import { GraphQLResult } from '@aws-amplify/api';
import {
  ListProductsSortedByViewOrderQuery,
  ListProductsSortedByViewOrderQueryVariables,
  ModelProductFilterInput,
  OrderType,
  Product,
  Type,
} from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { SWRKey } from 'constants/swr-key';
import { listProductsSortedByViewOrder } from 'graphql/queries';
import { FetchResponse, useFetch } from 'hooks/swr/use-fetch';
import { createContext, useContext } from 'react';

type ProviderProps = FetchResponse<Product[]> & {
  swrKey: (string | OrderType | boolean)[];
  orderType: OrderType;
};

const ProductListContext = createContext({} as ProviderProps);

export const useFetchProductList = () => useContext(ProductListContext);

const fetcher = async (_: string, orderType: OrderType, isFilterByActiveProduct: boolean) => {
  const orderTypeFilter: ModelProductFilterInput = { orderType: { eq: orderType } };
  // activeなproductのみ抽出する場合filter条件追加
  const filter = isFilterByActiveProduct ? { ...orderTypeFilter, disabled: { eq: false } } : orderTypeFilter;
  // schema.graphqlのKeyディレクティブでtypeとviewOrderのsort条件を追加。sortを実行する為にtypeを指定。defaultでviewOrderの降順でsortを実行
  const sortVariables: ListProductsSortedByViewOrderQueryVariables = { type: Type.product, filter: filter };
  const operation = graphqlOperation(listProductsSortedByViewOrder, sortVariables);
  const result = (await API.graphql(operation)) as GraphQLResult<ListProductsSortedByViewOrderQuery>;
  if (!result.data || !result.data.listProductsSortedByViewOrder || !result.data.listProductsSortedByViewOrder.items) {
    throw Error('The API fetched data but it returned null.');
  }
  return result.data.listProductsSortedByViewOrder.items as Product[];
};

type Props = {
  orderType: OrderType;
  isFilterByActiveProduct: boolean; // 有効なproductでfilter実行可否フラグ
  isRevalidateOnFocus?: boolean; // Windowにフォーカスが外れて再度当たった時のrevalidation実行可否フラグ。入力フォームのプルダウンデータはfalse
  mockResponse?: FetchResponse<Product[]>;
};

export const ProductListContextProvider: React.FC<Props> = ({
  orderType,
  isFilterByActiveProduct,
  isRevalidateOnFocus = true,
  mockResponse,
  ...rest
}) => {
  const swrKey = [SWRKey.productList, orderType, isFilterByActiveProduct];
  const response = useFetch<Product[]>(swrKey, fetcher, { revalidateOnFocus: isRevalidateOnFocus }, mockResponse);
  return <ProductListContext.Provider value={{ ...response, swrKey, orderType }} {...rest} />;
};
