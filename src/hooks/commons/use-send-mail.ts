import { GraphQLResult } from '@aws-amplify/api';
import { Clinic, DeliveryType, SendMailType, SendOrderMailQueryVariables, Staff, SendOrderMailQuery } from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { calcTotalFromProductList } from 'functions/orders/calc-total-taxes-subtotal';
import { sendOrderMail } from 'graphql/queries';
import { NormalizedProduct } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { parseResponseError } from 'utilities/parse-response-error';

// .envからBCC mailAddress取得
const mailBccAddress = process.env.NEXT_PUBLIC_MAIL_BCC_ADDRESS as string;

// 名前付き引数
type Options = {
  sendMailType: SendMailType;
  products: NormalizedProduct[];
  clinic: Clinic;
  staff: Staff;
  deliveryType?: DeliveryType | null;
  deliveryStartYear?: number | null;
  deliveryStartMonth?: number | null;
  deliveryInterval?: number | null;
};

// 注文・定期便・定期便更新メール送信
export const useSendMail = () => {
  const sendMail = async ({
    sendMailType,
    products,
    clinic,
    staff,
    deliveryType = null,
    deliveryStartYear = null,
    deliveryStartMonth = null,
    deliveryInterval = null,
  }: Options) => {
    // DBから取得した値から不要な要素を削除
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { name, id, __typename, createdAt, updatedAt, owner, ...restClinic } = clinic;
    // 小計、税、合計を計算
    const { total, taxes, subtotal } = calcTotalFromProductList(products);

    // requestパラメータ設定
    const sendMailVariables: SendOrderMailQueryVariables = {
      toAddress: clinic.mailAddress,
      bccAddress: mailBccAddress,
      sendMailType: sendMailType,
      products: products.map(
        (product) =>
          `${product.name} ${product.quantity}個 ${(product.unitPrice * product.quantity).toLocaleString()}円`,
      ),
      subtotal: subtotal,
      tax: taxes,
      total: total,
      clinicName: name,
      staffName: `${staff.lastName} ${staff.firstName}`,
      deliveryType: deliveryType,
      deliveryStartYear: deliveryStartYear,
      deliveryStartMonth: deliveryStartMonth,
      deliveryInterval: deliveryInterval,
      ...restClinic,
    };

    try {
      // メール送信
      const sendMailResult = (await API.graphql(
        graphqlOperation(sendOrderMail, sendMailVariables),
      )) as GraphQLResult<SendOrderMailQuery>;

      if (!sendMailResult.data || !sendMailResult.data.sendOrderMail) {
        throw Error('It returned null that an API which executed to send mail.');
      }

      console.log('order sendMailResult', sendMailResult.data.sendOrderMail);
      return sendMailResult.data.sendOrderMail;
    } catch (error) {
      const parseError = parseResponseError(error);
      console.error('To send order error mail was occurred', parseError);
      throw parseError;
    }
  };
  return { sendMail };
};
