import { StaffTemplate } from 'components/templates/staff-template';
import { ScreenName } from 'constants/screen-name';
import { TitleSuffix } from 'constants/title-suffix';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useVerifyAuthenticated } from 'stores/use-current-user';
import { StaffListContextProvider } from 'stores/use-staff-list';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const StaffPage = (props: Props) => {
  useVerifyAuthenticated();

  return (
    <>
      <Head>
        <title>{props.pageTitle}</title>
      </Head>
      <StaffListContextProvider filterWithActiveStaff={false}>
        <StaffTemplate />
      </StaffListContextProvider>
    </>
  );
};

export default StaffPage;

export const getStaticProps = async (context: GetStaticPropsContext) => {
  return {
    props: {
      pageTitle: ScreenName.Staff + TitleSuffix,
    },
  };
};
