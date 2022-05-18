import { DeliveryType } from 'API';
import { NormalizedProduct } from 'hooks/subscription-orders/use-fetch-subscription-order-list';

export const addExpressDeliveryObjectToProductList = (
  products: NormalizedProduct[],
  deliveryType: DeliveryType,
): NormalizedProduct[] => {
  if (!products.length || deliveryType !== DeliveryType.express) {
    return products;
  }
  return [
    ...products,
    {
      relationID: 'express',
      productID: 'express',
      name: '速達配送料',
      unitPrice: 1000,
      quantity: 1,
      viewOrder: products[products.length - 1].viewOrder! + 1, // 配列最後のviewOrderの値から1を足して表示順を最後に設定
    },
  ];
};
