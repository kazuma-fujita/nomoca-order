import * as AWS from 'aws-sdk';
import { gql } from 'graphql-tag';
import { print } from 'graphql';
import AWSAppSyncClient from 'aws-appsync';
global.fetch = require('node-fetch');

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
// export const handler = async (event) => {
//   console.log(`EVENT: ${JSON.stringify(event)}`);
export const handler = async () => {
  let endpoint = process.env.API_NOMOCAORDERAPI_GRAPHQLAPIENDPOINTOUTPUT as string;
  console.log('AWS_EXECUTION_ENV:', process.env.AWS_EXECUTION_ENV);
  if ('AWS_EXECUTION_ENV' in process.env && process.env.AWS_EXECUTION_ENV === 'AWS_Lambda_amplify-mock') {
    endpoint = 'http://192.168.1.6:20002/graphql';
  }

  console.log('env:', process.env);
  console.log('endpoint:', endpoint);
  console.log('REGION:', process.env.REGION);
  console.log('Credentials:', AWS.config.credentials);
  const graphqlClient = new AWSAppSyncClient({
    url: endpoint,
    region: process.env.REGION,
    auth: {
      type: 'AWS_IAM',
      // credentials: AWS.config.credentials ?? null,
      credentials: {
        accessKeyId: 'mock',
        secretAccessKey: 'mock',
        sessionToken: 'mock',
        // accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        // secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        // sessionToken: process.env.AWS_SESSION_TOKEN,
      },
    },
    disableOffline: true,
  });

  let statusCode = 200;
  let body;

  try {
    const result = await graphqlClient.query({
      query: gql(query),
      fetchPolicy: 'network-only',
      variables: sortVariables,
    });
    console.log('result', result);
    body = await result.data;
    console.log('body', body);
    // if (body.errors) statusCode = 400;
  } catch (err) {
    const error = err as Error;
    console.error('error:', error);
    statusCode = 400;
    body = {
      errors: [
        {
          // status: response.status,
          status: statusCode,
          message: error.message,
          stack: error.stack,
        },
      ],
    };
  }

  return {
    statusCode,
    body: JSON.stringify(body),
  };
};

// schema.graphqlのKeyディレクティブでtypeとcreatedAtのsort条件を追加。sortを実行する為にtypeを指定。
const sortVariables = {
  type: 'subscriptionOrder',
  sortDirection: 'DESC',
};

const query = /* GraphQL */ `
  query ListSubscriptionOrdersSortedByCreatedAt(
    $type: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelSubscriptionOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubscriptionOrdersSortedByCreatedAt(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        products {
          items {
            id
            subscriptionOrderID
            productID
            product {
              id
              name
              unitPrice
              orderType
              viewOrder
              isExportCSV
              disabled
              type
              createdAt
              updatedAt
            }
            quantity
            createdAt
            updatedAt
            owner
          }
          nextToken
        }
        clinicID
        clinic {
          id
          name
          phoneNumber
          postalCode
          state
          city
          address
          building
          createdAt
          updatedAt
          owner
        }
        staffID
        staff {
          id
          firstName
          lastName
          viewOrder
          disabled
          type
          createdAt
          updatedAt
          owner
        }
        deliveryStartYear
        deliveryStartMonth
        deliveryInterval
        createdAt
        type
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
