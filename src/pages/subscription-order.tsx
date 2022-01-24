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
import { ProductType } from 'API';

// type Props = InferGetStaticPropsType<typeof getStaticProps>;

// const SubscriptionOrderPage = (props: Props) => {
const SubscriptionOrderPage = () => {
  useVerifyAuthenticated();

  return (
    <>
      <Head>
        <title>{ScreenName.SubscriptionOrder + TitleSuffix}</title>
      </Head>
      <ProductListContextProvider productType={ProductType.subscriptionOrder} filterWithActiveProduct={true}>
        <StaffListContextProvider filterWithActiveStaff={true}>
          <NowDateContextProvider now={new Date()}>
            <Main>
              <SubscriptionOrderTemplateContainer />
            </Main>
          </NowDateContextProvider>
        </StaffListContextProvider>
      </ProductListContextProvider>
    </>
  );
};

export default SubscriptionOrderPage;

// export const getStaticProps = async (context: GetStaticPropsContext) => {
//   return {
//     props: {
//       pageTitle: ScreenName.SubscriptionOrder + TitleSuffix,
//     },
//   };
// };
