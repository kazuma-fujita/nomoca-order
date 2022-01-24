import { GraphQLResult } from '@aws-amplify/api';
import { CreateProductInput, CreateProductMutation, CreateProductMutationVariables, Product, ProductType } from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { ObjectType } from 'constants/object-type';
import { SWRMultiKey } from 'constants/swr-key';
import { createProduct as createProductQuery } from 'graphql/mutations';
import { useCallback, useState } from 'react';
import { useSWRConfig } from 'swr';
import { parseResponseError } from 'utilities/parse-response-error';
import { useProductList } from 'stores/use-product-list';

export const useCreateProduct = () => {
  const { swrKey, productType } = useProductList();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();
  // mutateはstoreで保持しているdataをasyncで取得、加工後のdataをPromiseで返却しstoreのstateを更新する
  const onCreateProduct =
    (name: string, productType: ProductType) =>
    async (data: Product[]): Promise<Product[]> => {
      setIsLoading(true);
      try {
        // fetch query実行時にviewOrderでsortする為、typeには 'Product' 文字列を設定
        // sort対象のviewOrderは配列長 + 1を設定
        const product: CreateProductInput = {
          name: name,
          unitPrice: 1000,
          viewOrder: data.length + 1,
          type: ObjectType.Product,
          productType: productType,
          disabled: false,
        };
        const variables: CreateProductMutationVariables = { input: product };
        const result = (await API.graphql(
          graphqlOperation(createProductQuery, variables),
        )) as GraphQLResult<CreateProductMutation>;
        if (result.data && result.data.createProduct) {
          setIsLoading(false);
          setError(null);
          return [...data, result.data.createProduct];
        } else {
          throw Error('The API created data but it returned null.');
        }
      } catch (error) {
        setIsLoading(false);
        setError(parseResponseError(error));
        console.error('create error:', error);
        return data;
      }
    };

  // // mutateを実行してstoreで保持しているstateを更新。mutateの第1引数にはkeyを指定し、第2引数で状態変更を実行する関数を指定。mutateの戻り値はPromise<any>。
  const createProduct = useCallback(
    async (name: string) => mutate(swrKey, onCreateProduct(name, productType), false),
    [mutate, swrKey, productType],
  );

  const resetState = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return { createProduct, isLoading, error, resetState };
};
