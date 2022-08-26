import { GraphQLResult } from '@aws-amplify/api';
import AWSAppSyncClient from 'aws-appsync';
import { gql } from 'graphql-tag';
import {
  ListSubscriptionOrdersSortedByCreatedAtQuery,
  ListSubscriptionOrdersSortedByCreatedAtQueryVariables,
  ModelSortDirection,
  ModelSubscriptionOrderFilterInput,
  SubscriptionOrder,
  Type,
} from './API';
import { generateNextDeliveryYearMonth } from './generate-next-delivery-year-month';
import { listSubscriptionOrdersSortedByCreatedAt } from './queries';

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
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    sessionToken: process.env.AWS_SESSION_TOKEN as string,
  };

  const awsExecutionEnv = process.env.AWS_EXECUTION_ENV as string;
  // mock
  if (awsExecutionEnv.endsWith('-mock')) {
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
    region: process.env.REGION as string,
    auth: {
      type: 'AWS_IAM',
      credentials: credentials,
    },
    disableOffline: true,
  });

  // ExceptionをそのままAPI responseとして返却する為 try-catch しない
  // try {

  const filter: ModelSubscriptionOrderFilterInput = { owner: { contains: username } };

  const baseVariables: ListSubscriptionOrdersSortedByCreatedAtQueryVariables = {
    type: Type.subscriptionOrder,
    sortDirection: ModelSortDirection.DESC,
  };

  // 顧客ユーザのリスト取得はowner fieldでfilter
  const variables: ListSubscriptionOrdersSortedByCreatedAtQueryVariables = !isOperator
    ? { ...baseVariables, filter: filter }
    : baseVariables;

  const result = (await graphqlClient.query({
    query: gql(listSubscriptionOrdersSortedByCreatedAt),
    variables: variables,
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
  // JST時刻のdateオブジェクト生成
  const now = generateJSTDate();
  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth() + 1;
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

  // ExceptionをそのままAPI responseとして返却する為 try-catch しない
  // } catch (err) {
  //   const error: Error = parseResponseError(err);
  //   console.error('list subscription order error:', error);
  //   return error.message;
  // }
};

// JST時刻のdateオブジェクト生成
const generateJSTDate = (): Date => {
  // UTC -> JST変換処理
  const now = new Date();
  // JSTはUTCから+9時間
  const jstOffset = 9 * 60;
  // JSTとUTCの差分を計算
  const offset = now.getTimezoneOffset() + jstOffset;
  // getTimeはミリ秒なので60x1000
  now.setTime(now.getTime() + offset * 60 * 1000);
  return now;
};
