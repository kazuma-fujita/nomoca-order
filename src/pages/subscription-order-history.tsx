import { Main } from 'components/molecules/main';
import { SubscriptionOrderHistoryTemplate } from 'components/templates/subscription-order-histories/subscription-order-history-template';
import { ScreenName } from 'constants/screen-name';
import { TitleSuffix } from 'constants/title-suffix';
import { SearchParamContextProvider } from 'hooks/admins/use-search-param';
import { SubscriptionOrderHistoryListContextProvider } from 'hooks/subscription-order-histories/use-fetch-subscription-order-history-list';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useVerifyAuthenticated } from 'stores/use-current-user';

const SubscriptionOrderHistoryPage = ({ pageTitle }: InferGetStaticPropsType<typeof getStaticProps>) => {
  useVerifyAuthenticated();
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      {/* admin側の処理と統一する為、使用しないがsearchParamContextを定義 */}
      <SearchParamContextProvider>
        <SubscriptionOrderHistoryListContextProvider>
          <Main>
            <SubscriptionOrderHistoryTemplate />
          </Main>
        </SubscriptionOrderHistoryListContextProvider>
      </SearchParamContextProvider>
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
