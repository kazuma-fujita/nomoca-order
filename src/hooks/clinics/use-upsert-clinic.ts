import { GraphQLResult } from '@aws-amplify/api';
import {
  Clinic,
  CreateClinicInput,
  CreateClinicMutation,
  CreateClinicMutationVariables,
  ListClinicsQuery,
  Type,
  UpdateClinicInput,
  UpdateClinicMutation,
  UpdateClinicMutationVariables,
} from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { createClinic as createClinicMutation, updateClinic as updateClinicMutation } from 'graphql/mutations';
import { listClinics } from 'graphql/queries';
import { useCallback, useState } from 'react';
import { useCurrentUser } from 'stores/use-current-user';
import { useSWRConfig } from 'swr';
import { parseResponseError } from 'utilities/parse-response-error';
import { SWRKey } from '../../constants/swr-key';

export const useUpsertClinic = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();
  const { email } = useCurrentUser();
  // mutateはstoreで保持しているdataをasyncで取得、加工後のdataをPromiseで返却しstoreのstateを更新する
  const onUpsertClinic =
    (param: Clinic) =>
    async (data: Clinic | undefined): Promise<Clinic> => {
      setIsLoading(true);
      try {
        if (!email) {
          throw Error('Signed in user mail address is not found.');
        }
        const listResult = (await API.graphql(graphqlOperation(listClinics))) as GraphQLResult<ListClinicsQuery>;
        if (!listResult.data || !listResult.data.listClinics || !listResult.data.listClinics.items) {
          throw Error('The clinic list data is not null after fetching data from API.');
        }
        let ret;
        if (!param.id) {
          // 1アカウントで保持出来るのは1医院レコードのみ
          // 新規登録時に既存レコードが存在したらエラー
          if (listResult.data.listClinics.items.length > 0) {
            throw Error('A clinic data is already found while creating a new clinic.');
          }
          // 入力フォームのオブジェクトからidプロパティを削除
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { id, ...rest } = param;
          const input: CreateClinicInput = { ...rest, mailAddress: email };
          const variables: CreateClinicMutationVariables = { input: input };
          const result = (await API.graphql(
            graphqlOperation(createClinicMutation, variables),
          )) as GraphQLResult<CreateClinicMutation>;
          if (!result.data || !result.data.createClinic) {
            throw Error('The API created data but it returned null.');
          }
          ret = result.data.createClinic;
        } else {
          // 1アカウントで保持出来るのは1医院レコードのみ
          // 更新登録時にレコードが1件以外だったらエラー
          if (listResult.data.listClinics.items.length !== 1) {
            throw Error('A clinic data is already found while creating a new clinic.');
          }
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
    async (param: Clinic) => mutate(SWRKey.clinic, onUpsertClinic(param), false),
    [mutate],
  );

  const resetState = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return { upsertClinic, isLoading, error, resetState };
};
