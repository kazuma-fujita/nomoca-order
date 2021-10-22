import { AuthState, CognitoUserInterface, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from 'aws-exports';
import { Path } from 'constants/path';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { StaffTemplate } from 'components/templates/staff-template';
import { SubscriptionOrderTemplate } from 'components/templates/subscription-order-template';
import { ScreenName } from 'constants/screen-name';
import { TitleSuffix } from 'constants/title-suffix';
import { useVerifyAuthenticated } from 'stores/use-current-user';

// Amplify.configure(awsconfig);

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const SubscriptionOrderPage = (props: Props) => {
  useVerifyAuthenticated();

  return (
    <>
      <Head>
        <title>{props.pageTitle}</title>
      </Head>
      <SubscriptionOrderTemplate />
    </>
  );
};

export default SubscriptionOrderPage;

export const getStaticProps = async (context: GetStaticPropsContext) => {
  return {
    props: {
      pageTitle: ScreenName.SubscriptionOrder + TitleSuffix,
    },
  };
};
