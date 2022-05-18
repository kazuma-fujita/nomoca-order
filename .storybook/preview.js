import Amplify from '@aws-amplify/core';
import awsconfig from 'aws-exports';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { RouterContext } from 'next/dist/shared/lib/router-context'; // next 12

// Cognito認証でAppSyncを実行するとNo current user errorが発生する為、API_KEY認証に切り替え
Amplify.configure({ ...awsconfig, aws_appsync_authenticationType: 'API_KEY' });

// Initialize MSW
initialize();

// Provide the MSW addon decorator globally
export const decorators = [mswDecorator];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
};
