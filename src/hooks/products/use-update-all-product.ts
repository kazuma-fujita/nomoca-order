import { GraphQLResult } from '@aws-amplify/api';
import { Product, UpdateProductInput, UpdateProductMutation, UpdateProductMutationVariables } from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { updateProduct as updateProductQuery } from 'graphql/mutations';
import { useCallback, useState } from 'react';
import { useSWRConfig } from 'swr';
import { parseResponseError } from 'utilities/parse-response-error';
import { useProductList } from 'stores/use-product-list';

type Args = {
  sourceIndex: number;
  destinationIndex: number;
};

export const useUpdateAllProduct = () => {
  const { swrKey } = useProductList();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();

  // mutateはstoreで保持しているdataをasyncで取得、加工後のdataをPromiseで返却しstoreのstateを更新する
  const onUpdateAllProduct =
    ({ sourceIndex, destinationIndex }: Args) =>
    async (data: Product[]): Promise<Product[]> => {
      if (!data || data.length === 0 || !data[sourceIndex] || !data[destinationIndex]) return data;
      // スプレッド構文で配列をコピー
      const items = [...data];
      // 分割代入で要素を入れ替え
      [items[destinationIndex], items[sourceIndex]] = [items[sourceIndex], items[destinationIndex]];
      setIsLoading(true);
      // 配列要素をupdate
      try {
        items.forEach(async (item, index) => {
          const product: UpdateProductInput = { id: item.id, viewOrder: index + 1 };
          const variables: UpdateProductMutationVariables = { input: product };
          try {
            const result = (await API.graphql(
              graphqlOperation(updateProductQuery, variables),
            )) as GraphQLResult<UpdateProductMutation>;

            if (!result.data || !result.data.updateProduct) {
              throw Error('The API updated data but it returned null.');
            }
          } catch (error) {
            throw error;
          }
        });
      } catch (error) {
        const errorResponse = parseResponseError(error);
        setIsLoading(false);
        setError(errorResponse);
        throw errorResponse;
      }
      setIsLoading(false);
      setError(null);
      // 要素入れ替え後の配列を返却
      return items;
    };

  // mutateを実行してstoreで保持しているstateを更新。mutateの第1引数にはkeyを指定し、第2引数で状態変更を実行する関数を指定。mutateの戻り値はPromise<any>。
  const updateAllProduct = useCallback(
    async ({ sourceIndex, destinationIndex }: Args) =>
      mutate(swrKey, onUpdateAllProduct({ sourceIndex, destinationIndex }), false),
    [mutate, swrKey],
  );

  const resetState = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return { updateAllProduct, isLoading, error, resetState };
};
