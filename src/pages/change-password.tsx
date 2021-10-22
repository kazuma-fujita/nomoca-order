import Amplify from 'aws-amplify';
import awsconfig from 'aws-exports';
import { StaffTemplate } from 'components/templates/staff-template';
import { ScreenName } from 'constants/screen-name';
import { TitleSuffix } from 'constants/title-suffix';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useVerifyAuthenticated } from 'stores/use-current-user';

// Amplify.configure(awsconfig);

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

export const getStaticProps = async (context: GetStaticPropsContext) => {
  return {
    props: {
      pageTitle: ScreenName.ChangePassword + TitleSuffix,
    },
  };
};
