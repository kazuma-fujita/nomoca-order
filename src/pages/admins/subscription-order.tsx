import { Main } from 'components/molecules/main';
import { SubscriptionOrderTemplate } from 'components/templates/admins/subscription-orders/subscription-order-template';
import { ScreenName } from 'constants/screen-name';
import { TitleSuffix } from 'constants/title-suffix';
import { AdminSubscriptionOrderListContextProvider } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useVerifyAuthenticated } from 'stores/use-current-user';
import { NowDateContextProvider } from 'stores/use-now-date';

const SubscriptionOrderPage = ({ pageTitle }: InferGetStaticPropsType<typeof getStaticProps>) => {
  useVerifyAuthenticated();

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <AdminSubscriptionOrderListContextProvider>
        <NowDateContextProvider now={new Date()}>
          <Main>
            <SubscriptionOrderTemplate />
          </Main>
        </NowDateContextProvider>
      </AdminSubscriptionOrderListContextProvider>
    </>
  );
};

export default SubscriptionOrderPage;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getStaticProps = async (context: GetStaticPropsContext) => {
  return {
    props: {
      pageTitle: ScreenName.SubscriptionOrder + TitleSuffix,
    },
  };
};
