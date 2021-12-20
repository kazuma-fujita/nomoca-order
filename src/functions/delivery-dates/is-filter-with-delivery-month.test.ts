import { isFilterWithDeliveryMonth } from './is-filter-with-delivery-month';

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
});
