import AWSAppSyncClient from 'aws-appsync';
import * as AWS from 'aws-sdk';
import { gql } from 'graphql-tag';
global.fetch = require('node-fetch');
import { GraphQLError } from 'graphql';
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
// export const handler = async (event) => {
//   console.log(`EVENT: ${JSON.stringify(event)}`);
export const handler = async () => {
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
  console.log('Credentials:', AWS.config.credentials);

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
    const result = await graphqlClient.query({
      query: gql(query),
      fetchPolicy: 'network-only',
      variables: sortVariables,
    });
    console.log('result', result);
    if (result.errors) {
      throw result.errors;
    }
    return {
      statusCode: 200,
      body: JSON.stringify(result.data),
    };
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
