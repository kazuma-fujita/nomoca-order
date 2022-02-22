import { Main } from 'components/molecules/main';
import { SingleOrderTemplate } from 'components/templates/admins/single-orders/single-order-template';
import { ScreenName } from 'constants/screen-name';
import { TitleSuffix } from 'constants/title-suffix';
import { useFetchOrderList } from 'hooks/orders/use-fetch-order-list';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useVerifyAuthenticated } from 'stores/use-current-user';

const SingleOrderPage = ({ pageTitle }: InferGetStaticPropsType<typeof getStaticProps>) => {
  useVerifyAuthenticated();
  const fetchReturn = useFetchOrderList();

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Main>
        <SingleOrderTemplate {...fetchReturn} />
      </Main>
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
