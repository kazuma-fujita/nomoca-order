import { ProductName } from 'constants/product-name';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useVerifyBeforeAuthenticate } from 'stores/use-current-user';
import AuthTemplate from 'components/templates/auth-template';

// Amplify.configure(awsconfig);

// type Props = InferGetStaticPropsType<typeof getStaticProps>;

// const AuthPage = (props: Props) => {
const AuthPage = () => {
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
  //     if (nextAuthState === AuthState.SignedIn && authData) {
  //       router.replace(Path.Staff);
  //     }
  //   });
  // }, []);

  return (
    <>
      <Head>
        <title>{ProductName}</title>
      </Head>
      <AuthTemplate pageTitle={ProductName} />
    </>
  );
};

export default AuthPage;

// export const getStaticProps = async (context: GetStaticPropsContext) => {
//   return {
//     props: {
//       pageTitle: 'Nomoca Order',
//     },
//   };
// };
