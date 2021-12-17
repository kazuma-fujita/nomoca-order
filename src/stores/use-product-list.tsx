import { GraphQLResult } from '@aws-amplify/api';
import { ModelProductFilterInput, Product } from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { ObjectType } from 'constants/object-type';
import { SWRKey } from 'constants/swr-key';
import { listProductsSortedByViewOrder } from 'graphql/queries';
import { createContext, useContext } from 'react';
import useSWR, { KeyedMutator } from 'swr';
import { parseResponseError } from 'utilities/parse-response-error';
import { ListProductsSortedByViewOrderQuery, ListProductsSortedByViewOrderQueryVariables } from '../API';
import { SWRMultiKey } from 'constants/swr-key';

type ProviderProps = {
  data: Product[] | undefined;
  error: Error | undefined;
  mutate: KeyedMutator<Product[]>;
};

const ProductListContext = createContext({} as ProviderProps);

export const useProductList = () => useContext(ProductListContext);

const fetcher = async (key: string, filterWithActiveProduct: boolean = false) => {
  // activeなproductのみを抽出する条件
  const filter: ModelProductFilterInput = { disabled: { eq: false } };
  // schema.graphqlのKeyディレクティブでtypeとviewOrderのsort条件を追加。sortを実行する為にtypeを指定。defaultでviewOrderの降順でsortを実行
  const sortVariables: ListProductsSortedByViewOrderQueryVariables = { type: ObjectType.Product };
  // activeなproductのみ抽出する場合filter条件追加
  const variables: ListProductsSortedByViewOrderQueryVariables = filterWithActiveProduct
    ? { ...sortVariables, filter: filter }
    : sortVariables;
  const operation = graphqlOperation(listProductsSortedByViewOrder, variables);
  const result = (await API.graphql(operation)) as GraphQLResult<ListProductsSortedByViewOrderQuery>;
  if (result.data && result.data.listProductsSortedByViewOrder && result.data.listProductsSortedByViewOrder.items) {
    console.log('product fetcher:', result.data.listProductsSortedByViewOrder.items);
    return result.data.listProductsSortedByViewOrder.items as Product[];
  } else {
    throw Error('The API fetched data but it returned null.');
  }
};

type Props = {
  filterWithActiveProduct: boolean;
};

// 担当者一覧画面の他、各画面の担当者プルダウンのマスターデータとなる為、
// 担当者プルダウンを実装する画面はTop階層(pages)で一回のみデータfetch、useContextを利用してdataを使います
export const ProductListContextProvider: React.FC<Props> = ({ filterWithActiveProduct, ...rest }) => {
  // const { data, error: responseError, mutate } = useSWR([SWRKey.ProductList, filterWithActiveProduct], fetcher);
  const {
    data,
    error: responseError,
    mutate,
  } = useSWR(filterWithActiveProduct ? SWRMultiKey.ActiveProductList : SWRMultiKey.AllProductList, fetcher);
  const error = responseError && parseResponseError(responseError);
  return <ProductListContext.Provider value={{ data, error, mutate }} {...rest} />;
};
