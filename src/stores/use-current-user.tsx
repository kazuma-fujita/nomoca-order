import { AuthState, CognitoUserInterface, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { Auth } from 'aws-amplify';
import { Path } from 'constants/path';
import { SWRKey } from 'constants/swr-key';
import { UserGroup } from 'constants/user-group';
import { useFetchOrderList } from 'hooks/orders/use-fetch-order-list';
import { useFetchProductList } from 'hooks/products/use-fetch-product-list';
import { NextRouter, useRouter } from 'next/router';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import useSWR, { KeyedMutator, useSWRConfig } from 'swr';
import { parseResponseError } from 'utilities/parse-response-error';

type ProviderProps = {
  currentUser: CognitoUserInterface | undefined;
  error: Error | undefined;
  mutateUser: KeyedMutator<CognitoUserInterface>;
  groups: string[] | undefined;
  email: string | null;
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
  } = useSWR<CognitoUserInterface, Error>(SWRKey.currentUser, null);
  // cognito:groupsはUserGroup名配列が格納される
  // currentUserは存在していてpayloadからUserGroupが取得出来ない(どのUserGroupにも所属していない)場合undefinedが返却される
  const groups: string[] | undefined = currentUser
    ? currentUser.signInUserSession.accessToken.payload['cognito:groups']
    : undefined;
  const email: string = currentUser ? currentUser.attributes.email : null;
  const isOperator: boolean = groups ? groups.includes(UserGroup.Operators) : false;
  const value = useMemo(
    () => ({ currentUser, error, mutateUser, groups, email, isOperator }),
    [currentUser, error, mutateUser, groups, email, isOperator],
  );
  return <CurrentUserContext.Provider value={value} {...props} />;
};

// ログイン後画面の認証判定
export const useVerifyAuthenticated = () => {
  const router = useRouter();
  const { mutateUser } = useCurrentUser();
  useEffect(() => {
    (async () => {
      try {
        // Cognitoから認証情報取得
        const currentUser = await Auth.currentAuthenticatedUser();
        // 認証済みの場合Global stateの更新。useSWRの第2引数にfalseを指定すると再検証(再fetch)をしない
        mutateUser(currentUser, false);
      } catch (error) {
        console.error('useVerifyAuthenticated error:', error);
        // 高速に遷移するため事前に遷移先画面をprefetchする
        router.prefetch(Path.index);
        // URL直叩き対応。未認証の場合 The user is not authenticated が発生する
        router.replace(Path.index);
      }
    })();
  }, [mutateUser, router]);
};

// ログイン前画面の認証判定
export const useVerifyBeforeAuthenticate = () => {
  const router = useRouter();
  useEffect(() => {
    // 画面ステータスをみてログイン後画面に遷移
    return onAuthUIStateChange((nextAuthState, authData) => {
      // ログイン直後判定
      if (nextAuthState === AuthState.SignedIn && authData) {
        afterAuthTransition(router);
      }
    });
  }, [router]);
};

const afterAuthTransition = (router: NextRouter) => {
  (async () => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      // currentUserがUserGroupに所属していない場合undefinedが返却される
      const groups: string[] | undefined = currentUser.signInUserSession.accessToken.payload['cognito:groups'];
      const isOperator: boolean = groups ? groups.includes(UserGroup.Operators) : false;
      // UserGroupにより遷移先の振り分け
      // 高速に遷移するため事前に遷移先画面をprefetchする
      if (isOperator) {
        router.prefetch(Path.adminsSingleOrder);
        router.replace(Path.adminsSingleOrder);
      } else {
        router.prefetch(Path.singleOrder);
        router.replace(Path.singleOrder);
      }
    } catch (error) {
      // currentAuthenticatedUser実行時に未認証の場合 The user is not authenticated が発生。ログイン画面へ遷移
      router.replace(Path.index);
    }
  })();
};

export const useSignOut = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isSignedOut, setIsSignedOut] = useState(false);
  const router = useRouter();
  // useSWR cacheクリアの為個別に設定しているswrKeyを取得
  const { cache } = useSWRConfig();
  const { swrKey: orderListKey } = useFetchOrderList();
  const { swrKey: productListKey } = useFetchProductList();

  useEffect(() => {
    // componentがunmountされてからログイン画面へ遷移させる
    return () => {
      if (isSignedOut) {
        router.replace(Path.index);
      }
    };
  }, [isSignedOut, router]);

  // 利用側でasync/awaitできるようにPromise<void>を返却
  const signOut = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      // globalにsign out実行。他にログインしている端末があれば全てsign out
      await Auth.signOut({ global: true });
      // useSWRのcacheクリア
      for (const key of Object.values(SWRKey)) {
        cache.delete(key);
      }
      // 個別に設定しているuseSWRのcacheクリア
      cache.delete(orderListKey);
      cache.delete(productListKey);
      setIsLoading(false);
      setError(null);
      // ログイン画面へ遷移
      setIsSignedOut(true);
    } catch (error) {
      setIsLoading(false);
      setError(parseResponseError(error));
    }
  }, [cache, orderListKey, productListKey]);

  const resetState = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);
  return { signOut, isLoading, error, resetState };
};
