import { generateSubscriptionOrderListMock } from 'mocks/subscription-order-list.mock';
import { filterNonShippingSubscriptionOrderThisMonth } from './is-shipping-all-subscription-order-this-month';

describe('filterNonShippingSubscriptionOrderThisMonth', () => {
  // 配送日時配列がnull、もしくはundefinedならばfilterされず全件返す
  test('Returns all objects for an empty array list', () => {
    const now = new Date('2023/01/01 00:00');
    const lastDeliveredAtList = [null, undefined, null];
    const mocks = generateSubscriptionOrderListMock(lastDeliveredAtList.length).map((mock, index) => {
      return { ...mock, lastDeliveredAt: lastDeliveredAtList[index] };
    });
    const nonShippedOrder = filterNonShippingSubscriptionOrderThisMonth(mocks, now);
    expect(nonShippedOrder).toHaveLength(mocks.length);
  });

  // 全て配送日時配列が当月と同じ配送年月ならば全件filterされ0件返す
  test('Returns an empty object if current time and ship date are in the same month', () => {
    const now = new Date('2023/01/01 00:00');
    // 配列の値はDBから取得するUTC時刻を想定。GMT+9のJSTを考慮する為、判定する-9の時刻をセット
    const lastDeliveredAtList = ['2022-12-31T15:00:00.000Z', '2023-01-15T03:00:00.000Z', '2023-01-31T14:59:59.000Z'];
    // 実際テストされるのは以下の値
    // 2023/01/01 00:00:00, 2023/01/15 12:00:00, 2023/01/01 23:59:59
    const mocks = generateSubscriptionOrderListMock(lastDeliveredAtList.length).map((mock, index) => {
      return { ...mock, lastDeliveredAt: lastDeliveredAtList[index] };
    });
    const nonShippedOrder = filterNonShippingSubscriptionOrderThisMonth(mocks, now);
    expect(nonShippedOrder).toHaveLength(0);
  });

  // 配送日時配列に一つでもnullかundefinedの配送年月があればfilterされた定期便注文を返す
  test('Returns filtered objects if the current time and at least one null or undefined are in the same month', () => {
    const now = new Date('2023/01/01 00:00');
    // 配列の値はDBから取得するUTC時刻を想定。GMT+9のJSTを考慮する為、判定する-9の時刻をセット
    const lastDeliveredAtList = ['2022-12-31T15:00:00.000Z', null, undefined];
    // 実際テストされるのは以下の値
    // 2023/01/01 00:00:00, null, undefined
    const mocks = generateSubscriptionOrderListMock(lastDeliveredAtList.length).map((mock, index) => {
      return { ...mock, lastDeliveredAt: lastDeliveredAtList[index] };
    });
    const nonShippedOrder = filterNonShippingSubscriptionOrderThisMonth(mocks, now);
    expect(nonShippedOrder).toHaveLength(2);
    expect(nonShippedOrder[0].lastDeliveredAt).toBe(null);
    expect(nonShippedOrder[1].lastDeliveredAt).toBe(undefined);
  });

  // 配送日時配列に一つも当月の配送年月が無ければfilterされず全件を返す
  test('Return all objects if the current time and ship date are different months', () => {
    const now = new Date('2023/01/01 00:00:00');
    // 配列の値はDBから取得するUTC時刻を想定。GMT+9のJSTを考慮する為、判定する-9の時刻をセット
    const lastDeliveredAtList = ['2022-12-31T14:59:59.000Z', '2023-01-31T15:00:00.000Z', '2023-12-31T15:00:00.000Z'];
    // 実際テストされるのは以下の値
    // 2022/12/31 23:59:59, 2023/02/01 00:00:00, 2024/01/01 00:00:00
    const mocks = generateSubscriptionOrderListMock(lastDeliveredAtList.length).map((mock, index) => {
      return { ...mock, lastDeliveredAt: lastDeliveredAtList[index] };
    });
    const nonShippedOrder = filterNonShippingSubscriptionOrderThisMonth(mocks, now);
    expect(nonShippedOrder).toHaveLength(3);
    expect(nonShippedOrder[0].lastDeliveredAt).toBe('2022-12-31T14:59:59.000Z');
    expect(nonShippedOrder[1].lastDeliveredAt).toBe('2023-01-31T15:00:00.000Z');
    expect(nonShippedOrder[2].lastDeliveredAt).toBe('2023-12-31T15:00:00.000Z');
  });
});
