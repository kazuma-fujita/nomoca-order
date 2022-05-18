import { isFilterWithDeliveryMonth } from './is-filter-with-delivery-month';

describe('isFilterWithDeliveryMonth', () => {
  describe('A delivery date is same a current date.', () => {
    test('searchStartYear = 2023, searchStartMonth = 1, deliveryStartYear = 2023, deliveryStartMonth = 1, deliveryInterval = 1, nowYear = 2023, nowMonth = 1', () => {
      const result = isFilterWithDeliveryMonth(2023, 1, 2023, 1, 1, 2023, 1);
      expect(result).toBeTruthy();
    });

    test('searchStartYear = 2023, searchStartMonth = 6, deliveryStartYear = 2023, deliveryStartMonth = 6, deliveryInterval = 6, nowYear = 2023, nowMonth = 6', () => {
      const result = isFilterWithDeliveryMonth(2023, 6, 2023, 6, 6, 2023, 6);
      expect(result).toBeTruthy();
    });

    test('searchStartYear = 2023, searchStartMonth = 12, deliveryStartYear = 2023, deliveryStartMonth = 12, deliveryInterval = 12, nowYear = 2023, nowMonth = 12', () => {
      const result = isFilterWithDeliveryMonth(2023, 12, 2023, 12, 12, 2023, 12);
      expect(result).toBeTruthy();
    });
  });

  describe('A delivery date is bigger than a current date.', () => {
    test('searchStartYear = 2023, searchStartMonth = 1, deliveryStartYear = 2023, deliveryStartMonth = 1, deliveryInterval = 1, nowYear = 2022, nowMonth = 1', () => {
      const result = isFilterWithDeliveryMonth(2023, 1, 2023, 1, 1, 2022, 1);
      expect(result).toBeTruthy();
    });

    test('searchStartYear = 2023, searchStartMonth = 3, deliveryStartYear = 2023, deliveryStartMonth = 3, deliveryInterval = 3, nowYear = 2022, nowMonth = 12', () => {
      const result = isFilterWithDeliveryMonth(2023, 3, 2023, 3, 3, 2022, 12);
      expect(result).toBeTruthy();
    });

    test('searchStartYear = 2023, searchStartMonth = 6, deliveryStartYear = 2023, deliveryStartMonth = 6, deliveryInterval = 6, nowYear = 2023, nowMonth = 5', () => {
      const result = isFilterWithDeliveryMonth(2023, 6, 2023, 6, 6, 2023, 5);
      expect(result).toBeTruthy();
    });

    test('searchStartYear = 2023, searchStartMonth = 12, deliveryStartYear = 2023, deliveryStartMonth = 12, deliveryInterval = 12, nowYear = 2023, nowMonth = 1', () => {
      const result = isFilterWithDeliveryMonth(2023, 12, 2023, 12, 12, 2023, 1);
      expect(result).toBeTruthy();
    });
  });

  describe('A current date is bigger than a delivery start date.', () => {
    test('searchStartYear = 2023, searchStartMonth = 1, deliveryStartYear = 2022, deliveryStartMonth = 1, deliveryInterval = 1, nowYear = 2023, nowMonth = 1', () => {
      const result = isFilterWithDeliveryMonth(2023, 1, 2022, 1, 1, 2023, 1);
      expect(result).toBeTruthy();
    });

    test('searchStartYear = 2023, searchStartMonth = 12, deliveryStartYear = 2022, deliveryStartMonth = 12, deliveryInterval = 12, nowYear = 2023, nowMonth = 1', () => {
      const result = isFilterWithDeliveryMonth(2023, 12, 2022, 12, 12, 2023, 1);
      expect(result).toBeTruthy();
    });

    test('searchStartYear = 2023, searchStartMonth = 6, deliveryStartYear = 2022, deliveryStartMonth = 6, deliveryInterval = 6, nowYear = 2023, nowMonth = 1', () => {
      const result = isFilterWithDeliveryMonth(2023, 6, 2022, 6, 6, 2023, 1);
      expect(result).toBeTruthy();
    });

    test('searchStartYear = 2023, searchStartMonth = 6, deliveryStartYear = 2022, deliveryStartMonth = 3, deliveryInterval = 3, nowYear = 2023, nowMonth = 4', () => {
      const result = isFilterWithDeliveryMonth(2023, 6, 2022, 3, 3, 2023, 4);
      expect(result).toBeTruthy();
    });

    test('searchStartYear = 2023, searchStartMonth = 1, deliveryStartYear = 2022, deliveryStartMonth = 12, deliveryInterval = 1, nowYear = 2023, nowMonth = 1', () => {
      const result = isFilterWithDeliveryMonth(2023, 1, 2022, 12, 1, 2023, 1);
      expect(result).toBeTruthy();
    });

    test('searchStartYear = 2023, searchStartMonth = 2, deliveryStartYear = 2022, deliveryStartMonth = 12, deliveryInterval = 2, nowYear = 2023, nowMonth = 1', () => {
      const result = isFilterWithDeliveryMonth(2023, 2, 2022, 12, 2, 2023, 1);
      expect(result).toBeTruthy();
    });

    test('searchStartYear = 2023, searchStartMonth = 3, deliveryStartYear = 2022, deliveryStartMonth = 12, deliveryInterval = 3, nowYear = 2023, nowMonth = 1', () => {
      const result = isFilterWithDeliveryMonth(2023, 3, 2022, 12, 3, 2023, 1);
      expect(result).toBeTruthy();
    });
  });

  describe('It inputs an out of range date.', () => {
    test('searchStartYear = 2023, searchStartMonth = 13, deliveryStartYear = 2022, deliveryStartMonth = 12, deliveryInterval = 3, nowYear = 2023, nowMonth = 1', () => {
      const result = isFilterWithDeliveryMonth(2023, 13, 2022, 12, 3, 2023, 1);
      expect(result).toBeFalsy();
    });

    test('searchStartYear = 2023, searchStartMonth = 3, deliveryStartYear = 2022, deliveryStartMonth = 13, deliveryInterval = 3, nowYear = 2023, nowMonth = 1', () => {
      const result = isFilterWithDeliveryMonth(2023, 3, 2022, 13, 3, 2023, 1);
      expect(result).toBeFalsy();
    });

    test('searchStartYear = 2023, searchStartMonth = 3, deliveryStartYear = 2022, deliveryStartMonth = 12, deliveryInterval = 13, nowYear = 2023, nowMonth = 1', () => {
      const result = isFilterWithDeliveryMonth(2023, 3, 2022, 12, 13, 2023, 1);
      expect(result).toBeFalsy();
    });

    test('searchStartYear = 2023, searchStartMonth = 0, deliveryStartYear = 2022, deliveryStartMonth = 12, deliveryInterval = 3, nowYear = 2023, nowMonth = 1', () => {
      const result = isFilterWithDeliveryMonth(2023, 0, 2022, 12, 3, 2023, 1);
      expect(result).toBeFalsy();
    });

    test('searchStartYear = 2023, searchStartMonth = 3, deliveryStartYear = 2022, deliveryStartMonth = 0, deliveryInterval = 3, nowYear = 2023, nowMonth = 1', () => {
      const result = isFilterWithDeliveryMonth(2023, 3, 2022, 0, 3, 2023, 1);
      expect(result).toBeFalsy();
    });

    test('searchStartYear = 2023, searchStartMonth = 3, deliveryStartYear = 2022, deliveryStartMonth = 12, deliveryInterval = 0, nowYear = 2023, nowMonth = 1', () => {
      const result = isFilterWithDeliveryMonth(2023, 3, 2022, 12, 0, 2023, 1);
      expect(result).toBeFalsy();
    });
  });
});
