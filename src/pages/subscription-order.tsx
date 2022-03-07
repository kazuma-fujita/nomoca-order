import { SubscriptionOrderTemplate } from 'components/templates/subscription-orders/subscription-order-template';
import { ScreenName } from 'constants/screen-name';
import { TitleSuffix } from 'constants/title-suffix';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useVerifyAuthenticated } from 'stores/use-current-user';
import { StaffListContextProvider } from 'stores/use-staff-list';
import { ProductListContextProvider } from 'stores/use-product-list';
import { SubscriptionOrderTemplateContainer } from 'components/templates/subscription-orders/subscription-order-template-container';
import { Main } from 'components/molecules/main';
import { NowDateContextProvider } from 'stores/use-now-date';
import { OrderType } from 'API';
import { OrderFormParamContextProvider } from 'stores/use-order-form-param';

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
              <Main>
                <SubscriptionOrderTemplateContainer />
              </Main>
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
