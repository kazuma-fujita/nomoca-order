import { GraphQLResult } from '@aws-amplify/api';
import {
  CreateProductInput,
  CreateProductMutation,
  CreateProductMutationVariables,
  OrderType,
  Product,
  Type,
  UpdateProductInput,
  UpdateProductMutation,
  UpdateProductMutationVariables,
} from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { createProduct as createProductMutation, updateProduct as updateProductMutation } from 'graphql/mutations';
import { useCallback, useState } from 'react';
import { useFetchProductList } from 'hooks/products/use-fetch-product-list';
import { useSWRConfig } from 'swr';
import { parseResponseError } from 'utilities/parse-response-error';

export const useUpsertProduct = () => {
  const { swrKey, orderType } = useFetchProductList();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();
  // mutateはstoreで保持しているdataをasyncで取得、加工後のdataをPromiseで返却しstoreのstateを更新する
  const onUpsertProduct =
    (param: Product, orderType: OrderType) =>
    async (data: Product[] | undefined): Promise<Product[]> => {
      setIsLoading(true);
      try {
        let ret: Product[] = [];
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id: _1, viewOrder: _2, type: _3, orderType: _4, createdAt: _5, updatedAt: _6, ...rest } = param;

        if (!param.id) {
          // fetch query実行時にviewOrderでsortする為、typeには 'Product' 文字列を設定
          // sort対象のviewOrderは配列長 + 1を設定
          const input: CreateProductInput = {
            viewOrder: data ? data.length + 1 : 1,
            type: Type.product,
            orderType: orderType,
            ...rest,
          };
          const variables: CreateProductMutationVariables = { input: input };
          const result = (await API.graphql(
            graphqlOperation(createProductMutation, variables),
          )) as GraphQLResult<CreateProductMutation>;
          if (!result.data || !result.data.createProduct) {
            throw Error('The API created data but it returned null.');
          }
          ret = data ? [...data, result.data.createProduct] : [result.data.createProduct];
        } else {
          if (!data) {
            throw Error('data is undefined.');
          }
          // Update product
          const input: UpdateProductInput = {
            id: param.id,
            ...rest,
          };
          const variables: UpdateProductMutationVariables = { input: input };
          const result = (await API.graphql(
            graphqlOperation(updateProductMutation, variables),
          )) as GraphQLResult<UpdateProductMutation>;
          if (!result.data || !result.data.updateProduct) {
            throw Error('The API updated data but it returned null.');
          }
          const updatedProduct = result.data.updateProduct;
          ret = data.map((item) => (item.id === updatedProduct.id ? updatedProduct : item));
        }
        setError(null);
        return ret;
      } catch (error) {
        const errorResponse = parseResponseError(error);
        setIsLoading(false);
        setError(errorResponse);
        throw errorResponse;
      }
    };

  // // mutateを実行してstoreで保持しているstateを更新。mutateの第1引数にはkeyを指定し、第2引数で状態変更を実行する関数を指定。mutateの戻り値はPromise<any>。
  const upsertProduct = useCallback(
    async (param: Product) => mutate(swrKey, onUpsertProduct(param, orderType), false),
    [mutate, swrKey, orderType],
  );

  const resetState = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return { upsertProduct, isLoading, error, resetState };
};
