import { NormalizedProduct } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { calcSubtotalFromProductList } from 'functions/orders/calc-total-taxes-subtotal';

export const addDeliveryFeeObjectToProductList = (products: NormalizedProduct[]): NormalizedProduct[] => {
  if (!products.length || calcSubtotalFromProductList(products) >= 10000) {
    return products;
  }
  // 商品合計金額が10,000円未満の場合、配送手数料を配列に追加
  return [
    ...products,
    {
      relationID: 'deliveryFee',
      productID: 'deliveryFee',
      name: '配送手数料',
      unitPrice: 1000,
      quantity: 1,
      viewOrder: products[products.length - 1].viewOrder! + 1, // 配列最後のviewOrderの値から1を足して表示順を最後に設定
    },
  ];
};
