import { GraphQLResult } from '@aws-amplify/api';
import { SendErrorMailQueryVariables, SendErrorMailQuery } from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { ProductName } from 'constants/product-name';
import { sendErrorMail as sendErrorMailQueries } from 'graphql/queries';
import { parseResponseError } from 'utilities/parse-response-error';

// .envからmailAddress取得
const toAddress = process.env.NEXT_PUBLIC_ERROR_MAIL_TO_ADDRESS as string;

// 注文・定期便・定期便更新メール送信
export const sendErrorMail = async (body: string) => {
  const mailSubject = `[${ProductName}] An error was occurred`;

  console.log('error toAddress', toAddress);

  const sendMailVariables: SendErrorMailQueryVariables = {
    toAddress: toAddress,
    subject: mailSubject,
    body: body,
  };

  try {
    // メール送信
    const sendMailResult = (await API.graphql(
      graphqlOperation(sendErrorMailQueries, sendMailVariables),
    )) as GraphQLResult<SendErrorMailQuery>;
    console.log('sendErrorMailResult', sendMailResult.data?.sendErrorMail);
  } catch (error) {
    const parseError = parseResponseError(error);
    console.error('To send error mail was occurred', parseError);
    throw parseError;
  }
};
