import { GraphQLResult } from '@aws-amplify/api';
import { Product, UpdateProductInput, UpdateProductMutation, UpdateProductMutationVariables } from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { SWRMultiKey } from 'constants/swr-key';
import { updateProduct as updateProductQuery } from 'graphql/mutations';
import { useCallback, useState } from 'react';
import { useSWRConfig } from 'swr';
import { parseResponseError } from 'utilities/parse-response-error';

type Args = {
  id: string;
  name?: string;
  disabled: boolean;
};

export const useUpdateProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();

  // mutateはstoreで保持しているdataをasyncで取得、加工後のdataをPromiseで返却しstoreのstateを更新する
  const onUpdateProduct =
    ({ id, name, disabled }: Args) =>
    async (data: Product[]): Promise<Product[]> => {
      setIsLoading(true);
      try {
        const product: UpdateProductInput = name ? { id: id, name: name, disabled } : { id: id, disabled };
        const variables: UpdateProductMutationVariables = { input: product };
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
        setIsLoading(false);
        setError(parseResponseError(error));
        console.error('update error:', error);
        return data;
      }
    };

  // mutateを実行してstoreで保持しているstateを更新。mutateの第1引数にはkeyを指定し、第2引数で状態変更を実行する関数を指定。mutateの戻り値はPromise<any>。
  const updateProduct = useCallback(
    async ({ id, name, disabled = false }: Args) =>
      mutate(SWRMultiKey.AllProductList, onUpdateProduct({ id, name, disabled }), false),
    [mutate],
  );

  const resetState = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return { updateProduct, isLoading, error, resetState };
};
