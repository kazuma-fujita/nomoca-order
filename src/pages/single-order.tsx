import { OrderType } from 'API';
import { Main } from 'components/molecules/main';
import { OrderTemplate } from 'components/templates/orders/order-template/order-template';
import { ScreenName } from 'constants/screen-name';
import { TitleSuffix } from 'constants/title-suffix';
import { ClinicContextProvider } from 'hooks/clinics/use-fetch-clinic';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useVerifyAuthenticated } from 'stores/use-current-user';
import { OrderFormParamContextProvider } from 'stores/use-order-form-param';
import { ProductListContextProvider } from 'hooks/products/use-fetch-product-list';
import { StaffListContextProvider } from 'hooks/staffs/use-fetch-staff-list';
import { OrderListContextProvider } from 'hooks/orders/use-fetch-single-order-list';
import { SearchParamContextProvider } from 'hooks/admins/use-search-param';

const SingleOrderPage = ({ pageTitle }: InferGetStaticPropsType<typeof getStaticProps>) => {
  useVerifyAuthenticated();
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      {/* admin側の処理と統一する為、使用しないがsearchParamContextを定義 */}
      <SearchParamContextProvider>
        <OrderListContextProvider>
          {/* isRevalidateOnFocusはWindowにフォーカスが外れて再度当たった時のrevalidation実行可否フラグ。入力フォームのプルダウンデータはfalse */}
          <ProductListContextProvider
            orderType={OrderType.singleOrder}
            isFilterByActiveProduct={true}
            isRevalidateOnFocus={false}
          >
            <StaffListContextProvider isRevalidateOnFocus={false}>
              <OrderFormParamContextProvider orderType={OrderType.singleOrder}>
                <ClinicContextProvider>
                  <Main>
                    <OrderTemplate />
                  </Main>
                </ClinicContextProvider>
              </OrderFormParamContextProvider>
            </StaffListContextProvider>
          </ProductListContextProvider>
        </OrderListContextProvider>
      </SearchParamContextProvider>
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
