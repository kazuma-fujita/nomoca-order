import { OrderType } from 'API';
import { Main } from 'components/molecules/main';
import { ProductTemplateContainer } from 'components/templates/admins/products/product-template-container';
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
      <Main>
        <ProductListContextProvider orderType={OrderType.subscriptionOrder} isFilterByActiveProduct={false}>
          <ProductTemplateContainer />
        </ProductListContextProvider>
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
