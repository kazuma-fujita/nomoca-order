import { GraphQLResult } from '@aws-amplify/api';
import {
  CreateProductInput,
  CreateProductMutation,
  CreateProductMutationVariables,
  Product,
  OrderType,
  Type,
} from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { createProduct as createProductQuery } from 'graphql/mutations';
import { useCallback, useState } from 'react';
import { useProductList } from 'stores/use-product-list';
import { useSWRConfig } from 'swr';
import { parseResponseError } from 'utilities/parse-response-error';

export const useCreateProduct = () => {
  const { swrKey, orderType } = useProductList();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();
  // mutateはstoreで保持しているdataをasyncで取得、加工後のdataをPromiseで返却しstoreのstateを更新する
  const onCreateProduct =
    (param: Product, orderType: OrderType) =>
    async (data: Product[]): Promise<Product[]> => {
      setIsLoading(true);
      try {
        // fetch query実行時にviewOrderでsortする為、typeには 'Product' 文字列を設定
        // sort対象のviewOrderは配列長 + 1を設定
        const product: CreateProductInput = {
          name: param.name,
          unitPrice: Number(param.unitPrice),
          viewOrder: data.length + 1,
          type: Type.product,
          orderType: orderType,
          isExportCSV: param.isExportCSV,
          disabled: false,
        };
        const variables: CreateProductMutationVariables = { input: product };
        const result = (await API.graphql(
          graphqlOperation(createProductQuery, variables),
        )) as GraphQLResult<CreateProductMutation>;
        if (!result.data || !result.data.createProduct) {
          throw Error('The API created data but it returned null.');
        }
        setIsLoading(false);
        setError(null);
        return [...data, result.data.createProduct];
      } catch (error) {
        const errorResponse = parseResponseError(error);
        setIsLoading(false);
        setError(errorResponse);
        throw errorResponse;
      }
    };

  // // mutateを実行してstoreで保持しているstateを更新。mutateの第1引数にはkeyを指定し、第2引数で状態変更を実行する関数を指定。mutateの戻り値はPromise<any>。
  const createProduct = useCallback(
    async (param: Product) => mutate(swrKey, onCreateProduct(param, orderType), false),
    [mutate, swrKey, orderType],
  );

  const resetState = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return { createProduct, isLoading, error, resetState };
};
