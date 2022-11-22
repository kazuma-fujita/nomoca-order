import { OrderType } from 'API';
import { Main } from 'components/molecules/main';
import { SubscriptionOrderHistoryTemplate } from 'components/templates/admins/subscription-order-histories/subscription-order-history-template';
import { ScreenName } from 'constants/screen-name';
import { TitleSuffix } from 'constants/title-suffix';
import { SearchParamContextProvider } from 'hooks/admins/use-search-param';
import { SubscriptionOrderHistoryListContextProvider } from 'hooks/subscription-order-histories/use-fetch-subscription-order-history-list';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useVerifyAuthenticated } from 'stores/use-current-user';
import { NowDateContextProvider } from 'stores/use-now-date';
import { OrderFormParamContextProvider } from 'stores/use-order-form-param';

const SubscriptionOrderHistoryPage = ({ pageTitle }: InferGetStaticPropsType<typeof getStaticProps>) => {
  useVerifyAuthenticated();
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <NowDateContextProvider>
        <SearchParamContextProvider>
          <SubscriptionOrderHistoryListContextProvider>
            <OrderFormParamContextProvider orderType={OrderType.subscriptionOrderHistory}>
              <Main>
                <SubscriptionOrderHistoryTemplate />
              </Main>
            </OrderFormParamContextProvider>
          </SubscriptionOrderHistoryListContextProvider>
        </SearchParamContextProvider>
      </NowDateContextProvider>
    </>
  );
};

export default SubscriptionOrderHistoryPage;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getStaticProps = async (context: GetStaticPropsContext) => {
  return {
    props: {
      pageTitle: ScreenName.subscriptionOrderHistory + TitleSuffix,
    },
  };
};
