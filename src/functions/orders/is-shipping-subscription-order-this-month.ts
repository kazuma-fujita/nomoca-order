import { SubscriptionOrder } from 'API';
import { ExtendedOrder } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { format, parseISO } from 'date-fns';

const formatYearMonth = 'yyyyMM';
const formatDate = (date: Date): string => format(date, formatYearMonth);
const formatDateFromDateString = (dateString: string): string => format(parseISO(dateString), formatYearMonth);

export const isShippingSubscriptionOrderThisMonth = (orders: ExtendedOrder<SubscriptionOrder>[], now: Date) => {
  const currentYearMonth = formatDate(now);
  // 当月csv出力済(当月発送済)リスト生成
  const shippedOrders = orders.filter((order) => {
    // 一番最後に配送した日時記録が無ければ未発送 (過去に一度も発送していない)
    if (!order.lastDeliveredAt) {
      return false;
    }
    // 過去に配送日時記録があり、配送日時が当月だったら当月配送済み
    return formatDateFromDateString(order.lastDeliveredAt) === currentYearMonth;
  });
  // 当月csv出力済(発送済)リストが1件でもあればtrue
  return shippedOrders.length > 0;
};
