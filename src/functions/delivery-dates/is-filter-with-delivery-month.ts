import { generateDeliveryMonths } from './generate-delivery-months';
import { generateNextDeliveryYearMonth } from './generate-next-delivery-year-month';

export const minMonth = 1;
export const maxMonth = 12;

export const isFilterWithDeliveryMonth = (
  searchDeliveryYear: number,
  searchDeliveryMonth: number,
  deliveryStartYear: number,
  deliveryStartMonth: number,
  deliveryInterval: number,
  nowYear: number,
  nowMonth: number,
): boolean => {
  if (
    searchDeliveryMonth < minMonth ||
    maxMonth < searchDeliveryMonth ||
    deliveryStartMonth < minMonth ||
    maxMonth < deliveryStartMonth ||
    deliveryInterval < minMonth ||
    maxMonth < deliveryInterval
  ) {
    return false;
  }
  const result = generateNextDeliveryYearMonth(
    deliveryStartYear,
    deliveryStartMonth,
    deliveryInterval,
    nowYear,
    nowMonth,
  );
  if (!result) {
    return false;
  }
  return result.nextDeliveryYear === searchDeliveryYear && result.nextDeliveryMonth === searchDeliveryMonth;
  // return generateDeliveryMonths(deliveryStartMonth, deliveryInterval).includes(searchDeliveryMonth);
};
