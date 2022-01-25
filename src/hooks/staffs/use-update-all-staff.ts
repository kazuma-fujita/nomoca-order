import { GraphQLResult } from '@aws-amplify/api';
import { Staff, UpdateStaffInput, UpdateStaffMutation, UpdateStaffMutationVariables } from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { SWRMultiKey } from 'constants/swr-key';
import { updateStaff as updateStaffQuery } from 'graphql/mutations';
import { useCallback, useState } from 'react';
import { useSWRConfig } from 'swr';
import { parseResponseError } from 'utilities/parse-response-error';

type Args = {
  sourceIndex: number;
  destinationIndex: number;
};

export const useUpdateAllStaff = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();

  // mutateはstoreで保持しているdataをasyncで取得、加工後のdataをPromiseで返却しstoreのstateを更新する
  const onUpdateAllStaff =
    ({ sourceIndex, destinationIndex }: Args) =>
    async (data: Staff[]): Promise<Staff[]> => {
      if (!data || data.length === 0 || !data[sourceIndex] || !data[destinationIndex]) return data;
      // スプレッド構文で配列をコピー
      const items = [...data];
      // 分割代入で要素を入れ替え
      [items[destinationIndex], items[sourceIndex]] = [items[sourceIndex], items[destinationIndex]];
      // 配列要素をupdate
      setIsLoading(true);
      try {
        items.forEach(async (item, index) => {
          const staff: UpdateStaffInput = { id: item.id, viewOrder: index + 1 };
          const variables: UpdateStaffMutationVariables = { input: staff };
          try {
            const result = (await API.graphql(
              graphqlOperation(updateStaffQuery, variables),
            )) as GraphQLResult<UpdateStaffMutation>;
            if (!result.data || !result.data.updateStaff) {
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
  const updateAllStaff = useCallback(
    async ({ sourceIndex, destinationIndex }: Args) =>
      mutate(SWRMultiKey.AllStaffList, onUpdateAllStaff({ sourceIndex, destinationIndex }), false),
    [mutate],
  );

  const resetState = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return { updateAllStaff, isLoading, error, resetState };
};
