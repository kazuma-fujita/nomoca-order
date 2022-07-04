import { GraphQLResult } from '@aws-amplify/api';
import AWSAppSyncClient from 'aws-appsync';
import * as AWS from 'aws-sdk';
import { GraphQLError } from 'graphql';
import { gql } from 'graphql-tag';
import { ListSubscriptionOrdersSortedByCreatedAtQuery, SubscriptionOrder, ListSubscriptionOrdersQuery } from './API';
import { listSubscriptionOrders } from './queries';
global.fetch = require('node-fetch');
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export const handler = async (event: any) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  // export const handler = async () => {
  let credentials = AWS.config.credentials;
  // mock
  if ('AWS_EXECUTION_ENV' in process.env && process.env.AWS_EXECUTION_ENV.endsWith('-mock')) {
    // mock credentials。なぜか以下の識別子じゃないとamplify mock function 実行時 unauthorizedとなる
    credentials = {
      accessKeyId: 'ASIAVJKIAM-AuthRole',
      secretAccessKey: 'fake',
    };
    // credentials: {
    // accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    // secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    // sessionToken: process.env.AWS_SESSION_TOKEN,
    // },
  }

  console.log('env:', process.env);
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
      query: gql(listSubscriptionOrders),
      // variables: {
      //   type: 'subscriptionOrder',
      //   sortDirection: 'DESC',
      // },
    })) as GraphQLResult<ListSubscriptionOrdersQuery>;

    console.log('result', result);
    if (result.errors) {
      throw result.errors;
    }

    if (!result.data || !result.data.listSubscriptionOrders || !result.data.listSubscriptionOrders.items) {
      throw Error('The API fetched data but it returned null.');
    }

    const items = result.data.listSubscriptionOrders.items as SubscriptionOrder[];
    for (const item of items) {
      if (!item || !item.products || !item.products.items) {
        throw Error('The API fetched products but it returned null.');
      }
    }

    console.log('items', items);
    // responseの返し方不明。要調査
    // const response = JSON.stringify({
    //   listAdminSubscriptionOrders: { __typename: 'SubscriptionOrdersResponse', items: items },
    // });
    const response = JSON.stringify({ __typename: 'SubscriptionOrdersResponse', items: items });
    console.log('response', response);
    return items;
    // return {
    //   statusCode: 200,
    //   body: JSON.stringify(items),
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //   },
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

// const query = /* GraphQL */ `
//   query ListSubscriptionOrdersSortedByCreatedAt(
//     $type: String!
//     $createdAt: ModelStringKeyConditionInput
//     $sortDirection: ModelSortDirection
//     $filter: ModelSubscriptionOrderFilterInput
//     $limit: Int
//     $nextToken: String
//   ) {
//     listSubscriptionOrdersSortedByCreatedAt(
//       type: $type
//       createdAt: $createdAt
//       sortDirection: $sortDirection
//       filter: $filter
//       limit: $limit
//       nextToken: $nextToken
//     ) {
//       items {
//         id
//         products {
//           items {
//             id
//             subscriptionOrderID
//             productID
//             product {
//               id
//               name
//               unitPrice
//               orderType
//               viewOrder
//               isExportCSV
//               disabled
//               type
//               createdAt
//               updatedAt
//             }
//             quantity
//             createdAt
//             updatedAt
//             owner
//           }
//           nextToken
//         }
//         clinicID
//         clinic {
//           id
//           name
//           phoneNumber
//           postalCode
//           state
//           city
//           address
//           building
//           createdAt
//           updatedAt
//           owner
//         }
//         staffID
//         staff {
//           id
//           firstName
//           lastName
//           viewOrder
//           disabled
//           type
//           createdAt
//           updatedAt
//           owner
//         }
//         deliveryStartYear
//         deliveryStartMonth
//         deliveryInterval
//         createdAt
//         type
//         updatedAt
//         owner
//       }
//       nextToken
//     }
//   }
// `;
