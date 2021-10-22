import { GraphQLResult } from '@aws-amplify/api';
import { CreateStaffInput, CreateStaffMutation, CreateStaffMutationVariables, Staff } from 'API';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { SWRKey } from 'constants/swr-key';
import { createStaff as createStaffQuery } from 'graphql/mutations';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { KeyedMutator, useSWRConfig } from 'swr';
import { parseResponseError } from 'utilities/parse-response-error';
import { CognitoUserInterface, onAuthUIStateChange, AuthState } from '@aws-amplify/ui-components';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { Path } from 'constants/path';

type ProviderProps = {
  currentUser: CognitoUserInterface | undefined;
  error: Error | undefined;
  mutateUser: KeyedMutator<CognitoUserInterface>;
  groups: string[] | undefined;
};

const CurrentUserContext = createContext({} as ProviderProps);

export const useCurrentUser = () => useContext(CurrentUserContext);

// const fetcher = async () => await Auth.currentAuthenticatedUser();

// export const CurrentUserContextProvider = ({ ...props }) => {
//   const { data: currentUser, error, mutate: mutateUser } = useSWR<CognitoUserInterface, Error>('currentUser', fetcher);
//   const groups = currentUser
//     ? (currentUser.signInUserSession.accessToken.payload['cognito:groups'] as string[])
//     : undefined;
//   const value = useMemo(() => ({ currentUser, error, mutateUser, groups }), [currentUser, error, mutateUser, groups]);
//   return <CurrentUserContext.Provider value={value} {...props} />;
// };

export const CurrentUserContextProvider = ({ ...props }) => {
  // useSWRの第2引数をnullに指定するとfetchが実行されない。local state の状態管理のみ行う。
  const {
    data: currentUser,
    error,
    mutate: mutateUser,
  } = useSWR<CognitoUserInterface, Error>(SWRKey.CurrentUser, null);
  const groups = currentUser
    ? (currentUser.signInUserSession.accessToken.payload['cognito:groups'] as string[])
    : undefined;
  console.log('CurrentUserContextProvider user:', currentUser);
  console.log('CurrentUserContextProvider group:', groups);
  const value = useMemo(() => ({ currentUser, error, mutateUser, groups }), [currentUser, error, mutateUser, groups]);
  return <CurrentUserContext.Provider value={value} {...props} />;
};

export const useVerifyAuthenticated = () => {
  const router = useRouter();
  const { mutateUser } = useCurrentUser();
  useEffect(() => {
    // 高速に遷移するため事前に遷移先画面をprefetchする
    router.prefetch(Path.Index);
    (async () => {
      try {
        // Cognitoから認証情報取得
        const user = await Auth.currentAuthenticatedUser();
        // Global stateの更新。useSWRの第2引数にfalseを指定すると再検証(再fetch)をしない
        mutateUser(user, false);
      } catch (error) {
        // URL直叩き対応。未認証の場合 The user is not authenticated が発生する
        router.replace(Path.Index);
      }
    })();
    // TODO: ログアウトのハンドリング。全画面で必要ない？
    return onAuthUIStateChange((nextAuthState, authData) => {
      console.log('after auth nextAuthState:', nextAuthState);
      if (nextAuthState === AuthState.SignedOut) {
        router.replace(Path.Index);
      }
    });
  }, []);
};

export const useVerifyBeforeAuthenticate = () => {
  const router = useRouter();
  useEffect(() => {
    // 高速に遷移するため事前に遷移先画面をprefetchする
    router.prefetch(Path.Staff);
    (async () => {
      try {
        // 認証済みの場合dashboardへ遷移
        await Auth.currentAuthenticatedUser();
        router.replace(Path.Staff);
      } catch (error) {}
    })();
    // 画面ステータスをみてログイン後画面に遷移
    return onAuthUIStateChange((nextAuthState, authData) => {
      console.log('before auth nextAuthState:', nextAuthState);
      if (nextAuthState === AuthState.SignedIn && authData) {
        router.replace(Path.Staff);
      }
    });
  }, []);
};

export const useVerifySignOut = () => {
  const router = useRouter();
  useEffect(() => {
    // 高速に遷移するため事前に遷移先画面をprefetchする
    router.prefetch(Path.Index);
    return onAuthUIStateChange((nextAuthState, authData) => {
      console.log('sign out nextAuthState:', nextAuthState);
      if (nextAuthState === AuthState.SignedOut) {
        deleteAllCache();
        router.replace(Path.Index);
      }
    });
  }, []);
};

const deleteAllCache = () => {
  const { cache } = useSWRConfig();
  cache.delete(SWRKey.CurrentUser);
  cache.delete(SWRKey.StaffList);
};
