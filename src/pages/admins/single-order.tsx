import { OrderType } from 'API';
import { Main } from 'components/molecules/main';
import { SingleOrderTemplate } from 'components/templates/admins/single-orders/single-order-template';
import { ScreenName } from 'constants/screen-name';
import { TitleSuffix } from 'constants/title-suffix';
import { SearchParamContextProvider } from 'hooks/admins/use-search-param';
import { OrderListContextProvider } from 'hooks/orders/use-fetch-single-order-list';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useVerifyAuthenticated } from 'stores/use-current-user';
import { NowDateContextProvider } from 'stores/use-now-date';
import { OrderFormParamContextProvider } from 'stores/use-order-form-param';

const SingleOrderPage = ({ pageTitle }: InferGetStaticPropsType<typeof getStaticProps>) => {
  useVerifyAuthenticated();

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <NowDateContextProvider>
        <SearchParamContextProvider>
          <OrderListContextProvider>
            <OrderFormParamContextProvider orderType={OrderType.singleOrder}>
              <Main>
                <SingleOrderTemplate />
              </Main>
            </OrderFormParamContextProvider>
          </OrderListContextProvider>
        </SearchParamContextProvider>
      </NowDateContextProvider>
    </>
  );
};

export default SingleOrderPage;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getStaticProps = async (context: GetStaticPropsContext) => {
  return {
    props: {
      pageTitle: ScreenName.singleOrder + TitleSuffix,
    },
  };
};
