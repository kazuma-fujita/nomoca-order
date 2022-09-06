import { Main } from 'components/molecules/main';
import { StaffTemplate } from 'components/templates/staffs/staff-template';
import { ScreenName } from 'constants/screen-name';
import { TitleSuffix } from 'constants/title-suffix';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useVerifyAuthenticated } from 'stores/use-current-user';
import { StaffListContextProvider } from 'hooks/staffs/use-fetch-staff-list';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const StaffPage = (props: Props) => {
  useVerifyAuthenticated();

  return (
    <>
      <Head>
        <title>{props.pageTitle}</title>
      </Head>
      <StaffListContextProvider>
        <Main>
          <StaffTemplate />
        </Main>
      </StaffListContextProvider>
    </>
  );
};

export default StaffPage;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getStaticProps = async (context: GetStaticPropsContext) => {
  return {
    props: {
      pageTitle: ScreenName.staff + TitleSuffix,
    },
  };
};
