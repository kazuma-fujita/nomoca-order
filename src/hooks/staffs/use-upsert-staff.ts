import { GraphQLResult } from '@aws-amplify/api';
import {
  CreateStaffInput,
  CreateStaffMutation,
  CreateStaffMutationVariables,
  Staff,
  Type,
  UpdateStaffInput,
  UpdateStaffMutation,
  UpdateStaffMutationVariables,
} from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { createStaff as createStaffMutation, updateStaff as updateStaffMutation } from 'graphql/mutations';
import { useCallback, useState } from 'react';
import { useSWRConfig } from 'swr';
import { parseResponseError } from 'utilities/parse-response-error';
import { useStaffList } from 'stores/use-staff-list';

export const useUpsertStaff = () => {
  const { swrKey } = useStaffList();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();
  // mutateはstoreで保持しているdataをasyncで取得、加工後のdataをPromiseで返却しstoreのstateを更新する
  const onUpsertStaff =
    (param: Staff) =>
    async (data: Staff[]): Promise<Staff[]> => {
      setIsLoading(true);
      try {
        let ret = [];
        const inputParam = {
          firstName: param.firstName,
          lastName: param.lastName,
          disabled: param.disabled,
        };
        if (!param.id) {
          // fetch query実行時にviewOrderでsortする為、typeには 'Staff' 文字列を設定
          // sort対象のviewOrderは配列長 + 1を設定
          const input: CreateStaffInput = {
            viewOrder: data.length + 1,
            type: Type.staff,
            ...inputParam,
          };
          const variables: CreateStaffMutationVariables = { input: input };
          const result = (await API.graphql(
            graphqlOperation(createStaffMutation, variables),
          )) as GraphQLResult<CreateStaffMutation>;
          if (!result.data || !result.data.createStaff) {
            throw Error('The API created data but it returned null.');
          }
          ret = [...data, result.data.createStaff];
        } else {
          // Update staff
          const input: UpdateStaffInput = {
            id: param.id,
            ...inputParam,
          };
          const variables: UpdateStaffMutationVariables = { input: input };
          const result = (await API.graphql(
            graphqlOperation(updateStaffMutation, variables),
          )) as GraphQLResult<UpdateStaffMutation>;
          if (!result.data || !result.data.updateStaff) {
            throw Error('The API updated data but it returned null.');
          }
          const updatedStaff = result.data.updateStaff;
          ret = data.map((item) => (item.id === updatedStaff.id ? updatedStaff : item));
        }
        setIsLoading(false);
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
  const upsertStaff = useCallback(
    async (param: Staff) => mutate(swrKey, onUpsertStaff(param), false),
    [mutate, swrKey],
  );

  const resetState = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return { upsertStaff, isLoading, error, resetState };
};
