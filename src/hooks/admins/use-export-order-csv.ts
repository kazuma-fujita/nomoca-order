import { Order, SubscriptionOrder } from 'API';
import { CorporateInformation } from 'constants/corporate-information';
import { DateFormat } from 'constants/date-format';
import { taxRate } from 'constants/tax-rate';
import { format } from 'date-fns';
import { OrderFeeLabel } from 'functions/orders/add-delivery-fee-and-express-fee-to-product-list';
import { escapeDoubleQuotesForCSV } from 'functions/strings/converters';
import { ExtendedOrder, NormalizedProduct } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import iconv from 'iconv-lite';
import { useCallback, useState } from 'react';
import { useNowDate } from 'stores/use-now-date';
import { parseResponseError } from 'utilities/parse-response-error';

const header = {
  flag: '"処理フラグ"', // 固定値n
  id: '"受注まとめコード"', // order.IDのハイフンを削除したフォーマット。isBCartSeparateDeliveryRouteがtrueの場合独自UUIDを発行しセット
  empty1: '"受注番号"',
  bCartId: '"Bカート会員ID"', // 固定値10024
  empty2: '"貴社独自会員ID"',
  empty3: '"配送先ID"',
  fromStaff: '"担当者"',
  fromCompanyName: '"会社名"',
  fromCompanyDepartment: '"部署名"',
  fromPhoneNumber: '"電話番号"',
  empty4: '"携帯番号"',
  fromMailAddress: '"メールアドレス"',
  fromPostalCode: '"郵便番号"',
  fromPref: '"都道府県"',
  fromAddress1: '"市区町村"',
  fromAddress2: '"町域・番地"',
  fromBuilding: '"ビル建物名など"',
  empty5: '"出荷分納コード"',
  toCompanyName: '"配送先 会社名"', // 法人名 + 医院名
  empty6: '"配送先 部署名"',
  toStaff: '"配送先 担当者"',
  toPostalCode: '"配送先 郵便番号"', // ハイフン無しフォーマットでOK
  toPref: '"配送先 都道府県"',
  toAddress1: '"配送先 住所1"', // 市区町村町域迄
  toAddress2: '"配送先 住所2"', // 番地
  toAddress3: '"配送先 住所3"', // ビル・建物名
  toPhoneNumber: '"配送先 電話番号"', // ハイフン無しフォーマットでOK
  deliveryFee: '"送料"', // 固定値0
  empty7: '"決済手数料"',
  empty8: '"ポイント利用"',
  empty9: '"ポイント獲得"',
  paymentMethod: '"決済方法"', // 固定値 銀行振込
  empty10: '"決済確認日"',
  empty11: '"お支払い方法"',
  empty12: '"カスタム項目2"',
  empty13: '"カスタム項目3"',
  empty14: '"連絡事項"',
  empty15: '"メモ"',
  empty16: '"お客様への連絡事項"',
  empty17: '"受注日時"',
  status: '"対応状況"', // 固定値 新規注文
  deliveryGroup: '"配送グループ"',
  empty18: '"Bカート発送ID"',
  empty19: '"配送希望日"',
  empty20: '"配送希望時間"',
  empty21: '"送り状番号"',
  empty22: '"発送日"',
  empty23: '"納品日"',
  empty24: '"出荷管理番号"',
  empty25: '"発送状況"',
  empty26: '"発送メモ"',
  empty27: '"商品管理番号"',
  productName: '"商品名"', // 高保存ロール紙＜'G社販売単価'＞
  setId: '"BカートセットID"',
  productSetName: '"セット名"', // 商品マスターに登録されている商品名
  empty28: '"品番"',
  empty29: '"JANコード"',
  empty30: '"ロケーション"',
  empty31: '"配送サイズ"',
  empty32: '"商品カスタム項目名1"',
  empty33: '"商品カスタム項目名2"',
  empty34: '"商品カスタム項目名3"',
  empty35: '"セットカスタム項目名1"',
  empty36: '"セットカスタム項目名2"',
  empty37: '"セットカスタム項目名3"',
  empty38: '"商品オプション"',
  purchasePrice: '"単価"', // 仕入れ値
  lotSize: '"入数"', // 固定値 1
  unit: '"単位"', // 固定値 箱
  quantity: '"受注数"',
  taxRate: '"税率"', // 固定値 10
  taxClass: '"税区分"', // 固定値 1
};

const createRecord = (order: ExtendedOrder<SubscriptionOrder | Order>, product: NormalizedProduct) => {
  return {
    flag: '"n"',
    id: createBCartUniqueId(order.id, product.isBCartSeparateDeliveryRoute), // ID (e5e44bcf-26ac-465f-b42b-7f6ba4602065) に含まれているハイフンを除外
    empty1: '',
    bCartId: 10024,
    empty2: '',
    empty3: '',
    fromStaff: `"${CorporateInformation.staff}"`,
    fromCompanyName: `"${CorporateInformation.name}"`,
    fromCompanyDepartment: `"${CorporateInformation.department}"`,
    fromPhoneNumber: `"${CorporateInformation.phoneNumber}"`,
    empty4: '',
    fromMailAddress: `"${CorporateInformation.mailAddress}"`,
    fromPostalCode: `"${CorporateInformation.postalCode}"`,
    fromPref: `"${CorporateInformation.state}"`,
    fromAddress1: `"${CorporateInformation.address1}"`,
    fromAddress2: `"${CorporateInformation.address2}"`,
    fromBuilding: `"${CorporateInformation.building}"`,
    empty5: '',
    toCompanyName: `"${escapeDoubleQuotesForCSV(order.clinic.name)}"`,
    empty6: '',
    toStaff: `"${order.staff.lastName} ${order.staff.firstName}"`,
    toPostalCode: `"${order.clinic.postalCode}"`,
    toPref: `"${order.clinic.state}"`,
    toAddress1: `"${escapeDoubleQuotesForCSV(order.clinic.city)}"`,
    toAddress2: `"${escapeDoubleQuotesForCSV(order.clinic.address)}"`,
    toAddress3: order.clinic.building ? `"${escapeDoubleQuotesForCSV(order.clinic.building)}"` : '',
    toPhoneNumber: `"${order.clinic.phoneNumber}"`,
    deliveryFee: 0,
    empty7: '',
    empty8: '',
    empty9: '',
    paymentMethod: '"銀行振込"',
    empty10: '',
    empty11: '',
    empty12: '',
    empty13: '',
    empty14: '',
    empty15: '',
    empty16: '',
    empty17: '',
    status: '"新規注文"',
    deliveryGroup: product.bCartDeliveryGroupId,
    empty18: '',
    empty19: '',
    empty20: '',
    empty21: '',
    empty22: '',
    empty23: '',
    empty24: '',
    empty25: '',
    empty26: '',
    empty27: '',
    productName: `"高保存ロール紙＜${product.unitPrice.toLocaleString()}＞"`, // 高保存ロール紙＜'G社販売単価'＞
    setId: product.bCartSetId,
    productSetName: `"${escapeDoubleQuotesForCSV(product.name)}"`,
    empty28: '',
    empty29: '',
    empty30: '',
    empty31: '',
    empty32: '',
    empty33: '',
    empty34: '',
    empty35: '',
    empty36: '',
    empty37: '',
    empty38: '',
    purchasePrice: product.purchasePrice,
    lotSize: 1,
    unit: '"箱"',
    quantity: product.quantity,
    taxRate: taxRate * 100, // 固定値10
    taxClass: 1,
  };
};

const createBCartUniqueId = (orderId: string, isBCartSeparateDeliveryRoute?: boolean | null): string => {
  // 別配送経路フラグがTrueの場合独自uuidを生成
  const uuid = isBCartSeparateDeliveryRoute ? crypto.randomUUID() : orderId;
  return `"${uuid.replace(/-/g, '')}"`; // ID (e5e44bcf-26ac-465f-b42b-7f6ba4602065) に含まれているハイフンを除外;
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
          .map((product: NormalizedProduct) => createRecord(order, product)),
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
        .map(
          (r) =>
            `${r.toCompanyName}  ${r.productSetName}  ${r.productName}  個数${r.quantity}  仕入れ値(税抜)${r.purchasePrice}円`,
        )
        .join('\n');
      const outputCSVCount = `CSV出力件数:${records.length}件`;
      const outPutCSVDescription = '※ 高保存ロール紙<>括弧内は販売単価(税抜)';
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
      const outputCSVCountMessage = `${outputCSVProducts}\n${outPutCSVDescription}\n${outputCSVCount}\n\n${nonOutputCSVProductsMessage}\n\n`;
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
