import { AuthState, CognitoUserInterface, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from 'aws-exports';
import { GlobalNavigation } from 'components/molecules/global-navigation';
import { Path } from 'constants/path';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from 'styles/Home.module.css';

Amplify.configure(awsconfig);

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const DashboardPage = (props: Props) => {
  const router = useRouter();
  const [user, setUser] = useState<CognitoUserInterface | undefined>();
  useEffect(() => {
    router.prefetch(Path.Index);
    (async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setUser(user);
        const groups = user.signInUserSession.accessToken.payload['cognito:groups'];
        console.log('user:', user);
        console.log('groups:', groups);
      } catch (error) {
        // 未認証の場合The user is not authenticatedが発生する
        router.replace(Path.Index);
      }
    })();
    return onAuthUIStateChange((nextAuthState, authData) => {
      if (nextAuthState === AuthState.SignedOut) {
        router.replace(Path.Index);
      }
    });
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>{props.pageTitle}</title>
      </Head>
      <main className={styles.main}>
        <GlobalNavigation />
        <h1 className={styles.title}>{props.pageTitle}</h1>
        <div className={styles.description}>
          <div>Hello, {user && user.username}</div>
          <div>It&#39;s {props.nowDate}.</div>
        </div>
        <AmplifySignOut />
      </main>
    </div>
  );
};

export default DashboardPage;

export const getStaticProps = async (context: GetStaticPropsContext) => {
  return {
    props: {
      nowDate: new Date().toLocaleString(),
      pageTitle: 'Dashboard',
    },
  };
};
