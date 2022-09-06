import { Order, SubscriptionOrder } from 'API';
import { CorporateInformation } from 'constants/corporate-information';
import { DateFormat } from 'constants/date-format';
import { format } from 'date-fns';
import { calcTotalFromPriceAndQuantity } from 'functions/orders/calc-total-taxes-subtotal';
import iconv from 'iconv-lite';
import { useCallback, useState } from 'react';
import { useNowDate } from 'stores/use-now-date';
import { parseResponseError } from 'utilities/parse-response-error';
import { ExtendedOrder, NormalizedProduct } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { escapeDoubleQuotesForCSV } from 'functions/strings/converters';
import { OrderFeeLabel } from 'functions/orders/add-delivery-fee-and-express-fee-to-product-list';

const header = {
  id: '"オーダー番号"',
  empty1: '',
  empty2: '',
  orderedAt: '"オーダー日"',
  empty3: '',
  empty4: '',
  empty5: '',
  empty6: '',
  productName: '"アイテム名"',
  empty7: '',
  empty8: '',
  empty9: '',
  quantity: '"個数"',
  subtotal: '"小計"',
  deliveryFee: '"配送料"',
  empty10: '',
  empty11: '',
  empty12: '',
  empty13: '',
  empty14: '',
  empty15: '',
  empty16: '',
  empty17: '',
  empty18: '',
  empty19: '',
  total: '"合計"',
  tax: '"内消費税"',
  empty20: '',
  empty21: '',
  empty22: '',
  empty23: '',
  empty24: '',
  empty25: '',
  toLastName: '"氏(配送先)"',
  toFirstName: '"名(配送先)"',
  toPostalCode: '"郵便番号(配送先)"',
  toPref: '"都道府県(配送先)"',
  toAddress: '"住所(配送先)"',
  toPhoneNumber: '"電話番号(配送先)"',
  empty26: '',
  empty27: '',
  fromLastName: '"氏(請求先)"',
  fromFirstName: '"名(請求先)"',
  fromPostalCode: '"郵便番号(請求先)"',
  fromPref: '"都道府県(請求先)"',
  fromAddress: '"住所(請求先)"',
  fromPhoneNumber: '"電話番号(請求先)"',
  empty28: '',
  toCompanyName: '"法人名(配送先)"',
  fromCompanyName: '"法人名(請求先)"',
  empty29: '',
};

const createRecord = (order: ExtendedOrder<SubscriptionOrder | Order>, product: NormalizedProduct, now: Date) => {
  //  purchasePriceは仕入れ値。新世紀に支払いする金額でCSVに出力する金額
  const { total, taxes, subtotal } = calcTotalFromPriceAndQuantity(product.purchasePrice, product.quantity);
  return {
    id: `"${order.id}"`,
    empty1: '',
    empty2: '',
    orderedAt: `"${format(now, DateFormat.date)}"`,
    empty3: '',
    empty4: '',
    empty5: '',
    empty6: '',
    productName: `"${escapeDoubleQuotesForCSV(product.name)}"`,
    empty7: '',
    empty8: '',
    empty9: '',
    quantity: product.quantity,
    subtotal: subtotal,
    deliveryFee: 0,
    empty10: '',
    empty11: '',
    empty12: '',
    empty13: '',
    empty14: '',
    empty15: '',
    empty16: '',
    empty17: '',
    empty18: '',
    empty19: '',
    total: total,
    tax: taxes,
    empty20: '',
    empty21: '',
    empty22: '',
    empty23: '',
    empty24: '',
    empty25: '',
    toLastName: '',
    toFirstName: '',
    toPostalCode: `"${order.clinic.postalCode}"`,
    toPref: `"${order.clinic.state}"`,
    toAddress: `"${escapeDoubleQuotesForCSV(`${order.clinic.city}${order.clinic.address} ${order.clinic.building}`)}"`,
    toPhoneNumber: `"${order.clinic.phoneNumber}"`,
    empty26: '',
    empty27: '',
    fromLastName: '',
    fromFirstName: '',
    fromPostalCode: `"${CorporateInformation.postalCode}"`,
    fromPref: `"${CorporateInformation.state}"`,
    fromAddress: `"${CorporateInformation.address}"`,
    fromPhoneNumber: `"${CorporateInformation.exportCSVphoneNumber}"`,
    empty28: '',
    toCompanyName: `"${escapeDoubleQuotesForCSV(order.clinic.name)}"`,
    fromCompanyName: `"${CorporateInformation.name}"`,
    empty29: '',
  };
};

export const useExportOrderCSV = () => {
  const { data: now } = useNowDate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const exportCSV = async (orders: ExtendedOrder<SubscriptionOrder | Order>[]) => {
    setIsLoading(true);
    try {
      if (!now) {
        throw Error('A current date is not found.');
      }

      if (orders.length === 0) {
        // throw Error('It is empty that an ID list which export a csv file.');
        return;
      }

      // ordersに紐づくproduct配列をflatMapで1次元配列に加工しCSV行のobjectを生成
      // isExportCSV=trueの商品のみcsv行に追加
      // 1orderに複数productが存在する場合、productの数分のcsv行objectを生成する
      const records = orders.flatMap((order: ExtendedOrder<SubscriptionOrder | Order>) =>
        order.normalizedProducts
          .filter((product: NormalizedProduct) => product.isExportCSV)
          .map((product: NormalizedProduct) => createRecord(order, product, now)),
      );

      // CSVヘッダーと1次元配列化されたobject配列を結合後、object配列の値のみをObject.valuesで抜き出し配列化。
      // 次にjoinでカンマ区切りのCSV行として文字列へ変換しmapで配列化。
      // 最後にjoinで文字列配列をwindows改行コード区切りにし文字列化。
      const outputUTF8 = [header, ...records].map((object) => Object.values(object).join(',')).join('\r\n');
      // UTF8 to Shift_JIS
      const outputSJIS = iconv.encode(outputUTF8, 'Shift_JIS');
      const blob = new Blob([outputSJIS], { type: 'application/octet-binary' });
      // aタグ生成
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `order_${format(now, DateFormat.simpleDateHourMinute)}.csv`;
      a.click();
      a.remove();

      setIsLoading(false);
      setError(null);

      // recordsは出力したcsvデータを保持。医院名、商品名等を取得
      const outputCSVProducts = records
        .map((r) => `${r.toCompanyName}  ${r.productName}  個数${r.quantity}  小計${r.subtotal}円  合計${r.total}円`)
        .join('\n');
      const outputCSVCount = `CSV出力件数:${records.length}件`;
      const outPutCSVDescription = '※ 小計は仕入れ値 x 個数';
      // CSV出力設定の商品では無い、かつ速達配送料、配送手数料ではない商品リスト作成
      const nonOutputCSVProducts = orders.flatMap((order: ExtendedOrder<SubscriptionOrder | Order>) =>
        order.normalizedProducts
          .filter(
            (product: NormalizedProduct) =>
              !product.isExportCSV &&
              product.name !== OrderFeeLabel.deliveryFee &&
              product.name !== OrderFeeLabel.expressFee,
          )
          .map(
            (product: NormalizedProduct) =>
              `${order.clinic.name}  ${product.name}  仕入れ値${product.purchasePrice}円  個数${product.quantity}`,
          ),
      );
      // 商品管理画面でCSV出力無効商品一覧メッセージを出力
      const nonOutputCSVProductsMessage =
        nonOutputCSVProducts.length > 0
          ? `注文にCSV出力設定無効商品が含まれています。個別に発送してください。\n${nonOutputCSVProducts.join('\n')}`
          : '';
      // CSV出力結果メッセージ
      const outputCSVCountMessage = `${outputCSVProducts}\n${outPutCSVDescription}\n${outputCSVCount}\n\n${nonOutputCSVProductsMessage}`;
      return outputCSVCountMessage;
    } catch (error) {
      setIsLoading(false);
      const parsedError = parseResponseError(error);
      setError(parsedError);
      throw parsedError;
    }
  };

  const resetState = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return { exportCSV, isLoading, error, resetState };
};
