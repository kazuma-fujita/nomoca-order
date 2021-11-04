import { ProductTemplate } from 'components/templates/product-template';
import { ScreenName } from 'constants/screen-name';
import { TitleSuffix } from 'constants/title-suffix';
import {
  GetServerSidePropsContext,
  GetStaticPropsContext,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from 'next';
import Head from 'next/head';
import { resetServerContext } from 'react-beautiful-dnd';
import { useVerifyAuthenticated } from 'stores/use-current-user';
import { ProductListContextProvider } from 'stores/use-product-list';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const ProductPage = (props: Props) => {
  useVerifyAuthenticated();

  return (
    <>
      <Head>
        <title>{props.pageTitle}</title>
      </Head>
      <ProductListContextProvider filterWithActiveProduct={false}>
        <ProductTemplate />
      </ProductListContextProvider>
    </>
  );
};

export default ProductPage;

export const getStaticProps = async (context: GetStaticPropsContext) => {
  return {
    props: {
      pageTitle: ScreenName.Product + TitleSuffix,
    },
  };
};
