"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.handler = void 0;
var AWS = require("aws-sdk");
var graphql_tag_1 = require("graphql-tag");
var aws_appsync_1 = require("aws-appsync");
global.fetch = require('node-fetch');
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
// export const handler = async (event) => {
//   console.log(`EVENT: ${JSON.stringify(event)}`);
var handler = function () { return __awaiter(void 0, void 0, void 0, function () {
    var endpoint, graphqlClient, statusCode, body, result, err_1, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                endpoint = process.env.API_NOMOCAORDERAPI_GRAPHQLAPIENDPOINTOUTPUT;
                console.log('AWS_EXECUTION_ENV:', process.env.AWS_EXECUTION_ENV);
                if ('AWS_EXECUTION_ENV' in process.env && process.env.AWS_EXECUTION_ENV === 'AWS_Lambda_amplify-mock') {
                    endpoint = 'http://192.168.1.6:20002/graphql';
                }
                console.log('env:', process.env);
                console.log('endpoint:', endpoint);
                console.log('REGION:', process.env.REGION);
                console.log('Credentials:', AWS.config.credentials);
                graphqlClient = new aws_appsync_1["default"]({
                    url: endpoint,
                    region: process.env.REGION,
                    auth: {
                        type: 'AWS_IAM',
                        // credentials: AWS.config.credentials ?? null,
                        credentials: {
                            accessKeyId: 'mock',
                            secretAccessKey: 'mock',
                            sessionToken: 'mock'
                        }
                    },
                    disableOffline: true
                });
                statusCode = 200;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, graphqlClient.query({
                        query: (0, graphql_tag_1.gql)(query),
                        fetchPolicy: 'network-only',
                        variables: sortVariables
                    })];
            case 2:
                result = _a.sent();
                console.log('result', result);
                return [4 /*yield*/, result.data];
            case 3:
                body = _a.sent();
                console.log('body', body);
                return [3 /*break*/, 5];
            case 4:
                err_1 = _a.sent();
                error = err_1;
                console.error('error:', error);
                statusCode = 400;
                body = {
                    errors: [
                        {
                            // status: response.status,
                            status: statusCode,
                            message: error.message,
                            stack: error.stack
                        },
                    ]
                };
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/, {
                    statusCode: statusCode,
                    body: JSON.stringify(body)
                }];
        }
    });
}); };
exports.handler = handler;
// schema.graphqlのKeyディレクティブでtypeとcreatedAtのsort条件を追加。sortを実行する為にtypeを指定。
var sortVariables = {
    type: 'subscriptionOrder',
    sortDirection: 'DESC'
};
var query = /* GraphQL */ "\n  query ListSubscriptionOrdersSortedByCreatedAt(\n    $type: String!\n    $createdAt: ModelStringKeyConditionInput\n    $sortDirection: ModelSortDirection\n    $filter: ModelSubscriptionOrderFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listSubscriptionOrdersSortedByCreatedAt(\n      type: $type\n      createdAt: $createdAt\n      sortDirection: $sortDirection\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n    ) {\n      items {\n        id\n        products {\n          items {\n            id\n            subscriptionOrderID\n            productID\n            product {\n              id\n              name\n              unitPrice\n              orderType\n              viewOrder\n              isExportCSV\n              disabled\n              type\n              createdAt\n              updatedAt\n            }\n            quantity\n            createdAt\n            updatedAt\n            owner\n          }\n          nextToken\n        }\n        clinicID\n        clinic {\n          id\n          name\n          phoneNumber\n          postalCode\n          state\n          city\n          address\n          building\n          createdAt\n          updatedAt\n          owner\n        }\n        staffID\n        staff {\n          id\n          firstName\n          lastName\n          viewOrder\n          disabled\n          type\n          createdAt\n          updatedAt\n          owner\n        }\n        deliveryStartYear\n        deliveryStartMonth\n        deliveryInterval\n        createdAt\n        type\n        updatedAt\n        owner\n      }\n      nextToken\n    }\n  }\n";
