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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const aws_appsync_1 = __importDefault(require("aws-appsync"));
const graphql_tag_1 = require("graphql-tag");
const queries_1 = require("./queries");
const API_1 = require("./API");
const generate_next_delivery_year_month_1 = require("./generate-next-delivery-year-month");
global.fetch = require('node-fetch');
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
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
        const variables = {
            type: API_1.Type.subscriptionOrder,
            sortDirection: API_1.ModelSortDirection.DESC,
        };
        const result = (yield graphqlClient.query({
            query: (0, graphql_tag_1.gql)(queries_1.listSubscriptionOrdersSortedByCreatedAt),
            // 顧客ユーザのリスト取得はowner fieldでfilter
            variables: !isOperator ? Object.assign(Object.assign({}, variables), { filter: { owner: { contains: username } } }) : variables,
        }));
        if (result.errors) {
            throw result.errors;
        }
        if (!result.data ||
            !result.data.listSubscriptionOrdersSortedByCreatedAt ||
            !result.data.listSubscriptionOrdersSortedByCreatedAt.items) {
            throw Error('The API fetched data but it returned null.');
        }
        const items = result.data.listSubscriptionOrdersSortedByCreatedAt.items;
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
            const nextDeliveryYearMonth = (0, generate_next_delivery_year_month_1.generateNextDeliveryYearMonth)(item.deliveryStartYear, item.deliveryStartMonth, item.deliveryInterval, nowYear, nowMonth);
            // 次回配送予定年月をセット
            return Object.assign(Object.assign({}, item), { nextDeliveryYear: nextDeliveryYearMonth.nextDeliveryYear, nextDeliveryMonth: nextDeliveryYearMonth.nextDeliveryMonth });
        });
        // 業務ユーザのリスト取得
        const responseItems = isOperator
            ? nextDeliveryDateItems // 当月のみのリストに絞り込み。配送予定月が現在年月であればAPIレスポンスとして返却
                .filter((item) => item.nextDeliveryYear === nowYear && item.nextDeliveryMonth === nowMonth)
            : nextDeliveryDateItems;
        console.log('responseItems', responseItems);
        return responseItems;
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