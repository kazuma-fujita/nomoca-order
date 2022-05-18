import { generateDeliveryMonths } from './generate-delivery-months';

type NextDeliveryYearMonth = {
  nextDeliveryYear: number;
  nextDeliveryMonth: number;
} | null;

export const generateNextDeliveryYearMonth = (
  deliveryStartYear: number,
  deliveryStartMonth: number,
  deliveryInterval: number,
  nowYear: number,
  nowMonth: number,
): NextDeliveryYearMonth => {
  if (new Date(nowYear, nowMonth).getTime() <= new Date(deliveryStartYear, deliveryStartMonth).getTime()) {
    return { nextDeliveryYear: deliveryStartYear, nextDeliveryMonth: deliveryStartMonth };
  }
  const months = generateDeliveryMonths(deliveryStartMonth, deliveryInterval);
  if (!months.length) {
    return null;
  }
  // 配送月リストを数値の昇順でsort
  const sorted = [...months].sort((a, b) => a - b);
  // 現在月より大きい月のみ抽出
  const filtered = sorted.filter((current) => nowMonth <= current);
  // 抽出リストが有れば現在年と抽出リストの先頭の値を返却。リスト無ければ翌年の値とsortリストの先頭の値を返却
  return filtered.length > 0
    ? { nextDeliveryYear: nowYear, nextDeliveryMonth: filtered[0] }
    : { nextDeliveryYear: nowYear + 1, nextDeliveryMonth: sorted[0] };
};

export const generateFormattedNextDeliveryYearMonth = (
  deliveryStartYear: number,
  deliveryStartMonth: number,
  deliveryInterval: number,
  nowYear: number,
  nowMonth: number,
): string => {
  const result = generateNextDeliveryYearMonth(
    deliveryStartYear,
    deliveryStartMonth,
    deliveryInterval,
    nowYear,
    nowMonth,
  );
  return result ? `${result.nextDeliveryYear}/${result.nextDeliveryMonth}月` : '----/--';
};
