import { SubscriptionOrder } from 'API';
import { ExtendedOrder } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { format, parseISO } from 'date-fns';

const formatYearMonth = 'yyyyMM';
const formatDateYearMonth = (date: Date): string => format(date, formatYearMonth);
const formatDateFromDateString = (dateString: string): string => format(parseISO(dateString), formatYearMonth);

export const isShippingSubscriptionOrderThisMonth = (orders: ExtendedOrder<SubscriptionOrder>[], now: Date) => {
  const lastDeliveredAtList = orders.map((order) => order.lastDeliveredAt);
  return isShippingSubscriptionOrderThisMonthByLastDeliveredAtList(lastDeliveredAtList, now);
};

// 単体テスト対象
export const isShippingSubscriptionOrderThisMonthByLastDeliveredAtList = (
  lastDeliveredAtList: (string | null | undefined)[],
  now: Date,
) => {
  console.log('date now object', new Date());
  console.log('offset', new Date().getTimezoneOffset());
  console.log('locale', new Date().toLocaleString());
  console.log('locale date', new Date().toLocaleDateString());
  console.log('now', now);
  console.log('formatted', format(now, 'yyyy/MM/dd HH:mm:ss'));
  // 現在時刻yyyyMM文字列
  const currentYearMonth = formatDateYearMonth(now);
  // 当月csv出力済(当月発送済)リスト生成
  const shippedOrders = lastDeliveredAtList.filter((lastDeliveredAt) => {
    // 一番最後に配送した日時記録が無ければ未発送 (過去に一度も発送していない)
    if (!lastDeliveredAt) {
      return false;
    }
    console.log('deliveredAt', lastDeliveredAt);
    console.log('deliveredAt formatted', format(parseISO(lastDeliveredAt), 'yyyy/MM/dd HH:mm:ss'));
    // 過去に配送日時記録があり、配送日時が当月だったら当月配送済み
    return formatDateFromDateString(lastDeliveredAt) === currentYearMonth;
  });
  // 当月csv出力済(発送済)リストが1件でもあればtrue
  return shippedOrders.length > 0;
};
