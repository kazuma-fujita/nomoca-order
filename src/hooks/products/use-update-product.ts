import { GraphQLResult } from '@aws-amplify/api';
import { Product, UpdateProductInput, UpdateProductMutation, UpdateProductMutationVariables } from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { updateProduct as updateProductQuery } from 'graphql/mutations';
import { useCallback, useState } from 'react';
import { useProductList } from 'stores/use-product-list';
import { useSWRConfig } from 'swr';
import { parseResponseError } from 'utilities/parse-response-error';

// 有効/無効のdisabledフラグのみ更新されるケースがある為、nameとunitPriceはnullable
type Args = {
  id: string;
  name?: string;
  unitPrice?: number;
  disabled: boolean;
};

export const useUpdateProduct = () => {
  const { swrKey } = useProductList();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();

  // mutateはstoreで保持しているdataをasyncで取得、加工後のdataをPromiseで返却しstoreのstateを更新する
  const onUpdateProduct =
    ({ id, name, unitPrice, disabled }: Args) =>
    async (data: Product[]): Promise<Product[]> => {
      setIsLoading(true);
      try {
        const p1: UpdateProductInput = { id: id, disabled: disabled };
        const p2: UpdateProductInput = name ? { ...p1, name: name } : p1;
        const p3: UpdateProductInput = unitPrice ? { ...p2, unitPrice: unitPrice } : p2;
        const variables: UpdateProductMutationVariables = { input: p3 };
        const result = (await API.graphql(
          graphqlOperation(updateProductQuery, variables),
        )) as GraphQLResult<UpdateProductMutation>;
        if (result.data && result.data.updateProduct) {
          setIsLoading(false);
          setError(null);
          const updatedProduct = result.data.updateProduct;
          return data.map((item) => (item.id === id ? updatedProduct : item));
        } else {
          throw Error('The API updated data but it returned null.');
        }
      } catch (error) {
        const errorResponse = parseResponseError(error);
        setIsLoading(false);
        setError(errorResponse);
        throw errorResponse;
      }
    };

  // mutateを実行してstoreで保持しているstateを更新。mutateの第1引数にはkeyを指定し、第2引数で状態変更を実行する関数を指定。mutateの戻り値はPromise<any>。
  const updateProduct = useCallback(
    async ({ id, name, unitPrice, disabled = false }: Args) =>
      mutate(swrKey, onUpdateProduct({ id, name, unitPrice, disabled }), false),
    [mutate, swrKey],
  );

  const resetState = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return { updateProduct, isLoading, error, resetState };
};
