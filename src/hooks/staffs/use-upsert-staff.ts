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
import { SWRKey } from 'constants/swr-key';
import { useFetchStaffList } from './use-fetch-staff-list';

export const useUpsertStaff = () => {
  const { data } = useFetchStaffList();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();
  const upsertStaff = async (param: Staff): Promise<void> => {
    setIsLoading(true);
    try {
      const inputParam = {
        firstName: param.firstName,
        lastName: param.lastName,
        disabled: param.disabled,
      };
      if (!param.id) {
        // fetch query実行時にviewOrderでsortする為、typeには 'Staff' 文字列を設定
        // sort対象のviewOrderは配列長 + 1を設定
        const input: CreateStaffInput = {
          viewOrder: data ? data.length + 1 : 1,
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
      } else {
        if (!data) {
          throw Error('data is undefined.');
        }
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
      }
      setError(null);
      // 一覧再取得
      mutate(SWRKey.staffList);
    } catch (error) {
      const errorResponse = parseResponseError(error);
      setIsLoading(false);
      setError(errorResponse);
      throw errorResponse;
    }
  };

  const resetState = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return { upsertStaff, isLoading, error, resetState };
};
