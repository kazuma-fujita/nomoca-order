import { OrderType } from 'API';
import { Main } from 'components/molecules/main';
import { CompleteSingleOrder } from 'components/organisms/single-orders/complete-single-order/complete-single-order';
import { ConfirmSingleOrderContainer } from 'components/organisms/single-orders/confirm-single-order/confirm-single-order-container';
import { InputSingleOrderContainer } from 'components/organisms/single-orders/input-single-order/input-single-order-container';
import { SingleOrderTemplateContainer } from 'components/templates/single-orders/single-order-template-container';
import { ScreenName } from 'constants/screen-name';
import { TitleSuffix } from 'constants/title-suffix';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Error from 'next/error';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useVerifyAuthenticated } from 'stores/use-current-user';
import { NowDateContextProvider } from 'stores/use-now-date';
import { OrderFormParamContextProvider } from 'stores/use-order-form-param';
import { ProductListContextProvider } from 'stores/use-product-list';
import { StaffListContextProvider } from 'stores/use-staff-list';
import { FormScreenType } from 'constants/form-screen-query';

type Props = {
  currentScreen: string | string[] | undefined;
};

const Component = ({ currentScreen }: Props) => {
  switch (currentScreen) {
    case undefined:
      return <SingleOrderTemplateContainer />;
    case FormScreenType.input:
      return <InputSingleOrderContainer />;
    case FormScreenType.confirm:
      return <ConfirmSingleOrderContainer />;
    case FormScreenType.complete:
      return <CompleteSingleOrder />;
    default:
      return <Error statusCode={404} />;
  }
};

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
                <Component currentScreen={router.query.screen} />
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
