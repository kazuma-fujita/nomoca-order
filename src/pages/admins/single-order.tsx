import { OrderType } from 'API';
import { Main } from 'components/molecules/main';
import { SingleOrderListContainer } from 'components/organisms/admins/single-orders/single-order-list/single-order-list-container';
import { ScreenName } from 'constants/screen-name';
import { TitleSuffix } from 'constants/title-suffix';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useVerifyAuthenticated } from 'stores/use-current-user';
import { NowDateContextProvider } from 'stores/use-now-date';
import { OrderFormParamContextProvider } from 'stores/use-order-form-param';
import { ProductListContextProvider } from 'stores/use-product-list';
import { StaffListContextProvider } from 'stores/use-staff-list';

const SingleOrderPage = ({ pageTitle }: InferGetStaticPropsType<typeof getStaticProps>) => {
  useVerifyAuthenticated();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <ProductListContextProvider orderType={OrderType.singleOrder} isFilterByActiveProduct={true}>
        <StaffListContextProvider isFilterByActiveStaff={true}>
          <NowDateContextProvider now={new Date()}>
            <OrderFormParamContextProvider orderType={OrderType.singleOrder}>
              <Main>
                <SingleOrderListContainer />
              </Main>
            </OrderFormParamContextProvider>
          </NowDateContextProvider>
        </StaffListContextProvider>
      </ProductListContextProvider>
    </>
  );
};

export default SingleOrderPage;

export const getStaticProps = async (context: GetStaticPropsContext) => {
  return {
    props: {
      pageTitle: ScreenName.SingleOrder + TitleSuffix,
    },
  };
};
