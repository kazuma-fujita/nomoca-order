import { GraphQLResult } from '@aws-amplify/api';
import { UpdateStaffInput, UpdateStaffMutation, UpdateStaffMutationVariables, Staff } from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { SWRKey } from 'constants/swr-key';
import { updateStaff as updateStaffQuery } from 'graphql/mutations';
import { useCallback, useState } from 'react';
import { useSWRConfig } from 'swr';
import { parseErrorResponse } from 'utilities/parse-error-response';

export const useUpdateStaff = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();

  // mutateの第2引数function
  // mutateはstoreで保持しているdataをasyncで取得、加工後のdataをPromiseで返却しstoreのstateを更新する
  const onUpdateStaff =
    (id: string, name: string) =>
    async (data: Staff[]): Promise<Staff[]> => {
      setIsLoading(true);
      try {
        const staff: UpdateStaffInput = {
          id: id,
          name: name,
        };
        const variables: UpdateStaffMutationVariables = { input: staff };
        const result = (await API.graphql(
          graphqlOperation(updateStaffQuery, variables)
        )) as GraphQLResult<UpdateStaffMutation>;
        setIsLoading(false);
        setError(null);
        if (result.data && result.data.updateStaff) {
          const updatedStaff = result.data.updateStaff;
          console.log('updatedStaff:', updatedStaff);
          return data.map((item) => (item.id === id ? updatedStaff : item));
        } else {
          throw Error('The API updated data but it returned null.');
        }
      } catch (error) {
        setIsLoading(false);
        setError(parseErrorResponse(error));
        console.error('update error:', error);
        throw error as Error;
      }
    };

  // mutateを実行してstoreで保持しているstateを更新。mutateの第1引数にはkeyを指定し、第2引数で状態変更を実行する関数を指定。mutateの戻り値はPromise<any>。
  const updateStaff = useCallback(
    async (id: string, name: string) => mutate(SWRKey.StaffList, onUpdateStaff(id, name), false),
    []
  );

  const resetState = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return { updateStaff, isLoading, error, resetState };
};
