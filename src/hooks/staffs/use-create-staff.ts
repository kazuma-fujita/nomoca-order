import { GraphQLResult } from '@aws-amplify/api';
import { CreateStaffInput, CreateStaffMutation, CreateStaffMutationVariables, Staff } from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { SWRKey } from 'constants/swr-key';
import { createStaff as createStaffQuery } from 'graphql/mutations';
import { useCallback, useState } from 'react';
import { KeyedMutator, useSWRConfig } from 'swr';
import { parseResponseError } from 'utilities/parse-response-error';
import { useStaffList } from 'stores/use-staff-list';

export const useCreateStaff = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();
  // const { data, mutate } = useStaffList();
  // mutateの第2引数function
  // mutateはstoreで保持しているdataをasyncで取得、加工後のdataをPromiseで返却しstoreのstateを更新する
  const onCreateStaff =
    (name: string, disabled: boolean = false) =>
    async (data: Staff[]) => {
      setIsLoading(true);
      try {
        const staff: CreateStaffInput = { name: name, disabled: disabled };
        const variables: CreateStaffMutationVariables = { input: staff };
        const result = (await API.graphql(
          graphqlOperation(createStaffQuery, variables)
        )) as GraphQLResult<CreateStaffMutation>;
        setIsLoading(false);
        setError(null);
        if (result.data && result.data.createStaff) {
          console.log('newStaff:', result.data.createStaff);
          return [...data, result.data.createStaff];
        } else {
          throw Error('The API created data but it returned null.');
        }
      } catch (error) {
        setIsLoading(false);
        setError(parseResponseError(error));
        console.error('create error:', error);
        // throw error as Error;
      }
    };

  // // mutateを実行してstoreで保持しているstateを更新。mutateの第1引数にはkeyを指定し、第2引数で状態変更を実行する関数を指定。mutateの戻り値はPromise<any>。
  const createStaff = useCallback(
    async (name: string) => mutate([SWRKey.StaffList, false], onCreateStaff(name), false),
    []
  );
  // const createStaff = useCallback(
  //   async (name: string, disabled: boolean = false) => {
  //     setIsLoading(true);
  //     try {
  //       const staff: CreateStaffInput = { name: name, disabled: disabled };
  //       const variables: CreateStaffMutationVariables = { input: staff };
  //       const result = (await API.graphql(
  //         graphqlOperation(createStaffQuery, variables)
  //       )) as GraphQLResult<CreateStaffMutation>;
  //       setIsLoading(false);
  //       setError(null);
  //       if (result.data && result.data.createStaff) {
  //         const newStaff = result.data.createStaff;
  //         console.log('newStaff:', newStaff);
  //         console.log('current data:', data);
  //         mutate(data && [...data, newStaff], false);
  //       } else {
  //         throw Error('The API created data but it returned null.');
  //       }
  //     } catch (error) {
  //       setIsLoading(false);
  //       setError(parseResponseError(error));
  //       console.error('create error:', error);
  //       // throw error as Error;
  //     }
  //   },
  //   [data]
  // );

  const resetState = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return { createStaff, isLoading, error, resetState };
};
