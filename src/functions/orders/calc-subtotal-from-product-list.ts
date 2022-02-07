import { DeliveryType } from 'API';
import { NormalizedProduct } from 'hooks/orders/use-fetch-order-list';

export const calcSubtotalFromProductList = (products: NormalizedProduct[]): number =>
  products.map((product) => product.unitPrice * product.quantity).reduce((sum, value) => sum + value, 0);
