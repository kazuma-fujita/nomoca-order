import { Main } from 'components/molecules/main';
import { SingleOrderProductTemplate } from 'components/templates/admins/products/single-order-product-template';
import { ScreenName } from 'constants/screen-name';
import { TitleSuffix } from 'constants/title-suffix';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useVerifyAuthenticated } from 'stores/use-current-user';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const SingleOrderProductPage = (props: Props) => {
  useVerifyAuthenticated();

  return (
    <>
      <Head>
        <title>{props.pageTitle}</title>
      </Head>
      <Main>
        <SingleOrderProductTemplate />
      </Main>
    </>
  );
};

export default SingleOrderProductPage;

export const getStaticProps = async (context: GetStaticPropsContext) => {
  return {
    props: {
      pageTitle: ScreenName.SingleOrderProduct + TitleSuffix,
    },
  };
};
