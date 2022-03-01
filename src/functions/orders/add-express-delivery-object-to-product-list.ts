import { DeliveryType } from 'API';
import { NormalizedProduct } from 'hooks/subscription-orders/use-fetch-subscription-order-list';

export const addExpressDeliveryObjectToProductList = (
  products: NormalizedProduct[],
  deliveryType: DeliveryType,
): NormalizedProduct[] =>
  deliveryType === DeliveryType.express
    ? [...products, { relationID: 'express', productID: 'express', name: '速達配送料', unitPrice: 1000, quantity: 1 }]
    : products;
