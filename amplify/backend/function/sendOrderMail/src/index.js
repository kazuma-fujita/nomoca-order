const AWS = require('aws-sdk');

const SendMailType = {
  orderedSingleOrder: 'orderedSingleOrder',
  orderedSubscriptionOrder: 'orderedSubscriptionOrder',
  updatedSubscriptionOrder: 'updatedSubscriptionOrder',
  canceledSingleOrder: 'canceledSingleOrder',
  canceledSubscriptionOrder: 'canceledSubscriptionOrder',
  deliveredSingleOrder: 'deliveredSingleOrder',
  deliveredSubscriptionOrder: 'deliveredSubscriptionOrder',
};

const createMailSubject = (sendMailType) => {
  switch (sendMailType) {
    case SendMailType.orderedSingleOrder:
      return 'Nomoca Stand 備品注文ありがとうございます';
    case SendMailType.orderedSubscriptionOrder:
      return 'NOMOCa Stand 備品定期便の申し込みありがとうございます';
    case SendMailType.updatedSubscriptionOrder:
      return 'Nomoca Stand 備品定期便の内容を変更しました';
    case SendMailType.canceledSingleOrder:
      return 'Nomoca Stand 備品注文をキャンセルしました';
    case SendMailType.canceledSubscriptionOrder:
      return 'Nomoca Stand 備品定期便を解約しました';
    case SendMailType.deliveredSingleOrder:
      return 'Nomoca Stand 備品の配送手配をしました';
    case SendMailType.deliveredSubscriptionOrder:
      return 'Nomoca Stand 備品定期便の配送手配をしました';
    default:
      throw Error('A send mail type is undefined.');
  }
};

const createProductMailBody = () => {
  return '';
};

const createMailBody = (sendMailType, clinicName) => {
  const greeting = 'この度は Nomoca Stand 備品注文サービス Nomoca Order のご利用ありがとうございます。';
  switch (sendMailType) {
    case SendMailType.orderedSingleOrder:
      return `${greeting}\n${clinicName}様の Nomoca Stand 備品注文を受付しました。\n`;
    case SendMailType.orderedSubscriptionOrder:
      return 'NOMOCa Stand 備品定期便の申し込みありがとうございます';
    case SendMailType.updatedSubscriptionOrder:
      return 'Nomoca Stand 備品定期便の内容を変更しました';
    case SendMailType.canceledSingleOrder:
      return 'Nomoca Stand 備品注文をキャンセルしました';
    case SendMailType.canceledSubscriptionOrder:
      return 'Nomoca Stand 備品定期便を解約しました';
    case SendMailType.deliveredSingleOrder:
      return 'Nomoca Stand 備品の配送手配をしました';
    case SendMailType.deliveredSubscriptionOrder:
      return 'Nomoca Stand 備品定期便の配送手配をしました';
    default:
      throw Error('A send mail type is undefined.');
  }
};

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log('EVENT', event);
  const sendMailType = event.arguments.sendMailType;
  const clinicName = event.arguments.clinicName;
  const defaultCharset = 'UTF-8';
  const fromAddress = 'Nomoca Order <no-reply@nomoca-order.com>';
  console.log('sendMailType', sendMailType);
  console.log('clinicName', clinicName);
  try {
    // 1.送信するEmailのparamsを設定
    const params = {
      Destination: {
        BccAddresses: ['kazuma.fujita@genova.co.jp'],
        ToAddresses: ['nqh25110@gmail.com'],
      },
      Message: {
        Subject: {
          Charset: defaultCharset,
          Data: createMailSubject(sendMailType),
        },
        Body: {
          Text: {
            Charset: defaultCharset,
            Data: createMailBody(sendMailType, clinicName),
          },
        },
      },
      Source: fromAddress, // From・必須
    };
    // 2.リージョンを設定
    AWS.config.update({ region: 'us-east-1' });
    // 3.送信処理
    const ses = new AWS.SES();
    await ses.sendEmail(params).promise();
    console.log('Success to Send an Email');
    return;
  } catch (e) {
    console.log(`Failed to Send an Email: ${e}`);
    return;
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
