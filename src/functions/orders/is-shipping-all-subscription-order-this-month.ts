import { SubscriptionOrder } from 'API';
import { ExtendedOrder } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { format, parseISO } from 'date-fns';

const formatYearMonth = 'yyyyMM';
const formatDateYearMonth = (date: Date): string => format(date, formatYearMonth);
const formatDateFromDateString = (dateString: string): string => format(parseISO(dateString), formatYearMonth);

// 定期便注文リストから当月未配送の定期便注文をフィルタリング
export const filterNonShippingSubscriptionOrderThisMonth = (orders: ExtendedOrder<SubscriptionOrder>[], now: Date) => {
  // 現在時刻yyyyMM文字列
  const currentYearMonth = formatDateYearMonth(now);
  // 当月csv未出力(当月未発送)の定期便注文を抽出
  const shippedOrders = orders.filter(
    (order) => !isShippingSubscriptionOrderThisMonthByLastDeliveredAt(order.lastDeliveredAt, currentYearMonth),
  );
  return shippedOrders;
};

export const isShippingAllSubscriptionOrderThisMonth = (orders: ExtendedOrder<SubscriptionOrder>[], now: Date) => {
  const lastDeliveredAtList = orders.map((order) => order.lastDeliveredAt);
  return isShippingAllSubscriptionOrderThisMonthByLastDeliveredAtList(lastDeliveredAtList, now);
};

// 単体テスト対象
export const isShippingAllSubscriptionOrderThisMonthByLastDeliveredAtList = (
  lastDeliveredAtList: (string | null | undefined)[],
  now: Date,
) => {
  // 現在時刻yyyyMM文字列
  const currentYearMonth = formatDateYearMonth(now);
  // 当月csv出力済(当月発送済)リスト生成
  const shippedOrders = lastDeliveredAtList.filter((lastDeliveredAt) =>
    isShippingSubscriptionOrderThisMonthByLastDeliveredAt(lastDeliveredAt, currentYearMonth),
  );
  // 全ての当月配送予定注文がcsv出力済(発送済)だったらtrueを返却
  return shippedOrders.length === lastDeliveredAtList.length;
};

// 最後に配送した日時と現在年月から当月配送有無を判定
const isShippingSubscriptionOrderThisMonthByLastDeliveredAt = (
  lastDeliveredAt: string | null | undefined,
  currentYearMonth: string,
) => {
  // 一番最後に配送した日時記録が無ければ未発送 (過去に一度も発送していない)
  if (!lastDeliveredAt) {
    return false;
  }
  // 過去に配送日時記録があり、配送日時が当月だったら当月配送済み
  return formatDateFromDateString(lastDeliveredAt) === currentYearMonth;
};
