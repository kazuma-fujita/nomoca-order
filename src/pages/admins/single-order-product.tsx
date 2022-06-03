import { OrderType } from 'API';
import { Main } from 'components/molecules/main';
import { ProductTemplate } from 'components/templates/admins/products/product-template';
import { ScreenName } from 'constants/screen-name';
import { TitleSuffix } from 'constants/title-suffix';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useVerifyAuthenticated } from 'stores/use-current-user';
import { ProductListContextProvider } from 'hooks/products/use-fetch-product-list';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const SingleOrderProductPage = (props: Props) => {
  useVerifyAuthenticated();

  return (
    <>
      <Head>
        <title>{props.pageTitle}</title>
      </Head>
      <Main>
        <ProductListContextProvider orderType={OrderType.singleOrder} isFilterByActiveProduct={false}>
          <ProductTemplate />
        </ProductListContextProvider>
      </Main>
    </>
  );
};

export default SingleOrderProductPage;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getStaticProps = async (context: GetStaticPropsContext) => {
  return {
    props: {
      pageTitle: ScreenName.singleOrderProduct + TitleSuffix,
    },
  };
};
