import { generateDeliveryMonths } from './generate-delivery-months';

describe('generateDeliveryMonths', () => {
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
