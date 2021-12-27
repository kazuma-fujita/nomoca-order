import { generateDeliveryMonths } from './generate-delivery-months';

export const generateNextDeliveryMonth = (
  deliveryStartYear: number,
  deliveryStartMonth: number,
  deliveryInterval: number,
  nowYear: number,
  nowMonth: number,
): string => {
  if (new Date(nowYear, nowMonth).getTime() <= new Date(deliveryStartYear, deliveryStartMonth).getTime()) {
    return `${deliveryStartYear}/${deliveryStartMonth}月`;
  }
  const months = generateDeliveryMonths(deliveryStartMonth, deliveryInterval);
  if (!months.length) {
    return '----/--';
  }
  // 配送月リストを数値の昇順でsort
  const sorted = [...months].sort((a, b) => a - b);
  // 現在月より大きい月のみ抽出
  const filtered = sorted.filter((current) => nowMonth <= current);
  // 抽出リストが有れば現在年と抽出リストの先頭の値を返却。リスト無ければ翌年の値とsortリストの先頭の値を返却
  return filtered.length > 0 ? `${nowYear}/${filtered[0]}月` : `${nowYear + 1}/${sorted[0]}月`;
};
