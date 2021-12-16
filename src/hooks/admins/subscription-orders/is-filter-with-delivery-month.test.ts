import { isFilterWithDeliveryMonth, generateDeliveryMonths } from './is-filter-with-delivery-month';

describe('isFilterWithDeliveryMonth', () => {
  test('deliveryMonth = 1, deliveryStartMonth = 1, deliveryInterval = 1', () => {
    const result = isFilterWithDeliveryMonth(1, 1, 1);
    expect(result).toBeTruthy();
  });

  test('deliveryMonth = 12, deliveryStartMonth = 12, deliveryInterval = 12', () => {
    const result = isFilterWithDeliveryMonth(12, 12, 12);
    expect(result).toBeTruthy();
  });

  test('deliveryMonth = 6, deliveryStartMonth = 6, deliveryInterval = 6', () => {
    const result = isFilterWithDeliveryMonth(6, 6, 6);
    expect(result).toBeTruthy();
  });

  test('deliveryMonth = 6, deliveryStartMonth = 3, deliveryInterval = 3', () => {
    const result = isFilterWithDeliveryMonth(6, 3, 3);
    expect(result).toBeTruthy();
  });

  test('deliveryMonth = 1, deliveryStartMonth = 12, deliveryInterval = 1', () => {
    const result = isFilterWithDeliveryMonth(1, 12, 1);
    expect(result).toBeTruthy();
  });

  test('deliveryMonth = 2, deliveryStartMonth = 12, deliveryInterval = 2', () => {
    const result = isFilterWithDeliveryMonth(2, 12, 2);
    expect(result).toBeTruthy();
  });

  test('deliveryMonth = 3, deliveryStartMonth = 12, deliveryInterval = 3', () => {
    const result = isFilterWithDeliveryMonth(3, 12, 3);
    expect(result).toBeTruthy();
  });

  test('deliveryMonth = 13, deliveryStartMonth = 1, deliveryInterval = 1', () => {
    const result = isFilterWithDeliveryMonth(13, 1, 1);
    expect(result).toBeFalsy();
  });

  test('deliveryMonth = 1, deliveryStartMonth = 13, deliveryInterval = 1', () => {
    const result = isFilterWithDeliveryMonth(1, 13, 1);
    expect(result).toBeFalsy();
  });

  test('deliveryMonth = 1, deliveryStartMonth = 1, deliveryInterval = 13', () => {
    const result = isFilterWithDeliveryMonth(1, 1, 13);
    expect(result).toBeFalsy();
  });

  test('deliveryMonth = 0, deliveryStartMonth = 1, deliveryInterval = 1', () => {
    const result = isFilterWithDeliveryMonth(0, 1, 1);
    expect(result).toBeFalsy();
  });

  test('deliveryMonth = 1, deliveryStartMonth = 0, deliveryInterval = 1', () => {
    const result = isFilterWithDeliveryMonth(1, 0, 1);
    expect(result).toBeFalsy();
  });

  test('deliveryMonth = 1, deliveryStartMonth = 1, deliveryInterval = 0', () => {
    const result = isFilterWithDeliveryMonth(1, 1, 0);
    expect(result).toBeFalsy();
  });

  test('StartMonth = 1, Interval = 1', () => {
    const startMonth = 1;
    const interval = 1;
    const results = generateDeliveryMonths(startMonth, interval);
    expect(results).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  });

  test('StartMonth = 1, Interval = 2', () => {
    const startMonth = 1;
    const interval = 2;
    const results = generateDeliveryMonths(startMonth, interval);
    expect(results).toEqual([1, 3, 5, 7, 9, 11]);
  });

  test('StartMonth = 1, Interval = 3', () => {
    const startMonth = 1;
    const interval = 3;
    const results = generateDeliveryMonths(startMonth, interval);
    expect(results).toEqual([1, 4, 7, 10]);
  });

  test('StartMonth = 1, Interval = 4', () => {
    const startMonth = 1;
    const interval = 4;
    const results = generateDeliveryMonths(startMonth, interval);
    expect(results).toEqual([1, 5, 9]);
  });

  test('StartMonth = 1, Interval = 5', () => {
    const startMonth = 1;
    const interval = 5;
    const results = generateDeliveryMonths(startMonth, interval);
    expect(results).toEqual([1, 6, 11]);
  });

  test('StartMonth = 1, Interval = 6', () => {
    const startMonth = 1;
    const interval = 6;
    const results = generateDeliveryMonths(startMonth, interval);
    expect(results).toEqual([1, 7]);
  });

  test('StartMonth = 1, Interval = 7', () => {
    const startMonth = 1;
    const interval = 7;
    const results = generateDeliveryMonths(startMonth, interval);
    expect(results).toEqual([1, 8]);
  });

  test('StartMonth = 1, Interval = 8', () => {
    const startMonth = 1;
    const interval = 8;
    const results = generateDeliveryMonths(startMonth, interval);
    expect(results).toEqual([1, 9]);
  });

  test('StartMonth = 1, Interval = 9', () => {
    const startMonth = 1;
    const interval = 9;
    const results = generateDeliveryMonths(startMonth, interval);
    expect(results).toEqual([1, 10]);
  });

  test('StartMonth = 1, Interval = 10', () => {
    const startMonth = 1;
    const interval = 10;
    const results = generateDeliveryMonths(startMonth, interval);
    expect(results).toEqual([1, 11]);
  });

  test('StartMonth = 1, Interval = 11', () => {
    const startMonth = 1;
    const interval = 11;
    const results = generateDeliveryMonths(startMonth, interval);
    expect(results).toEqual([1, 12]);
  });

  test('StartMonth = 1, Interval = 12', () => {
    const startMonth = 1;
    const interval = 12;
    const results = generateDeliveryMonths(startMonth, interval);
    expect(results).toEqual([1]);
  });

  test('StartMonth = 12, Interval = 1', () => {
    const startMonth = 12;
    const interval = 1;
    const results = generateDeliveryMonths(startMonth, interval);
    expect(results).toEqual([12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  });

  test('StartMonth = 12, Interval = 2', () => {
    const startMonth = 12;
    const interval = 2;
    const results = generateDeliveryMonths(startMonth, interval);
    expect(results).toEqual([12, 2, 4, 6, 8, 10]);
  });

  test('StartMonth = 12, Interval = 3', () => {
    const startMonth = 12;
    const interval = 3;
    const results = generateDeliveryMonths(startMonth, interval);
    expect(results).toEqual([12, 3, 6, 9]);
  });

  test('StartMonth = 12, Interval = 4', () => {
    const startMonth = 12;
    const interval = 4;
    const results = generateDeliveryMonths(startMonth, interval);
    expect(results).toEqual([12, 4, 8]);
  });

  test('StartMonth = 12, Interval = 5', () => {
    const startMonth = 12;
    const interval = 5;
    const results = generateDeliveryMonths(startMonth, interval);
    expect(results).toEqual([12, 5, 10]);
  });

  test('StartMonth = 12, Interval = 6', () => {
    const startMonth = 12;
    const interval = 6;
    const results = generateDeliveryMonths(startMonth, interval);
    expect(results).toEqual([12, 6]);
  });

  test('StartMonth = 12, Interval = 7', () => {
    const startMonth = 12;
    const interval = 7;
    const results = generateDeliveryMonths(startMonth, interval);
    expect(results).toEqual([12, 7]);
  });

  test('StartMonth = 12, Interval = 8', () => {
    const startMonth = 12;
    const interval = 8;
    const results = generateDeliveryMonths(startMonth, interval);
    expect(results).toEqual([12, 8]);
  });

  test('StartMonth = 12, Interval = 9', () => {
    const startMonth = 12;
    const interval = 9;
    const results = generateDeliveryMonths(startMonth, interval);
    expect(results).toEqual([12, 9]);
  });

  test('StartMonth = 12, Interval = 10', () => {
    const startMonth = 12;
    const interval = 10;
    const results = generateDeliveryMonths(startMonth, interval);
    expect(results).toEqual([12, 10]);
  });

  test('StartMonth = 12, Interval = 11', () => {
    const startMonth = 12;
    const interval = 11;
    const results = generateDeliveryMonths(startMonth, interval);
    expect(results).toEqual([12, 11]);
  });

  test('StartMonth = 12, Interval = 12', () => {
    const startMonth = 12;
    const interval = 12;
    const results = generateDeliveryMonths(startMonth, interval);
    expect(results).toEqual([12]);
  });

  test('StartMonth = 6, Interval = 1', () => {
    const startMonth = 6;
    const interval = 1;
    const results = generateDeliveryMonths(startMonth, interval);
    expect(results).toEqual([6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5]);
  });

  test('StartMonth = 6, Interval = 2', () => {
    const startMonth = 6;
    const interval = 2;
    const results = generateDeliveryMonths(startMonth, interval);
    expect(results).toEqual([6, 8, 10, 12, 2, 4]);
  });

  test('StartMonth = 6, Interval = 3', () => {
    const startMonth = 6;
    const interval = 3;
    const results = generateDeliveryMonths(startMonth, interval);
    expect(results).toEqual([6, 9, 12, 3]);
  });

  test('StartMonth = 6, Interval = 4', () => {
    const startMonth = 6;
    const interval = 4;
    const results = generateDeliveryMonths(startMonth, interval);
    expect(results).toEqual([6, 10, 2]);
  });

  test('StartMonth = 6, Interval = 6', () => {
    const startMonth = 6;
    const interval = 6;
    const results = generateDeliveryMonths(startMonth, interval);
    expect(results).toEqual([6, 12]);
  });

  test('StartMonth = 6, Interval = 12', () => {
    const startMonth = 6;
    const interval = 12;
    const results = generateDeliveryMonths(startMonth, interval);
    expect(results).toEqual([6]);
  });

  test('StartMonth = 0, Interval = 1', () => {
    const startMonth = 0;
    const interval = 1;
    const results = generateDeliveryMonths(startMonth, interval);
    expect(results).toEqual([]);
  });

  test('StartMonth = 1, Interval = 0', () => {
    const startMonth = 1;
    const interval = 0;
    const results = generateDeliveryMonths(startMonth, interval);
    expect(results).toEqual([]);
  });

  test('StartMonth = 13, Interval = 1', () => {
    const startMonth = 13;
    const interval = 1;
    const results = generateDeliveryMonths(startMonth, interval);
    expect(results).toEqual([]);
  });

  test('StartMonth = 1, Interval = 13', () => {
    const startMonth = 1;
    const interval = 13;
    const results = generateDeliveryMonths(startMonth, interval);
    expect(results).toEqual([]);
  });
});
