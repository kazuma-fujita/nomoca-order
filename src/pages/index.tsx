import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useEffect } from 'react';
import Amplify, { Auth } from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignIn, AmplifySignUp, AmplifyVerifyContact } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsconfig from 'aws-exports';
import { Path } from 'constants/path';
import Link from 'components/atoms/link';
import { Typography, Box } from '@mui/material';
import { useVerifyBeforeAuthenticate } from 'stores/use-current-user';

Amplify.configure(awsconfig);

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const AuthPage = (props: Props) => {
  useVerifyBeforeAuthenticate();
  // const router = useRouter();
  // useEffect(() => {
  //   // 高速に遷移するため事前に遷移先画面をprefetchする
  //   router.prefetch(Path.Staff);
  //   (async () => {
  //     try {
  //       // 認証済みの場合dashboardへ遷移
  //       await Auth.currentAuthenticatedUser();
  //       router.replace(Path.Staff);
  //     } catch (error) {}
  //   })();
  //   return onAuthUIStateChange((nextAuthState, authData) => {
  //     console.log('nextAuthState:', nextAuthState);
  //     if (nextAuthState === AuthState.SignedIn && authData) {
  //       router.replace(Path.Staff);
  //     }
  //   });
  // }, []);

  return (
    <>
      <Head>
        <title>{props.pageTitle}</title>
      </Head>
      <Typography variant='h2'>{props.pageTitle}</Typography>
      <Box mb={2} />
      <AmplifyAuthenticator usernameAlias='email'>
        <AmplifyVerifyContact />
        <AmplifySignIn slot='sign-in' hideSignUp={true} />
        <AmplifySignUp slot='sign-up' formFields={[{ type: 'username' }, { type: 'password' }]} />
      </AmplifyAuthenticator>
      <Typography variant='body2'>
        ログインしますと <Link href='/'>利用規約</Link> に同意したことになります
      </Typography>
    </>
  );
};

export default AuthPage;

export const getStaticProps = async (context: GetStaticPropsContext) => {
  return {
    props: {
      pageTitle: 'Nomoca Order',
    },
  };
};
