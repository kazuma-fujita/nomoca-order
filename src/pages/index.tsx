import { AuthTemplate } from 'components/templates/auth-template';
import { ProductName } from 'constants/product-name';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useVerifyBeforeAuthenticate } from 'stores/use-current-user';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const AuthPage = (props: Props) => {
  useVerifyBeforeAuthenticate();
  return (
    <>
      <Head>
        <title>{props.pageTitle}</title>
      </Head>
      <AuthTemplate pageTitle={props.pageTitle} />
    </>
  );
};

export default AuthPage;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getStaticProps = async (context: GetStaticPropsContext) => {
  return {
    props: {
      pageTitle: ProductName,
    },
  };
};
