import { GraphQLResult } from '@aws-amplify/api';
import AWSAppSyncClient from 'aws-appsync';
import * as AWS from 'aws-sdk';
import { GraphQLError } from 'graphql';
import { gql } from 'graphql-tag';
import { listSubscriptionOrdersSortedByCreatedAt } from './queries';
import {
  ListSubscriptionOrdersSortedByCreatedAtQuery,
  ListSubscriptionOrdersSortedByCreatedAtQueryVariables,
  ModelSortDirection,
  SubscriptionOrder,
  Type,
} from './API';
import { generateNextDeliveryYearMonth } from './generate-next-delivery-year-month';
global.fetch = require('node-fetch');
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export const handler = async (event: any) => {
  console.log('EVENT', event);
  const groups = event.identity.claims['cognito:groups'];
  const username = event.identity.username;
  const isOperator = groups && groups.length === 1 && groups[0] === 'Operators';
  console.log('groups', groups);
  console.log('isOperator', isOperator);
  console.log('username', username);
  console.log('process.env', process.env);

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
  }

  console.log('Credentials:', credentials);

  // AppSync接続クライアント生成。mock起動時、GRAPHQLAPIENDPOINはローカルURLに向く
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
    const variables: ListSubscriptionOrdersSortedByCreatedAtQueryVariables = {
      type: Type.subscriptionOrder,
      sortDirection: ModelSortDirection.DESC,
    };

    const result = (await graphqlClient.query({
      query: gql(listSubscriptionOrdersSortedByCreatedAt),
      // 顧客ユーザのリスト取得はowner fieldでfilter
      variables: !isOperator ? { ...variables, filter: { owner: { contains: username } } } : variables,
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

    // 顧客ユーザ、業務ユーザ共通で次回発送予定年月をレスポンスに追加
    const nextDeliveryDateItems = items.map((item) => {
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
    });

    // 業務ユーザのリスト取得
    const responseItems = isOperator
      ? nextDeliveryDateItems // 当月のみのリストに絞り込み。配送予定月が現在年月であればAPIレスポンスとして返却
          .filter((item) => item.nextDeliveryYear === nowYear && item.nextDeliveryMonth === nowMonth)
      : nextDeliveryDateItems;

    console.log('responseItems', responseItems);

    return responseItems;
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
