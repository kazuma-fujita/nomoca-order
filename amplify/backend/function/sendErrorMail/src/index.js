const AWS = require('aws-sdk');

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log('EVENT', event);
  const { toAddress, subject, body } = event.arguments;

  const defaultCharset = 'UTF-8';
  const fromAddress = 'Nomoca Order <no-reply@nomoca-order.com>';
  try {
    // 送信するEmailのparamsを設定
    const params = {
      Destination: {
        ToAddresses: [toAddress],
      },
      Message: {
        Subject: {
          Charset: defaultCharset,
          Data: subject,
        },
        Body: {
          Text: {
            Charset: defaultCharset,
            Data: body,
          },
        },
      },
      Source: fromAddress, // From・必須
    };

    // リージョンを設定
    AWS.config.update({ region: 'us-east-1' });
    // 送信処理
    const ses = new AWS.SES();
    await ses.sendEmail(params).promise();
    console.log('Success to Send an Email');
    return;
  } catch (e) {
    console.log(`Failed to Send an Email: ${e}`);
    return e;
  }

  // return {
  //   statusCode: 200,
  //   //  Uncomment below to enable CORS requests
  //   //  headers: {
  //   //      "Access-Control-Allow-Origin": "*",
  //   //      "Access-Control-Allow-Headers": "*"
  //   //  },

  //   body: JSON.stringify('Hello from Lambda!'),
  // };
};
