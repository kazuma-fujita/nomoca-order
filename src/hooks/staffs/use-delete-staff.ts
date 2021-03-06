import { GraphQLResult } from '@aws-amplify/api';
import { DeleteStaffInput, DeleteStaffMutation, DeleteStaffMutationVariables, Staff } from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { deleteStaff as deleteStaffQuery } from 'graphql/mutations';
import { useCallback, useState } from 'react';
import { useSWRConfig } from 'swr';
import { parseResponseError } from 'utilities/parse-response-error';
import { useFetchStaffList } from '../../hooks/staffs/use-fetch-staff-list';

export const useDeleteStaff = () => {
  const { swrKey } = useFetchStaffList();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();

  // mutateの第2引数function
  // mutateはstoreで保持しているdataをasyncで取得、加工後のdataをPromiseで返却しstoreのstateを更新する
  const onDeleteStaff =
    (id: string) =>
    async (data: Staff[]): Promise<Staff[]> => {
      setIsLoading(true);
      try {
        const staff: DeleteStaffInput = { id: id };
        const variables: DeleteStaffMutationVariables = { input: staff };
        const result = (await API.graphql(
          graphqlOperation(deleteStaffQuery, variables),
        )) as GraphQLResult<DeleteStaffMutation>;
        if (result.data && result.data.deleteStaff) {
          setIsLoading(false);
          setError(null);
          return data.filter((item) => item.id !== id);
        } else {
          throw Error('The API deleted data but it returned null.');
        }
      } catch (error) {
        setIsLoading(false);
        setError(parseResponseError(error));
        console.error('delete error:', error);
        return data;
      }
    };

  // mutateを実行してstoreで保持しているstateを更新。mutateの第1引数にはkeyを指定し、第2引数で状態変更を実行する関数を指定。mutateの戻り値はPromise<any>。
  const deleteStaff = useCallback(async (id: string) => mutate(swrKey, onDeleteStaff(id), false), [mutate, swrKey]);

  const resetState = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return { deleteStaff, isLoading, error, resetState };
};
