import { generateNextDeliveryMonth } from './generate-next-delivery-months';

describe('generateNextDeliveryMonths', () => {
  test('startMonth = 1, interval = 1, nowYear = 2021, nowMonth = 1', () => {
    const startMonth = 1;
    const interval = 1;
    const nowYear = 2021;
    const nowMonth = 1;
    // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    const results = generateNextDeliveryMonth(startMonth, interval, nowYear, nowMonth);
    expect(results).toEqual('2021/1月');
  });

  test('startMonth = 1, interval = 1, nowYear = 2021, nowMonth = 6', () => {
    const startMonth = 1;
    const interval = 1;
    const nowYear = 2021;
    const nowMonth = 6;
    // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    const results = generateNextDeliveryMonth(startMonth, interval, nowYear, nowMonth);
    expect(results).toEqual('2021/6月');
  });

  test('startMonth = 1, interval = 1, nowYear = 2021, nowMonth = 12', () => {
    const startMonth = 1;
    const interval = 1;
    const nowYear = 2021;
    const nowMonth = 12;
    // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    const results = generateNextDeliveryMonth(startMonth, interval, nowYear, nowMonth);
    expect(results).toEqual('2021/12月');
  });

  test('startMonth = 1, interval = 2, nowYear = 2021, nowMonth = 1', () => {
    const startMonth = 1;
    const interval = 2;
    const nowYear = 2021;
    const nowMonth = 1;
    // [1, 3, 5, 7, 9, 11]
    const results = generateNextDeliveryMonth(startMonth, interval, nowYear, nowMonth);
    expect(results).toEqual('2021/1月');
  });

  test('startMonth = 1, interval = 2, nowYear = 2021, nowMonth = 2', () => {
    const startMonth = 1;
    const interval = 2;
    const nowYear = 2021;
    const nowMonth = 2;
    // [1, 3, 5, 7, 9, 11]
    const results = generateNextDeliveryMonth(startMonth, interval, nowYear, nowMonth);
    expect(results).toEqual('2021/3月');
  });

  test('startMonth = 1, interval = 2, nowYear = 2021, nowMonth = 6', () => {
    const startMonth = 1;
    const interval = 2;
    const nowYear = 2021;
    const nowMonth = 6;
    // [1, 3, 5, 7, 9, 11]
    const results = generateNextDeliveryMonth(startMonth, interval, nowYear, nowMonth);
    expect(results).toEqual('2021/7月');
  });

  test('startMonth = 1, interval = 2, nowYear = 2021, nowMonth = 12', () => {
    const startMonth = 1;
    const interval = 2;
    const nowYear = 2021;
    const nowMonth = 12;
    // [1, 3, 5, 7, 9, 11]
    const results = generateNextDeliveryMonth(startMonth, interval, nowYear, nowMonth);
    expect(results).toEqual('2022/1月');
  });

  test('startMonth = 6, interval = 3, nowYear = 2021, nowMonth = 1', () => {
    const startMonth = 6;
    const interval = 3;
    const nowYear = 2021;
    const nowMonth = 1;
    // [6, 9, 12, 3]
    const results = generateNextDeliveryMonth(startMonth, interval, nowYear, nowMonth);
    expect(results).toEqual('2021/3月');
  });

  test('startMonth = 6, interval = 3, nowYear = 2021, nowMonth = 6', () => {
    const startMonth = 6;
    const interval = 3;
    const nowYear = 2021;
    const nowMonth = 6;
    // [6, 9, 12, 3]
    const results = generateNextDeliveryMonth(startMonth, interval, nowYear, nowMonth);
    expect(results).toEqual('2021/6月');
  });

  test('startMonth = 6, interval = 3, nowYear = 2021, nowMonth = 11', () => {
    const startMonth = 6;
    const interval = 3;
    const nowYear = 2021;
    const nowMonth = 11;
    // [6, 9, 12, 3]
    const results = generateNextDeliveryMonth(startMonth, interval, nowYear, nowMonth);
    expect(results).toEqual('2021/12月');
  });

  test('startMonth = 1, interval = 6, nowYear = 2021, nowMonth = 7', () => {
    const startMonth = 1;
    const interval = 6;
    const nowYear = 2021;
    const nowMonth = 7;
    // [1, 7]
    const results = generateNextDeliveryMonth(startMonth, interval, nowYear, nowMonth);
    expect(results).toEqual('2021/7月');
  });

  test('startMonth = 1, interval = 6, nowYear = 2021, nowMonth = 8', () => {
    const startMonth = 1;
    const interval = 6;
    const nowYear = 2021;
    const nowMonth = 8;
    // [1, 7]
    const results = generateNextDeliveryMonth(startMonth, interval, nowYear, nowMonth);
    expect(results).toEqual('2022/1月');
  });

  test('startMonth = 12, interval = 12, nowYear = 2021, nowMonth = 1', () => {
    const startMonth = 12;
    const interval = 12;
    const nowYear = 2021;
    const nowMonth = 1;
    // [12]
    const results = generateNextDeliveryMonth(startMonth, interval, nowYear, nowMonth);
    expect(results).toEqual('2021/12月');
  });

  test('startMonth = 1, interval = 12, nowYear = 2021, nowMonth = 12', () => {
    const startMonth = 1;
    const interval = 12;
    const nowYear = 2021;
    const nowMonth = 12;
    // [1]
    const results = generateNextDeliveryMonth(startMonth, interval, nowYear, nowMonth);
    expect(results).toEqual('2022/1月');
  });
});
