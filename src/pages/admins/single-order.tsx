import { Main } from 'components/molecules/main';
import { SingleOrderTemplate } from 'components/templates/admins/single-orders/single-order-template';
import { ScreenName } from 'constants/screen-name';
import { TitleSuffix } from 'constants/title-suffix';
import { OrderListContextProvider } from 'hooks/orders/use-fetch-order-list';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useVerifyAuthenticated } from 'stores/use-current-user';
import { NowDateContextProvider } from 'stores/use-now-date';

const SingleOrderPage = ({ pageTitle }: InferGetStaticPropsType<typeof getStaticProps>) => {
  useVerifyAuthenticated();

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Main>
        <OrderListContextProvider>
          <NowDateContextProvider now={new Date()}>
            <SingleOrderTemplate />
          </NowDateContextProvider>
        </OrderListContextProvider>
      </Main>
    </>
  );
};

export default SingleOrderPage;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getStaticProps = async (context: GetStaticPropsContext) => {
  return {
    props: {
      pageTitle: ScreenName.singleOrder + TitleSuffix,
    },
  };
};
