import Button from '@mui/material/Button';
import { Main } from 'components/molecules/main';
import { ScreenName } from 'constants/screen-name';
import { TitleSuffix } from 'constants/title-suffix';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Error from 'next/error';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useVerifyAuthenticated } from 'stores/use-current-user';
import { NowDateContextProvider } from 'stores/use-now-date';
import Link from 'components/atoms/link';
import { ProductListContextProvider } from 'stores/use-product-list';
import { StaffListContextProvider } from 'stores/use-staff-list';
import { OrderType } from 'API';
import { OrderFormParamContextProvider } from 'stores/use-order-form-param';
import { InputSingleOrderContainer } from 'components/organisms/single-orders/input-single-order/input-single-order-container';
import { SingleOrderListContainer } from 'components/organisms/single-orders/single-order-list/single-order-list-container';
import { SingleOrderTemplateContainer } from 'components/templates/single-orders/single-order-template-container';
import { ConfirmSingleOrder } from 'components/organisms/single-orders/confirm-single-order/confirm-single-order';
import { CompleteSingleOrder } from 'components/organisms/single-orders/complete-single-order/complete-single-order';
import { FormScreenType } from '../constants/form-screen-query';

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
      return <ConfirmSingleOrder />;
    case FormScreenType.complete:
      return <CompleteSingleOrder />;
    default:
      return <Error statusCode={404} />;
  }
};

const SingleOrderPage = ({ pageTitle }: InferGetStaticPropsType<typeof getStaticProps>) => {
  useVerifyAuthenticated();
  const router = useRouter();

  useEffect(() => {
    console.log('screen', router.query.screen);
  }, [router.query.screen]);

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
