import { Main } from 'components/molecules/main';
import { SubscriptionOrderTemplateContainer } from 'components/templates/admins/subscription-orders/subscription-order-template-container';
import { ScreenName } from 'constants/screen-name';
import { TitleSuffix } from 'constants/title-suffix';
import Head from 'next/head';
import { useVerifyAuthenticated } from 'stores/use-current-user';
import { NowDateContextProvider } from 'stores/use-now-date';

const AdminSubscriptionOrderPage = () => {
  useVerifyAuthenticated();

  return (
    <>
      <Head>
        <title>{ScreenName.AdminSubscriptionOrder + TitleSuffix}</title>
      </Head>
      <NowDateContextProvider now={new Date()}>
        <Main>
          <SubscriptionOrderTemplateContainer />
        </Main>
      </NowDateContextProvider>
    </>
  );
};

export default AdminSubscriptionOrderPage;
