import { GraphQLResult } from '@aws-amplify/api';
import AWSAppSyncClient from 'aws-appsync';
import * as AWS from 'aws-sdk';
import { GraphQLError } from 'graphql';
import { gql } from 'graphql-tag';
import { listSubscriptionOrdersSortedByCreatedAt } from './queries';
import { ListSubscriptionOrdersSortedByCreatedAtQuery, SubscriptionOrder } from './API';
import { generateNextDeliveryYearMonth } from './generate-next-delivery-year-month';
global.fetch = require('node-fetch');
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export const handler = async (event: any) => {
  console.log('EVENT', event);
  // let credentials = AWS.config.credentials;
  let credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN,
  };

  // mock
  if ('AWS_EXECUTION_ENV' in process.env && process.env.AWS_EXECUTION_ENV.endsWith('-mock')) {
    // mock credentials。なぜか以下の識別子じゃないとamplify mock function 実行時 unauthorizedとなる
    credentials = {
      accessKeyId: 'ASIAVJKIAM-AuthRole',
      secretAccessKey: 'fake',
      sessionToken: 'fake',
    };

    // credentials: {
    // accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    // secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    // sessionToken: process.env.AWS_SESSION_TOKEN,
    // },
  }

  // console.log('env:', process.env);
  console.log('Credentials:', credentials);

  const graphqlClient = new AWSAppSyncClient({
    url: process.env.API_NOMOCAORDERAPI_GRAPHQLAPIENDPOINTOUTPUT as string,
    region: process.env.REGION,
    auth: {
      type: 'AWS_IAM',
      credentials: credentials,
    },
    disableOffline: true,
  });

  try {
    const result = (await graphqlClient.query({
      query: gql(listSubscriptionOrdersSortedByCreatedAt),
      variables: {
        type: 'subscriptionOrder',
        sortDirection: 'DESC',
      },
    })) as GraphQLResult<ListSubscriptionOrdersSortedByCreatedAtQuery>;

    if (result.errors) {
      throw result.errors;
    }

    if (
      !result.data ||
      !result.data.listSubscriptionOrdersSortedByCreatedAt ||
      !result.data.listSubscriptionOrdersSortedByCreatedAt.items
    ) {
      throw Error('The API fetched data but it returned null.');
    }

    const items = result.data.listSubscriptionOrdersSortedByCreatedAt.items as SubscriptionOrder[];
    for (const item of items) {
      if (!item || !item.products || !item.products.items) {
        throw Error('The API fetched products but it returned null.');
      }
    }

    const now = new Date();
    const nowYear = now.getFullYear();
    const nowMonth = now.getMonth() + 1;
    console.log('nowYear', nowYear, 'nowMonth', nowMonth);
    const responseItems = items
      .map((item) => {
        // 次回発送予定年月を計算した値
        const nextDeliveryYearMonth = generateNextDeliveryYearMonth(
          item.deliveryStartYear,
          item.deliveryStartMonth,
          item.deliveryInterval,
          nowYear,
          nowMonth,
        );
        // 次回配送予定年月をセット
        return {
          ...item,
          nextDeliveryYear: nextDeliveryYearMonth.nextDeliveryYear,
          nextDeliveryMonth: nextDeliveryYearMonth.nextDeliveryMonth,
        };
      }) // 配送予定月が現在年月であればAPIレスポンスとして返却
      .filter((item) => item.nextDeliveryYear === nowYear && item.nextDeliveryMonth === nowMonth);

    console.log('responseItems', responseItems);

    return responseItems;
    // return {
    //   statusCode: 200,
    //   body: JSON.stringify(items),
    //   headers: { 'Access-Control-Allow-Origin': '*', },
    // };
  } catch (err) {
    const error = parseResponseError(err);
    console.error('error:', error);
    const body = {
      errors: [
        {
          status: 400,
          message: error.message,
          stack: error.stack,
        },
      ],
    };
    return {
      statusCode: 400,
      body: JSON.stringify(body),
    };
  }
};

const parseResponseError = (error: any): Error | null => {
  if (!error) return null;

  const errorResult = error as Error;
  if (errorResult.message) {
    return Error(errorResult.message);
  }

  const graphqlResult = error as GraphQLError;
  if (graphqlResult.message) {
    return Error(graphqlResult.message);
  }

  return null;
};
