import { DeliveryType } from 'API';
import { NormalizedProduct } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { addExpressDeliveryObjectToProductList } from 'functions/orders/add-express-delivery-object-to-product-list';
import { addDeliveryFeeObjectToProductList } from 'functions/orders/add-delivery-fee-object-to-product-list';

export const addDeliveryFeeAndExpressObjectToProductList = (
  products: NormalizedProduct[],
  deliveryType: DeliveryType,
): NormalizedProduct[] => {
  const tempProducts = addExpressDeliveryObjectToProductList(products, deliveryType);
  return addDeliveryFeeObjectToProductList(tempProducts);
};
