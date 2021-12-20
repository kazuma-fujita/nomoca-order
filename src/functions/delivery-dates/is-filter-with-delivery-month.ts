import { generateDeliveryMonths } from './generate-delivery-months';

export const minMonth = 1;
export const maxMonth = 12;

export const isFilterWithDeliveryMonth = (
  deliveryMonth: number,
  deliveryStartMonth: number,
  deliveryInterval: number,
): boolean => {
  if (
    deliveryMonth < minMonth ||
    maxMonth < deliveryMonth ||
    deliveryStartMonth < minMonth ||
    maxMonth < deliveryStartMonth ||
    deliveryInterval < minMonth ||
    maxMonth < deliveryInterval
  ) {
    return false;
  }
  return generateDeliveryMonths(deliveryStartMonth, deliveryInterval).includes(deliveryMonth);
};
