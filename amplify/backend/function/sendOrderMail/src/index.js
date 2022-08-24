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
      return 'Nomoca Stand 備品の注文ありがとうございます';
    case SendMailType.orderedSubscriptionOrder:
      return 'Nomoca Stand 備品定期便の申し込みありがとうございます';
    case SendMailType.updatedSubscriptionOrder:
      return 'Nomoca Stand 備品定期便の内容を変更しました';
    case SendMailType.canceledSingleOrder:
      return 'Nomoca Stand 備品の注文をキャンセルしました';
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

const createProductsMailBody = (products, subtotal, tax, total) => {
  if (!products || !subtotal || !tax || !total) {
    throw Error('Products params are not found.');
  }
  const productsLabel = products.join('\n');
  const subtotalLabel = subtotal.toLocaleString();
  const taxLabel = tax.toLocaleString();
  const totalLabel = total.toLocaleString();
  const body = `${productsLabel}

小計 ${subtotalLabel}円
消費税 ${taxLabel}円
合計 ${totalLabel}円
`;
  return body;
};

const createShippingAddressMailBody = (clinicName, postalCode, state, city, address, building, phoneNumber) => {
  const buildingLabel = building ?? '';
  const body = `
[配送先]

${clinicName}
〒${postalCode}
${state}${city}${address} ${buildingLabel}
電話番号 ${phoneNumber}
`;
  return body;
};

const createDeliveryOptionMailBody = (deliveryType, deliveryStartYear, deliveryStartMonth, deliveryInterval) => {
  if (deliveryType) {
    let deliveryTypeLabel;
    switch (deliveryType) {
      case 'regular':
        deliveryTypeLabel = '通常配送';
        break;
      case 'express':
        deliveryTypeLabel = '速達配送';
        break;
      default:
        throw Error(`The deliveryType ${deliveryType} is unknown type.`);
    }
    return `[配送方法]\n\n${deliveryTypeLabel}\n\n到着までの目安は通常発送は7営業日、速達発送は2営業日となります。`;
  } else if (deliveryStartYear && deliveryStartMonth && deliveryInterval) {
    return `[配送開始月]\n\n${deliveryStartYear}年${deliveryStartMonth}月\n\n\n[配送頻度]\n\n${deliveryInterval}ヶ月`;
  } else {
    throw Error('Delivery option params are not found.');
  }
};

const createContentsMailBody = (
  productsMailBody,
  shippingAddressMailBody,
  deliveryType,
  deliveryStartYear,
  deliveryStartMonth,
  deliveryInterval,
) => {
  const deliveryOptionMailBody = createDeliveryOptionMailBody(
    deliveryType,
    deliveryStartYear,
    deliveryStartMonth,
    deliveryInterval,
  );

  const body = `
${productsMailBody}

${deliveryOptionMailBody}

${shippingAddressMailBody}



▼本メールについて
※ このEメールアドレスは配信専用です。このメッセージにはご返信いただけません。
※ 本メールに心当たりのない方はお手数ですがその旨をお客様サポートまでご連絡ください。

▼送信者に関する情報
株式会社GENOVA
〒150-8510 東京都渋谷区渋谷2丁目21-1 渋谷ヒカリエ34階
お客様サポート 0120-811-009 (受付時間 9:00〜18:00)
`;
  return body;
};

const mailBodyTemplate = (contentsLabel, description, dear, contentsMailBody) => {
  const body = `${dear}

Nomoca Stand 備品注文サービス Nomoca Order をご利用いただきありがとうございます。
Nomoca Stand 備品${description}。


[${contentsLabel}内容]
${contentsMailBody}
`;
  return body;
};

const cancelMailBodyTemplate = (contentsLabel, description, dear, contentsMailBody) => {
  const body = `${dear}

いつも Nomoca Stand 備品注文サービス Nomoca Order をご利用いただきありがとうございます。
Nomoca Stand 備品${description}。
またのご利用をお待ちしております。


[${contentsLabel}内容]
${contentsMailBody}
`;
  return body;
};

const deliveryMailBodyTemplate = (contentsLabel, description, dear, contentsMailBody) => {
  const body = `${dear}

Nomoca Stand 備品注文サービス Nomoca Order をご利用いただきありがとうございます。
Nomoca Stand 備品${description}。
商品の到着まで、今暫くお待ち頂きますようお願いいたします。


[${contentsLabel}内容]
${contentsMailBody}
▼配送に関して注意事項
商品の到着日時に関しましては交通状況などによって遅延の可能性もございますので予めご了承ください。
商品の発送完了後は如何なるご事情でも商品の変更、キャンセルは一切お受けできません。
予めご了承頂きますようお願いいたします。
また、運送途中における商品の事故（破損、キズ等）処理を敏速に行う為、商品到着時に必ず検品をして頂きます様、お願いしております。
到着日以降の発見は、責任を負いかねる場合もございますので、くれぐれも商品到着時に検品をお願い致します。
万が一、商品違いの場合は到着後すぐにご連絡ください。
ご使用になられてからでは交換や返品がお受け出来かねます。
ご注文や配送に関してご不明な点はこちらの電話番号よりお問い合わせください。

株式会社GENOVA お客様サポート
0120-811-009 (受付時間 9:00〜18:00)
`;
  return body;
};

const createMailBody = (
  sendMailType,
  products,
  subtotal,
  tax,
  total,
  clinicName,
  phoneNumber,
  postalCode,
  state,
  city,
  address,
  building,
  staffName,
  deliveryType,
  deliveryStartYear,
  deliveryStartMonth,
  deliveryInterval,
) => {
  const dear = `${clinicName} ${staffName} 様`;
  const productsMailBody = createProductsMailBody(products, subtotal, tax, total);
  const shippingAddressMailBody = createShippingAddressMailBody(
    clinicName,
    postalCode,
    state,
    city,
    address,
    building,
    phoneNumber,
  );
  const contentsMailBody = createContentsMailBody(
    productsMailBody,
    shippingAddressMailBody,
    deliveryType,
    deliveryStartYear,
    deliveryStartMonth,
    deliveryInterval,
  );

  switch (sendMailType) {
    case SendMailType.orderedSingleOrder:
      return mailBodyTemplate('注文', 'の注文を受付しました', dear, contentsMailBody);
    case SendMailType.orderedSubscriptionOrder:
      return mailBodyTemplate('定期便', '定期便の申し込みを受付しました', dear, contentsMailBody);
    case SendMailType.updatedSubscriptionOrder:
      return mailBodyTemplate('定期便', '定期便の内容変更を受付しました', dear, contentsMailBody);
    case SendMailType.canceledSingleOrder:
      return cancelMailBodyTemplate('注文キャンセル', 'の注文キャンセルを受付しました', dear, contentsMailBody);
    case SendMailType.canceledSubscriptionOrder:
      return cancelMailBodyTemplate('定期便解約', 'の定期便解約を受付しました', dear, contentsMailBody);
    case SendMailType.deliveredSingleOrder:
      return deliveryMailBodyTemplate('注文', 'の配送手配をしました', dear, contentsMailBody);
    case SendMailType.deliveredSubscriptionOrder:
      return deliveryMailBodyTemplate('定期便', '定期便の配送手配をしました', dear, contentsMailBody);
    // return 'Nomoca Stand 備品定期便の配送手配をしました';
    default:
      throw Error('A send mail type is undefined.');
  }
};

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log('EVENT', event);
  const {
    toAddress,
    bccAddress,
    sendMailType,
    products,
    subtotal,
    tax,
    total,
    clinicName,
    phoneNumber,
    postalCode,
    state,
    city,
    address,
    building,
    staffName,
    deliveryType,
    deliveryStartYear,
    deliveryStartMonth,
    deliveryInterval,
  } = event.arguments;

  const defaultCharset = 'UTF-8';
  const fromAddress = 'Nomoca Order <no-reply@nomoca-order.com>';
  const mailSubject = createMailSubject(sendMailType);
  const mailBody = createMailBody(
    sendMailType,
    products,
    subtotal,
    tax,
    total,
    clinicName,
    phoneNumber,
    postalCode,
    state,
    city,
    address,
    building,
    staffName,
    deliveryType,
    deliveryStartYear,
    deliveryStartMonth,
    deliveryInterval,
  );
  console.log(mailSubject);
  console.log(mailBody);
  try {
    // 送信するEmailのparamsを設定
    const params = {
      Destination: {
        ToAddresses: [toAddress],
      },
      Message: {
        Subject: {
          Charset: defaultCharset,
          Data: mailSubject,
        },
        Body: {
          Text: {
            Charset: defaultCharset,
            Data: mailBody,
          },
        },
      },
      Source: fromAddress, // From・必須
    };
    // bccAddressがあればパラメーターに追加
    const requestParams = bccAddress
      ? {
          ...params,
          Destination: {
            BccAddresses: [bccAddress],
            ToAddresses: [toAddress],
          },
        }
      : params;

    console.table(requestParams);
    // リージョンを設定
    AWS.config.update({ region: 'us-east-1' });
    // 送信処理
    const ses = new AWS.SES();
    await ses.sendEmail(requestParams).promise();
    console.log('Success to Send an Email');
    return clinicName;
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
