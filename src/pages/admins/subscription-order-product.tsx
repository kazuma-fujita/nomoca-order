import { SubscriptionOrderProductTemplate } from 'components/templates/admins/products/subscription-order-product-template';
import { ScreenName } from 'constants/screen-name';
import { TitleSuffix } from 'constants/title-suffix';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useVerifyAuthenticated } from 'stores/use-current-user';
import { Main } from 'components/molecules/main';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const SubscriptionOrderProductPage = (props: Props) => {
  useVerifyAuthenticated();

  return (
    <>
      <Head>
        <title>{props.pageTitle}</title>
      </Head>
      <Main>
        <SubscriptionOrderProductTemplate />
      </Main>
    </>
  );
};

export default SubscriptionOrderProductPage;

export const getStaticProps = async (context: GetStaticPropsContext) => {
  return {
    props: {
      pageTitle: ScreenName.SubscriptionOrderProduct + TitleSuffix,
    },
  };
};
