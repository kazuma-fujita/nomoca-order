import { SubscriptionOrderProductTemplate } from 'components/templates/admins/products/subscription-order-product-template';
import { ScreenName } from 'constants/screen-name';
import { TitleSuffix } from 'constants/title-suffix';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useVerifyAuthenticated } from 'stores/use-current-user';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const SubscriptionOrderProductPage = (props: Props) => {
  useVerifyAuthenticated();

  return (
    <>
      <Head>
        <title>{props.pageTitle}</title>
      </Head>
      <SubscriptionOrderProductTemplate />
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
