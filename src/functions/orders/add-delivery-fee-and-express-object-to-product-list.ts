import { DeliveryType } from 'API';
import { NormalizedProduct } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { addExpressDeliveryObjectToProductList } from 'functions/orders/add-express-delivery-object-to-product-list';
import { addDeliveryFeeObjectToProductList } from 'functions/orders/add-delivery-fee-object-to-product-list';

export const addDeliveryFeeAndExpressObjectToProductList = (
  products: NormalizedProduct[],
  deliveryType: DeliveryType,
): NormalizedProduct[] => {
  // 商品合計金額が10,000円未満の場合、配送手数料を追加
  const tempProducts = addDeliveryFeeObjectToProductList(products);
  // 速達配送の場合、速達配送手数料を追加
  return addExpressDeliveryObjectToProductList(tempProducts, deliveryType);
};
