import { Main } from 'components/molecules/main';
import { ClinicTemplate } from 'components/templates/clinics/clinic-template';
import { ScreenName } from 'constants/screen-name';
import { TitleSuffix } from 'constants/title-suffix';
import { ClinicContextProvider } from 'hooks/clinics/use-fetch-clinic';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useVerifyAuthenticated } from 'stores/use-current-user';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const ClinicPage = (props: Props) => {
  useVerifyAuthenticated();

  return (
    <>
      <Head>
        <title>{props.pageTitle}</title>
      </Head>
      <ClinicContextProvider>
        <Main>
          <ClinicTemplate />
        </Main>
      </ClinicContextProvider>
    </>
  );
};

export default ClinicPage;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getStaticProps = async (context: GetStaticPropsContext) => {
  return {
    props: {
      pageTitle: ScreenName.clinic + TitleSuffix,
    },
  };
};
