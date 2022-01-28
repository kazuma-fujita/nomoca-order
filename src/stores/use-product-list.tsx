import { GraphQLResult } from '@aws-amplify/api';
import {
  ListProductsSortedByViewOrderQuery,
  ListProductsSortedByViewOrderQueryVariables,
  ModelProductFilterInput,
  Product,
  ProductType,
  Type,
} from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { SWRKey } from 'constants/swr-key';
import { listProductsSortedByViewOrder } from 'graphql/queries';
import { useFetch } from 'hooks/swr/use-fetch';
import { createContext, useContext } from 'react';
import { FetchResponse } from '../hooks/swr/use-fetch';

type ProviderProps = FetchResponse<Product[]> & {
  // data: Product[] | undefined;
  // error: Error | undefined;
  // mutate: KeyedMutator<Product[]>;
  swrKey: (string | ProductType | boolean)[];
  productType: ProductType;
};

const ProductListContext = createContext({} as ProviderProps);

export const useProductList = () => useContext(ProductListContext);

const fetcher = async (key: string, productType: ProductType, filterWithActiveProduct: boolean) => {
  const productTypeFilter: ModelProductFilterInput = { productType: { eq: productType } };
  // activeなproductのみ抽出する場合filter条件追加
  const filter = filterWithActiveProduct ? { ...productTypeFilter, disabled: { eq: false } } : productTypeFilter;
  // schema.graphqlのKeyディレクティブでtypeとviewOrderのsort条件を追加。sortを実行する為にtypeを指定。defaultでviewOrderの降順でsortを実行
  const sortVariables: ListProductsSortedByViewOrderQueryVariables = { type: Type.product, filter: filter };
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

export const ProductListContextProvider: React.FC<Props> = ({ productType, filterWithActiveProduct, ...rest }) => {
  const swrKey = [SWRKey.ProductList, productType, filterWithActiveProduct];
  const response = useFetch<Product[]>(swrKey, fetcher);
  return <ProductListContext.Provider value={{ ...response, swrKey, productType }} {...rest} />;
};
