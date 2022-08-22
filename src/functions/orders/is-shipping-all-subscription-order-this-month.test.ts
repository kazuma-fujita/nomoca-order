import { isShippingAllSubscriptionOrderThisMonthByLastDeliveredAtList } from './is-shipping-all-subscription-order-this-month';

describe('isShippingAllSubscriptionOrderThisMonthByLastDeliveredAtList', () => {
  // 配送日時配列がnull、もしくはundefinedならばfalseを返す
  test('Returns false for an empty array list', () => {
    const now = new Date('2023/01/01 00:00');
    const lastDeliveredAtList = [null, undefined, null];
    const isShippingOrder = isShippingAllSubscriptionOrderThisMonthByLastDeliveredAtList(lastDeliveredAtList, now);
    expect(isShippingOrder).toBeFalsy();
  });

  // 配送日時配列に当月と同じ配送年月があればtrueを返す
  test('Returns true if current time and ship date are in the same month', () => {
    const now = new Date('2023/01/01 00:00');
    // 配列の値はDBから取得するUTC時刻を想定。GMT+9のJSTを考慮する為、判定する-9の時刻をセット
    const lastDeliveredAtList = ['2022-12-31T15:00:00.000Z', '2023-01-15T03:00:00.000Z', '2023-01-31T14:59:59.000Z'];
    // 実際テストされるのは以下の値
    // 2023/01/01 00:00:00, 2023/01/15 12:00:00, 2023/01/01 23:59:59
    const isShippingOrder = isShippingAllSubscriptionOrderThisMonthByLastDeliveredAtList(lastDeliveredAtList, now);
    expect(isShippingOrder).toBeTruthy();
  });

  // 配送日時配列に一つでもnullかundefinedの配送年月があればfalseを返す
  test('Returns false if the current time and at least one null or undefined are in the same month', () => {
    const now = new Date('2023/01/01 00:00');
    // 配列の値はDBから取得するUTC時刻を想定。GMT+9のJSTを考慮する為、判定する-9の時刻をセット
    const lastDeliveredAtList = ['2022-12-31T15:00:00.000Z', null, undefined];
    // 実際テストされるのは以下の値
    // 2023/01/01 00:00:00, null, undefined
    const isShippingOrder = isShippingAllSubscriptionOrderThisMonthByLastDeliveredAtList(lastDeliveredAtList, now);
    expect(isShippingOrder).toBeFalsy();
  });

  // 配送日時配列に一つも当月の配送年月が無ければfalseを返す
  test('Return false if the current time and ship date are different months', () => {
    const now = new Date('2023/01/01 00:00:00');
    // 配列の値はDBから取得するUTC時刻を想定。GMT+9のJSTを考慮する為、判定する-9の時刻をセット
    const lastDeliveredAtList = ['2022-12-31T14:59:59.000Z', '2023-01-31T15:00:00.000Z', '2023-12-31T15:00:00.000Z'];
    // 実際テストされるのは以下の値
    // 2022/12/31 23:59:59, 2023/02/01 00:00:00, 2024/01/01 00:00:00
    const isShippingOrder = isShippingAllSubscriptionOrderThisMonthByLastDeliveredAtList(lastDeliveredAtList, now);
    expect(isShippingOrder).toBeFalsy();
  });
});
