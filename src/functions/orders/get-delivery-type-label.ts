import { DeliveryType } from 'API';

export const getDeliveryTypeLabel = (deliveryType: DeliveryType): string =>
  deliveryType === DeliveryType.regular ? '通常配送' : '速達配送';
