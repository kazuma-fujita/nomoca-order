import { SubscriptionOrderTemplate } from 'components/templates/subscription-order-template';
import { ScreenName } from 'constants/screen-name';
import { TitleSuffix } from 'constants/title-suffix';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useVerifyAuthenticated } from 'stores/use-current-user';
import { StaffListContextProvider } from 'stores/use-staff-list';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const SubscriptionOrderPage = (props: Props) => {
  useVerifyAuthenticated();

  return (
    <>
      <Head>
        <title>{props.pageTitle}</title>
      </Head>
      <StaffListContextProvider>
        <SubscriptionOrderTemplate />
      </StaffListContextProvider>
    </>
  );
};

export default SubscriptionOrderPage;

export const getStaticProps = async (context: GetStaticPropsContext) => {
  return {
    props: {
      pageTitle: ScreenName.SubscriptionOrder + TitleSuffix,
    },
  };
};
