"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const aws_appsync_1 = __importDefault(require("aws-appsync"));
const AWS = __importStar(require("aws-sdk"));
const graphql_tag_1 = require("graphql-tag");
const queries_1 = require("./queries");
global.fetch = require('node-fetch');
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
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
    const graphqlClient = new aws_appsync_1.default({
        url: process.env.API_NOMOCAORDERAPI_GRAPHQLAPIENDPOINTOUTPUT,
        region: process.env.REGION,
        auth: {
            type: 'AWS_IAM',
            credentials: credentials,
        },
        disableOffline: true,
    });
    try {
        const result = (yield graphqlClient.query({
            query: (0, graphql_tag_1.gql)(queries_1.listSubscriptionOrders),
            // variables: {
            //   type: 'subscriptionOrder',
            //   sortDirection: 'DESC',
            // },
        }));
        console.log('result', result);
        if (result.errors) {
            throw result.errors;
        }
        if (!result.data || !result.data.listSubscriptionOrders || !result.data.listSubscriptionOrders.items) {
            throw Error('The API fetched data but it returned null.');
        }
        const items = result.data.listSubscriptionOrders.items;
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
    }
    catch (err) {
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
});
exports.handler = handler;
const parseResponseError = (error) => {
    if (!error)
        return null;
    const errorResult = error;
    if (errorResult.message) {
        return Error(errorResult.message);
    }
    const graphqlResult = error;
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
