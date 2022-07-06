export type NextDeliveryYearMonth = {
  nextDeliveryYear: number;
  nextDeliveryMonth: number;
} | null;

export const minMonth = 1;
export const maxMonth = 12;

export const generateDeliveryMonths = (deliveryStartMonth: number, deliveryInterval: number): number[] => {
  if (
    deliveryStartMonth < minMonth ||
    maxMonth < deliveryStartMonth ||
    deliveryInterval < minMonth ||
    maxMonth < deliveryInterval
  ) {
    return [];
  }
  const addCount = Math.ceil(maxMonth / deliveryInterval);
  const months = Array.from({ length: addCount }, (_, i) => {
    const month = i * deliveryInterval + deliveryStartMonth;
    return maxMonth < month ? month - maxMonth : month;
  });
  return months;
};

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
    throw Error('The delivery start month and interval are an invalid value.');
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
