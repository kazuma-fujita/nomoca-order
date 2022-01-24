import { GraphQLResult } from '@aws-amplify/api';
import { ModelProductFilterInput, Product } from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { ObjectType } from 'constants/object-type';
import { SWRKey } from 'constants/swr-key';
import { listProductsSortedByViewOrder } from 'graphql/queries';
import { createContext, useContext } from 'react';
import useSWR, { KeyedMutator } from 'swr';
import { parseResponseError } from 'utilities/parse-response-error';
import { ListProductsSortedByViewOrderQuery, ListProductsSortedByViewOrderQueryVariables, ProductType } from '../API';
import { SWRMultiKey } from 'constants/swr-key';

type ProviderProps = {
  data: Product[] | undefined;
  error: Error | undefined;
  mutate: KeyedMutator<Product[]>;
  swrKey: (string | ProductType | boolean)[];
  productType: ProductType;
};

const ProductListContext = createContext({} as ProviderProps);

export const useProductList = () => useContext(ProductListContext);

const fetcher = async (key: string, productType: ProductType, filterWithActiveProduct: boolean) => {
  // activeなproductのみを抽出する条件
  const productTypeFilter: ModelProductFilterInput = { productType: { eq: productType } };
  // activeなproductのみ抽出する場合filter条件追加
  const filter = filterWithActiveProduct ? { ...productTypeFilter, disabled: { eq: false } } : productTypeFilter;
  // schema.graphqlのKeyディレクティブでtypeとviewOrderのsort条件を追加。sortを実行する為にtypeを指定。defaultでviewOrderの降順でsortを実行
  const sortVariables: ListProductsSortedByViewOrderQueryVariables = { type: ObjectType.Product, filter: filter };
  const operation = graphqlOperation(listProductsSortedByViewOrder, sortVariables);
  const result = (await API.graphql(operation)) as GraphQLResult<ListProductsSortedByViewOrderQuery>;
  if (result.data && result.data.listProductsSortedByViewOrder && result.data.listProductsSortedByViewOrder.items) {
    return result.data.listProductsSortedByViewOrder.items as Product[];
  } else {
    throw Error('The API fetched data but it returned null.');
  }
};

type Props = {
  productType: ProductType;
  filterWithActiveProduct: boolean;
};

// 担当者一覧画面の他、各画面の担当者プルダウンのマスターデータとなる為、
// 担当者プルダウンを実装する画面はTop階層(pages)で一回のみデータfetch、useContextを利用してdataを使います
export const ProductListContextProvider: React.FC<Props> = ({ productType, filterWithActiveProduct, ...rest }) => {
  const swrKey = [SWRKey.ProductList, productType, filterWithActiveProduct];
  const { data, error: responseError, mutate } = useSWR(swrKey, fetcher);
  const error = responseError && parseResponseError(responseError);
  return <ProductListContext.Provider value={{ data, error, mutate, swrKey, productType }} {...rest} />;
};
