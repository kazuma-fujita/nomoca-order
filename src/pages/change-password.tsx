import { StaffTemplate } from 'components/templates/staffs/staff-template';
import { ScreenName } from 'constants/screen-name';
import { TitleSuffix } from 'constants/title-suffix';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useVerifyAuthenticated } from 'stores/use-current-user';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const ChangePasswordPage = (props: Props) => {
  useVerifyAuthenticated();
  return (
    <>
      <Head>
        <title>{props.pageTitle}</title>
      </Head>
      <StaffTemplate />
    </>
  );
};

export default ChangePasswordPage;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getStaticProps = async (context: GetStaticPropsContext) => {
  return {
    props: {
      pageTitle: ScreenName.ChangePassword + TitleSuffix,
    },
  };
};
