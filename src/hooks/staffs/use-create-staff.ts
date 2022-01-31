import { GraphQLResult } from '@aws-amplify/api';
import { CreateStaffInput, CreateStaffMutation, CreateStaffMutationVariables, Staff, Type } from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { SWRMultiKey } from 'constants/swr-key';
import { createStaff as createStaffQuery } from 'graphql/mutations';
import { useCallback, useState } from 'react';
import { useSWRConfig } from 'swr';
import { parseResponseError } from 'utilities/parse-response-error';

export const useCreateStaff = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();
  // mutateはstoreで保持しているdataをasyncで取得、加工後のdataをPromiseで返却しstoreのstateを更新する
  const onCreateStaff =
    (name: string) =>
    async (data: Staff[]): Promise<Staff[]> => {
      setIsLoading(true);
      try {
        // fetch query実行時にviewOrderでsortする為、typeには 'Staff' 文字列を設定
        // sort対象のviewOrderは配列長 + 1を設定
        const staff: CreateStaffInput = {
          name: name,
          viewOrder: data.length + 1,
          type: Type.staff,
          disabled: false,
        };
        const variables: CreateStaffMutationVariables = { input: staff };
        const result = (await API.graphql(
          graphqlOperation(createStaffQuery, variables),
        )) as GraphQLResult<CreateStaffMutation>;
        if (result.data && result.data.createStaff) {
          setIsLoading(false);
          setError(null);
          return [...data, result.data.createStaff];
        } else {
          throw Error('The API created data but it returned null.');
        }
      } catch (error) {
        const errorResponse = parseResponseError(error);
        setIsLoading(false);
        setError(errorResponse);
        throw errorResponse;
      }
    };

  // // mutateを実行してstoreで保持しているstateを更新。mutateの第1引数にはkeyを指定し、第2引数で状態変更を実行する関数を指定。mutateの戻り値はPromise<any>。
  const createStaff = useCallback(
    async (name: string) => mutate(SWRMultiKey.AllStaffList, onCreateStaff(name), false),
    [mutate],
  );

  const resetState = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return { createStaff, isLoading, error, resetState };
};
