import { AuthState, CognitoUserInterface, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { Auth } from 'aws-amplify';
import { Path } from 'constants/path';
import { SWRKey } from 'constants/swr-key';
import { UserGroup } from 'constants/user-group';
import { NextRouter, useRouter } from 'next/router';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import useSWR, { KeyedMutator, useSWRConfig } from 'swr';
import { parseResponseError } from 'utilities/parse-response-error';

type ProviderProps = {
  currentUser: CognitoUserInterface | undefined;
  error: Error | undefined;
  mutateUser: KeyedMutator<CognitoUserInterface>;
  groups: string[] | undefined;
  isOperator: boolean;
};

const CurrentUserContext = createContext({} as ProviderProps);

export const useCurrentUser = () => useContext(CurrentUserContext);

export const CurrentUserContextProvider = ({ ...props }) => {
  // useSWRの第2引数をnullに指定するとfetchが実行されない。local state の状態管理のみ行う。
  // 最初に全パラメーターがundefinedの空stateを生成。各画面でmutateUserを呼び出してstateを更新する。
  const {
    data: currentUser,
    error,
    mutate: mutateUser,
  } = useSWR<CognitoUserInterface, Error>(SWRKey.CurrentUser, null);
  // cognito:groupsはUserGroup名配列が格納される。payloadからUserGroupが取得出来ない場合undefinedが返却される
  const groups: string[] | undefined = currentUser
    ? currentUser.signInUserSession.accessToken.payload['cognito:groups']
    : undefined;
  const isOperator: boolean = groups ? groups.includes(UserGroup.Operators) : false;
  console.log('CurrentUserContextProvider user:', currentUser);
  const value = useMemo(
    () => ({ currentUser, error, mutateUser, groups, isOperator }),
    [currentUser, error, mutateUser, groups, isOperator]
  );
  return <CurrentUserContext.Provider value={value} {...props} />;
  // return <CurrentUserContext.Provider value={{ currentUser, error, mutateUser, groups, isOperator }} {...props} />;
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
        const currentUser = await Auth.currentAuthenticatedUser();
        console.log('useVerifyAuthenticated user:', currentUser);
        // Global stateの更新。useSWRの第2引数にfalseを指定すると再検証(再fetch)をしない
        mutateUser(currentUser, false);
      } catch (error) {
        console.error('useVerifyAuthenticated error:', error);
        // URL直叩き対応。未認証の場合 The user is not authenticated が発生する
        router.replace(Path.Index);
      }
    })();
  }, []);
};

export const useVerifyBeforeAuthenticate = () => {
  const router = useRouter();
  useEffect(() => {
    // 高速に遷移するため事前に遷移先画面をprefetchする
    router.prefetch(Path.Staff);
    // TODO: 遷移先未定
    router.prefetch(Path.SubscriptionOrder);
    afterAuthTransition(router);
    // 画面ステータスをみてログイン後画面に遷移
    return onAuthUIStateChange((nextAuthState, authData) => {
      console.log('before auth nextAuthState:', nextAuthState);
      if (nextAuthState === AuthState.SignedIn && authData) {
        afterAuthTransition(router);
      }
    });
  }, []);
};

const afterAuthTransition = (router: NextRouter) => {
  (async () => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      console.log('afterAuthTransition currentUser:', currentUser);
      // currentUserがUserGroupに所属していない場合undefinedが返却される
      const groups: string[] | undefined = currentUser.signInUserSession.accessToken.payload['cognito:groups'];
      const isOperator: boolean = groups ? groups.includes(UserGroup.Operators) : false;
      // UserGroupにより遷移先の振り分け
      isOperator ? router.replace(Path.SubscriptionOrder) : router.replace(Path.Staff);
    } catch (error) {
      console.log('afterAuthTransition error:', error);
      router.replace(Path.Index);
    }
  })();
};

export const useSignOut = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isSignedOut, setIsSignedOut] = useState(false);
  const { cache } = useSWRConfig();
  const router = useRouter();
  // useEffect(() => {
  //   // 高速に遷移するため事前に遷移先画面をprefetchする
  //   router.prefetch(Path.Index);
  //   // 画面ステータスをみてログイン画面に遷移
  //   return onAuthUIStateChange((nextAuthState, authData) => {
  //     console.log('sign out nextAuthState:', nextAuthState);
  //     if (nextAuthState === AuthState.SignedOut) {
  //       router.replace(Path.Index);
  //     }
  //   });
  // }, []);

  useEffect(() => {
    // componentがunmountされてからログイン画面へ遷移させる
    return () => {
      router.replace(Path.Index);
    };
  }, [isSignedOut]);

  const signOut = useCallback(() => {
    setIsLoading(true);
    (async () => {
      try {
        // globalにsign out実行。他にログインしている端末があれば全てsign out
        await Auth.signOut({ global: true });
        console.log('signOut here2');
        // Store(useSWR)のCacheをクリア
        cache.delete(SWRKey.CurrentUser);
        cache.delete(SWRKey.StaffList);
        setIsLoading(false);
        setError(null);
        // ログイン画面へ遷移
        setIsSignedOut(true);
      } catch (error) {
        console.log('error signing out: ', error);
        setIsLoading(false);
        setError(parseResponseError(error));
      }
    })();
  }, []);
  const resetState = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);
  return { signOut, isLoading, error, resetState };
};
