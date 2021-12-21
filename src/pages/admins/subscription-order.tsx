import { Main } from 'components/molecules/main';
import { SubscriptionOrderTemplateContainer } from 'components/templates/admins/subscription-orders/subscription-order-template-container';
import { ScreenName } from 'constants/screen-name';
import { TitleSuffix } from 'constants/title-suffix';
import Head from 'next/head';
import { useVerifyAuthenticated } from 'stores/use-current-user';

const AdminSubscriptionOrderPage = () => {
  useVerifyAuthenticated();

  return (
    <>
      <Head>
        <title>{ScreenName.AdminSubscriptionOrder + TitleSuffix}</title>
      </Head>
      <Main>
        <SubscriptionOrderTemplateContainer now={new Date()} />
      </Main>
    </>
  );
};

export default AdminSubscriptionOrderPage;
