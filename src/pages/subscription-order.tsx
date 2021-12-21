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

// type Props = InferGetStaticPropsType<typeof getStaticProps>;

// const SubscriptionOrderPage = (props: Props) => {
const SubscriptionOrderPage = () => {
  useVerifyAuthenticated();

  return (
    <>
      <Head>
        <title>{ScreenName.SubscriptionOrder + TitleSuffix}</title>
      </Head>
      <ProductListContextProvider filterWithActiveProduct={true}>
        <StaffListContextProvider filterWithActiveStaff={true}>
          <Main>
            <SubscriptionOrderTemplateContainer now={new Date()} />
          </Main>
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
