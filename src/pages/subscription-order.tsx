import { OrderType } from 'API';
import { Main } from 'components/molecules/main';
import { OrderTemplate } from 'components/templates/orders/order-template/order-template';
import { ScreenName } from 'constants/screen-name';
import { TitleSuffix } from 'constants/title-suffix';
import { ClinicContextProvider } from 'hooks/clinics/use-fetch-clinic';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useVerifyAuthenticated } from 'stores/use-current-user';
import { NowDateContextProvider } from 'stores/use-now-date';
import { OrderFormParamContextProvider } from 'stores/use-order-form-param';
import { ProductListContextProvider } from 'stores/use-product-list';
import { StaffListContextProvider } from 'stores/use-staff-list';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const SubscriptionOrderPage = (props: Props) => {
  useVerifyAuthenticated();

  return (
    <>
      <Head>
        <title>{ScreenName.SubscriptionOrder + TitleSuffix}</title>
      </Head>
      {/* isRevalidateOnFocusはWindowにフォーカスが外れて再度当たった時のrevalidation実行可否フラグ。入力フォームのプルダウンデータはfalse */}
      <ProductListContextProvider
        orderType={OrderType.subscriptionOrder}
        isFilterByActiveProduct={true}
        isRevalidateOnFocus={false}
      >
        <StaffListContextProvider isFilterByActiveStaff={true} isRevalidateOnFocus={false}>
          <OrderFormParamContextProvider orderType={OrderType.subscriptionOrder}>
            <NowDateContextProvider now={new Date()}>
              <ClinicContextProvider>
                <Main>
                  <OrderTemplate />
                </Main>
              </ClinicContextProvider>
            </NowDateContextProvider>
          </OrderFormParamContextProvider>
        </StaffListContextProvider>
      </ProductListContextProvider>
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
