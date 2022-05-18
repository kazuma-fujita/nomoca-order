import { DeliveryType } from 'API';

export const getDeliveryTypeLabel = (deliveryType: DeliveryType): string => {
  switch (deliveryType) {
    case DeliveryType.regular:
      return '通常配送';
    case DeliveryType.express:
      return '速達配送';
    case DeliveryType.subscription:
      return '定期便';
    default:
      return '';
  }
};
