import { ProductTemplate } from 'components/templates/product-template';
import { ScreenName } from 'constants/screen-name';
import { TitleSuffix } from 'constants/title-suffix';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useVerifyAuthenticated } from 'stores/use-current-user';
import { ProductListContextProvider } from 'stores/use-product-list';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const SubscriptionOrderProductPage = (props: Props) => {
  useVerifyAuthenticated();

  return (
    <>
      <Head>
        <title>{props.pageTitle}</title>
      </Head>
      <ProductListContextProvider filterWithActiveProduct={false}>
        <ProductTemplate />
      </ProductListContextProvider>
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
