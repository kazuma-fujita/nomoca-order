import { generateFormattedNextDeliveryYearMonth } from './generate-next-delivery-year-month';

describe('generateFormattedNextDeliveryYearMonth', () => {
  describe('A delivery start date is bigger than a current date.', () => {
    test('startYear = 2021, startMonth = 2, interval = 1, nowYear = 2021, nowMonth = 1', () => {
      const startYear = 2021;
      const startMonth = 2;
      const interval = 1;
      const nowYear = 2021;
      const nowMonth = 1;
      // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      const results = generateFormattedNextDeliveryYearMonth(startYear, startMonth, interval, nowYear, nowMonth);
      expect(results).toEqual('2021/2月');
    });

    test('startYear = 2021, startMonth = 3, interval = 2, nowYear = 2021, nowMonth = 1', () => {
      const startYear = 2021;
      const startMonth = 3;
      const interval = 2;
      const nowYear = 2021;
      const nowMonth = 1;
      // [1, 3, 5, 7, 9, 11]
      const results = generateFormattedNextDeliveryYearMonth(startYear, startMonth, interval, nowYear, nowMonth);
      expect(results).toEqual('2021/3月');
    });

    test('startYear = 2021, startMonth = 6, interval = 3, nowYear = 2021, nowMonth = 1', () => {
      const startYear = 2021;
      const startMonth = 6;
      const interval = 3;
      const nowYear = 2021;
      const nowMonth = 1;
      // [6, 9, 12, 3]
      const results = generateFormattedNextDeliveryYearMonth(startYear, startMonth, interval, nowYear, nowMonth);
      expect(results).toEqual('2021/6月');
    });

    test('startYear = 2021, startMonth = 7, interval = 6, nowYear = 2021, nowMonth = 1', () => {
      const startYear = 2021;
      const startMonth = 7;
      const interval = 6;
      const nowYear = 2021;
      const nowMonth = 1;
      // [1, 7]
      const results = generateFormattedNextDeliveryYearMonth(startYear, startMonth, interval, nowYear, nowMonth);
      expect(results).toEqual('2021/7月');
    });

    test('startYear = 2021, startMonth = 12, interval = 12, nowYear = 2021, nowMonth = 1', () => {
      const startYear = 2021;
      const startMonth = 12;
      const interval = 12;
      const nowYear = 2021;
      const nowMonth = 1;
      // [12]
      const results = generateFormattedNextDeliveryYearMonth(startYear, startMonth, interval, nowYear, nowMonth);
      expect(results).toEqual('2021/12月');
    });
  });

  describe('A current date is bigger than a delivery start date.', () => {
    // test('startYear = 2021, startMonth = 1, interval = 1, nowYear = 2021, nowMonth = 1', () => {
    //   const startYear = 2021;
    //   const startMonth = 1;
    //   const interval = 1;
    //   const nowYear = 2021;
    //   const nowMonth = 1;
    //   // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    //   const results = generateFormattedNextDeliveryYearMonth(startYear, startMonth, interval, nowYear, nowMonth);
    //   expect(results).toEqual('2021/1月');
    // });

    test('startYear = 2021, startMonth = 1, interval = 1, nowYear = 2021, nowMonth = 6', () => {
      const startYear = 2021;
      const startMonth = 1;
      const interval = 1;
      const nowYear = 2021;
      const nowMonth = 6;
      // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      const results = generateFormattedNextDeliveryYearMonth(startYear, startMonth, interval, nowYear, nowMonth);
      expect(results).toEqual('2021/6月');
    });

    test('startYear = 2021, startMonth = 1, interval = 1, nowYear = 2021, nowMonth = 12', () => {
      const startYear = 2021;
      const startMonth = 1;
      const interval = 1;
      const nowYear = 2021;
      const nowMonth = 12;
      // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      const results = generateFormattedNextDeliveryYearMonth(startYear, startMonth, interval, nowYear, nowMonth);
      expect(results).toEqual('2021/12月');
    });

    test('startYear = 2021, startMonth = 1, interval = 2, nowYear = 2021, nowMonth = 1', () => {
      const startYear = 2021;
      const startMonth = 1;
      const interval = 2;
      const nowYear = 2021;
      const nowMonth = 1;
      // [1, 3, 5, 7, 9, 11]
      const results = generateFormattedNextDeliveryYearMonth(startYear, startMonth, interval, nowYear, nowMonth);
      expect(results).toEqual('2021/1月');
    });

    test('startYear = 2021, startMonth = 1, interval = 2, nowYear = 2021, nowMonth = 2', () => {
      const startYear = 2021;
      const startMonth = 1;
      const interval = 2;
      const nowYear = 2021;
      const nowMonth = 2;
      // [1, 3, 5, 7, 9, 11]
      const results = generateFormattedNextDeliveryYearMonth(startYear, startMonth, interval, nowYear, nowMonth);
      expect(results).toEqual('2021/3月');
    });

    test('startYear = 2021, startMonth = 1, interval = 2, nowYear = 2021, nowMonth = 6', () => {
      const startYear = 2021;
      const startMonth = 1;
      const interval = 2;
      const nowYear = 2021;
      const nowMonth = 6;
      // [1, 3, 5, 7, 9, 11]
      const results = generateFormattedNextDeliveryYearMonth(startYear, startMonth, interval, nowYear, nowMonth);
      expect(results).toEqual('2021/7月');
    });

    test('startYear = 2021, startMonth = 1, interval = 2, nowYear = 2022, nowMonth = 12', () => {
      const startYear = 2021;
      const startMonth = 1;
      const interval = 2;
      const nowYear = 2021;
      const nowMonth = 12;
      // [1, 3, 5, 7, 9, 11]
      const results = generateFormattedNextDeliveryYearMonth(startYear, startMonth, interval, nowYear, nowMonth);
      expect(results).toEqual('2022/1月');
    });

    test('startYear = 2021, startMonth = 6, interval = 3, nowYear = 2022, nowMonth = 1', () => {
      const startYear = 2021;
      const startMonth = 6;
      const interval = 3;
      const nowYear = 2022;
      const nowMonth = 1;
      // [6, 9, 12, 3]
      const results = generateFormattedNextDeliveryYearMonth(startYear, startMonth, interval, nowYear, nowMonth);
      expect(results).toEqual('2022/3月');
    });

    test('startYear = 2021, startMonth = 6, interval = 3, nowYear = 2021, nowMonth = 6', () => {
      const startYear = 2021;
      const startMonth = 6;
      const interval = 3;
      const nowYear = 2021;
      const nowMonth = 6;
      // [6, 9, 12, 3]
      const results = generateFormattedNextDeliveryYearMonth(startYear, startMonth, interval, nowYear, nowMonth);
      expect(results).toEqual('2021/6月');
    });

    test('startYear = 2021, startMonth = 6, interval = 3, nowYear = 2021, nowMonth = 11', () => {
      const startYear = 2021;
      const startMonth = 6;
      const interval = 3;
      const nowYear = 2021;
      const nowMonth = 11;
      // [6, 9, 12, 3]
      const results = generateFormattedNextDeliveryYearMonth(startYear, startMonth, interval, nowYear, nowMonth);
      expect(results).toEqual('2021/12月');
    });

    test('startYear = 2021, startMonth = 1, interval = 6, nowYear = 2021, nowMonth = 7', () => {
      const startYear = 2021;
      const startMonth = 1;
      const interval = 6;
      const nowYear = 2021;
      const nowMonth = 7;
      // [1, 7]
      const results = generateFormattedNextDeliveryYearMonth(startYear, startMonth, interval, nowYear, nowMonth);
      expect(results).toEqual('2021/7月');
    });

    test('startYear = 2021, startMonth = 1, interval = 6, nowYear = 2021, nowMonth = 8', () => {
      const startYear = 2021;
      const startMonth = 1;
      const interval = 6;
      const nowYear = 2021;
      const nowMonth = 8;
      // [1, 7]
      const results = generateFormattedNextDeliveryYearMonth(startYear, startMonth, interval, nowYear, nowMonth);
      expect(results).toEqual('2022/1月');
    });

    test('startYear = 2021, startMonth = 12, interval = 12, nowYear = 2022, nowMonth = 1', () => {
      const startYear = 2021;
      const startMonth = 12;
      const interval = 12;
      const nowYear = 2022;
      const nowMonth = 1;
      // [12]
      const results = generateFormattedNextDeliveryYearMonth(startYear, startMonth, interval, nowYear, nowMonth);
      expect(results).toEqual('2022/12月');
    });

    test('startYear = 2021, startMonth = 1, interval = 12, nowYear = 2021, nowMonth = 12', () => {
      const startYear = 2021;
      const startMonth = 1;
      const interval = 12;
      const nowYear = 2021;
      const nowMonth = 12;
      // [1]
      const results = generateFormattedNextDeliveryYearMonth(startYear, startMonth, interval, nowYear, nowMonth);
      expect(results).toEqual('2022/1月');
    });
  });
});
