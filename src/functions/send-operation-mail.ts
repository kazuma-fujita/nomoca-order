import { GraphQLResult } from '@aws-amplify/api';
import { SendErrorMailQueryVariables, SendErrorMailQuery } from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { ProductName } from 'constants/product-name';
import { sendErrorMail as sendErrorMailQueries } from 'graphql/queries';
import { parseResponseError } from 'utilities/parse-response-error';

// .envからmailAddress取得
const toAddress = process.env.NEXT_PUBLIC_OPERATION_MAIL_TO_ADDRESS as string;

// 名前付き引数
type Options = {
  subject: string;
  body: string;
};

// 注文・定期便・定期便更新メール送信
export const sendOperationMail = async ({ subject, body }: Options) => {
  const mailSubject = `[${ProductName}] ${subject}`;

  const sendMailVariables: SendErrorMailQueryVariables = {
    toAddress: toAddress,
    subject: mailSubject,
    body: body,
  };

  try {
    // メール送信 sendErrorMail lambda functionを利用
    const sendMailResult = (await API.graphql(
      graphqlOperation(sendErrorMailQueries, sendMailVariables),
    )) as GraphQLResult<SendErrorMailQuery>;
    return sendMailResult.data?.sendErrorMail;
  } catch (error) {
    const parseError = parseResponseError(error);
    console.error('To send error mail was occurred', parseError);
    throw parseError;
  }
};
