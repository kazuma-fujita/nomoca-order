import { GraphQLResult } from '@aws-amplify/api';
import {
  Clinic,
  DeliveryType,
  SendMailType,
  SendOrderMailQueryVariables,
  Staff,
  SendOrderMailQuery,
  Order,
  SubscriptionOrder,
} from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { calcTotalFromProductList } from 'functions/orders/calc-total-taxes-subtotal';
import { sendOrderMail } from 'graphql/queries';
import { ExtendedOrder, NormalizedProduct } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { parseResponseError } from 'utilities/parse-response-error';
import {
  filteredPromiseFulfilledResult,
  filteredPromiseRejectedResult,
} from 'functions/filter-promise-settled-results';

// .envからBCC mailAddress取得
// const mailBccAddress = process.env.NEXT_PUBLIC_MAIL_BCC_ADDRESS as string;
const toOperationAddress = process.env.NEXT_PUBLIC_OPERATION_MAIL_TO_ADDRESS as string;
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
    // subtotal ... 小計(税抜) = 単価(税抜) * 個数
    // total ... 合計 = 小計(税抜) + 消費税
    // taxes ... 内消費税 = 小計 * 0.1
    // 注) 消費税の端数は四捨五入される
    const { total, taxes, subtotal } = calcTotalFromProductList(products);

    // requestパラメータ設定
    const sendMailVariables: SendOrderMailQueryVariables = {
      toAddresses: [clinic.mailAddress, toOperationAddress],
      sendMailType: sendMailType,
      products: products.map((product) => {
        // 商品毎の単価(税抜)の合計金額(税抜)を計算
        const total = (product.unitPrice * product.quantity).toLocaleString();
        return `${product.name}  単価 ${product.unitPrice}円  数量 ${product.quantity}  金額 ${total}円`;
      }),
      subtotal: subtotal, // 小計(税抜)
      tax: taxes, // 消費税
      total: total, // 合計(税込)
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

      return sendMailResult.data.sendOrderMail;
    } catch (error) {
      const parseError = parseResponseError(error);
      console.error('To send order error mail was occurred', parseError);
      throw parseError;
    }
  };

  const sendDeliverySingleOrderMail = async (orders: ExtendedOrder<Order>[]) => {
    // Promise.allSettledでメール送信処理を同時並列実行
    const sendMailStatuses: PromiseSettledResult<string>[] = await Promise.allSettled(
      orders.map(async (order) => {
        try {
          // 注文配送メール送信。成功時は医院名を返却
          return await sendMail({
            sendMailType: SendMailType.deliveredSingleOrder,
            products: order.normalizedProducts,
            clinic: order.clinic,
            staff: order.staff,
            deliveryType: order.deliveryType,
          });
        } catch (err) {
          const error = parseResponseError(err);
          throw Error(`${order.clinic.name}: ${error}`);
        }
      }),
    );
    // メール送信成功/失敗リスト抽出
    const sendMailSuccesses = filteredPromiseFulfilledResult(sendMailStatuses);
    const sendMailFails = filteredPromiseRejectedResult(sendMailStatuses);
    return { sendMailSuccesses, sendMailFails };
  };

  const sendDeliverySubscriptionOrderMail = async (orders: ExtendedOrder<SubscriptionOrder>[]) => {
    // Promise.allSettledでメール送信処理を同時並列実行
    const sendMailStatuses: PromiseSettledResult<string>[] = await Promise.allSettled(
      orders.map(async (order) => {
        try {
          // 注文配送メール送信
          return await sendMail({
            sendMailType: SendMailType.deliveredSubscriptionOrder,
            products: order.normalizedProducts,
            clinic: order.clinic,
            staff: order.staff,
            deliveryStartYear: order.deliveryStartYear,
            deliveryStartMonth: order.deliveryStartMonth,
            deliveryInterval: order.deliveryInterval,
          });
        } catch (err) {
          const error = parseResponseError(err);
          throw Error(`${order.clinic.name}: ${error}`);
        }
      }),
    );
    // メール送信成功/失敗リスト抽出
    const sendMailSuccesses = filteredPromiseFulfilledResult(sendMailStatuses);
    const sendMailFails = filteredPromiseRejectedResult(sendMailStatuses);
    return { sendMailSuccesses, sendMailFails };
  };

  // 配送メール送信結果メール本文
  const createSendMailResultBody = (
    sendMailSuccesses: string[],
    sendMailFails: (Error | null)[],
    sendMailTotalCount: number,
  ) => {
    // 配送状況更新成功件数メッセージ
    const sendMailSuccessBody = `メール送信成功件数:${sendMailSuccesses.length}/${sendMailTotalCount}`;
    const sendMailFailedCountBody = `メール送信失敗件数:${sendMailFails.length}/${sendMailTotalCount}`;
    const sendMailFailedBody = `メール送信エラー:\n${sendMailFails.join('\n')}\n${sendMailFailedCountBody}`;
    // 配送状況更新が失敗していればエラーメッセージを出力
    return sendMailFails.length === 0 ? sendMailSuccessBody : `${sendMailSuccessBody}\n${sendMailFailedBody}`;
  };

  return { sendMail, sendDeliverySingleOrderMail, sendDeliverySubscriptionOrderMail, createSendMailResultBody };
};
