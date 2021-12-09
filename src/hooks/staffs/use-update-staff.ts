import { GraphQLResult } from '@aws-amplify/api';
import { Staff, UpdateStaffInput, UpdateStaffMutation, UpdateStaffMutationVariables } from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { SWRMultiKey } from 'constants/swr-key';
import { updateStaff as updateStaffQuery } from 'graphql/mutations';
import { useCallback, useState } from 'react';
import { useSWRConfig } from 'swr';
import { parseResponseError } from 'utilities/parse-response-error';

type Args = {
  id: string;
  name?: string;
  disabled: boolean;
};

export const useUpdateStaff = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();

  // mutateはstoreで保持しているdataをasyncで取得、加工後のdataをPromiseで返却しstoreのstateを更新する
  const onUpdateStaff =
    ({ id, name, disabled }: Args) =>
    async (data: Staff[]): Promise<Staff[]> => {
      setIsLoading(true);
      try {
        const staff: UpdateStaffInput = name ? { id: id, name: name, disabled } : { id: id, disabled };
        const variables: UpdateStaffMutationVariables = { input: staff };
        const result = (await API.graphql(
          graphqlOperation(updateStaffQuery, variables),
        )) as GraphQLResult<UpdateStaffMutation>;
        if (result.data && result.data.updateStaff) {
          setIsLoading(false);
          setError(null);
          const updatedStaff = result.data.updateStaff;
          console.log('updatedStaff:', updatedStaff);
          return data.map((item) => (item.id === id ? updatedStaff : item));
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
  const updateStaff = useCallback(
    async ({ id, name, disabled = false }: Args) =>
      mutate(SWRMultiKey.AllStaffList, onUpdateStaff({ id, name, disabled }), false),
    [mutate],
  );

  const resetState = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return { updateStaff, isLoading, error, resetState };
};
