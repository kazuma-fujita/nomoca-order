import { GraphQLResult } from '@aws-amplify/api';
import {
  Clinic,
  CreateClinicInput,
  CreateClinicMutation,
  CreateClinicMutationVariables,
  Type,
  UpdateClinicInput,
  UpdateClinicMutation,
  UpdateClinicMutationVariables,
} from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { createClinic as createClinicMutation, updateClinic as updateClinicMutation } from 'graphql/mutations';
import { useCallback, useState } from 'react';
import { useSWRConfig } from 'swr';
import { parseResponseError } from 'utilities/parse-response-error';

export const useUpsertClinic = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();
  // mutateはstoreで保持しているdataをasyncで取得、加工後のdataをPromiseで返却しstoreのstateを更新する
  const onUpsertClinic =
    (param: Clinic) =>
    async (data: Clinic): Promise<Clinic> => {
      setIsLoading(true);
      try {
        let ret;
        if (!param.id) {
          const input: CreateClinicInput = { ...param };
          const variables: CreateClinicMutationVariables = { input: input };
          const result = (await API.graphql(
            graphqlOperation(createClinicMutation, variables),
          )) as GraphQLResult<CreateClinicMutation>;
          if (!result.data || !result.data.createClinic) {
            throw Error('The API created data but it returned null.');
          }
          ret = result.data.createClinic;
        } else {
          const input: UpdateClinicInput = { ...param };
          const variables: UpdateClinicMutationVariables = { input: input };
          const result = (await API.graphql(
            graphqlOperation(updateClinicMutation, variables),
          )) as GraphQLResult<UpdateClinicMutation>;
          if (!result.data || !result.data.updateClinic) {
            throw Error('The API updated data but it returned null.');
          }
          ret = result.data.updateClinic;
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
  const upsertClinic = useCallback(
    async (param: Clinic) => mutate(Type.clinic, onUpsertClinic(param), false),
    [mutate],
  );

  const resetState = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return { upsertClinic, isLoading, error, resetState };
};