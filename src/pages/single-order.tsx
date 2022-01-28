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

const List = () => {
  return (
    <>
      <h1>List</h1>
      <Button component={Link} href='/single-order?screen=input' shallow>
        追加する
      </Button>
    </>
  );
};

const Input = () => {
  return (
    <>
      <h1>Input</h1>
      <Button component={Link} href='/single-order' shallow>
        戻る
      </Button>
      <Button component={Link} href='/single-order?screen=confirm' shallow>
        確認する
      </Button>
    </>
  );
};

const Confirm = () => {
  return (
    <>
      <h1>Confirm</h1>
      <Button component={Link} href='/single-order?screen=input' shallow>
        修正する
      </Button>
      <Button component={Link} href='/single-order?screen=complete' shallow>
        追加する
      </Button>
    </>
  );
};

const Complete = () => {
  return (
    <>
      <h1>Complete</h1>
      <Button component={Link} href='/single-order' shallow>
        戻る
      </Button>
    </>
  );
};

type Props = {
  currentScreen: string | string[] | undefined;
};

const Component = ({ currentScreen }: Props) => {
  switch (currentScreen) {
    case undefined:
      return <List />;
    case 'input':
      return <Input />;
    case 'confirm':
      return <Confirm />;
    case 'complete':
      return <Complete />;
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
            <Main>
              <Component currentScreen={router.query.screen} />
            </Main>
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
