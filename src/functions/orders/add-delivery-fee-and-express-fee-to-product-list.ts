import { DeliveryType } from 'API';
import { NormalizedProduct } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { calcSubtotalFromProductList } from 'functions/orders/calc-total-taxes-subtotal';

export const OrderFeeLabel = {
  deliveryFee: '配送手数料',
  expressFee: '速達配送料',
} as const;

export type OrderFeeLabel = typeof OrderFeeLabel[keyof typeof OrderFeeLabel];

export const addDeliveryFeeAndExpressFeeToProductList = (
  products: NormalizedProduct[],
  deliveryType: DeliveryType,
): NormalizedProduct[] => {
  // 商品合計金額が10,000円未満の場合、配送手数料を追加
  const tempProducts = addDeliveryFeeObjectToProductList(products);
  // 速達配送の場合、速達配送手数料を追加
  return addExpressDeliveryObjectToProductList(tempProducts, deliveryType);
};

export const addDeliveryFeeObjectToProductList = (products: NormalizedProduct[]): NormalizedProduct[] => {
  if (products.length === 0) {
    throw Error('A product list is empty.');
  }

  // 商品合計金額税抜10,000円判定
  if (calcSubtotalFromProductList(products) >= 10000) {
    return products;
  }
  // 配列最後のviewOrder取得
  const trailingViewOrder = products[products.length - 1].viewOrder;
  if (!trailingViewOrder) {
    throw Error('Missing trailing view order.');
  }

  // 商品合計金額が10,000円未満の場合、配送手数料を配列に追加
  return [
    ...products,
    {
      relationID: 'deliveryFee',
      productID: 'deliveryFee',
      name: OrderFeeLabel.deliveryFee,
      purchasePrice: 0, // 仕入れ値
      unitPrice: 1000, // 売価
      quantity: 1,
      isExportCSV: false, // 配送手数料はcsvに出力しない
      viewOrder: trailingViewOrder + 1, // 配列最後のviewOrderの値から1を足して表示順を最後に設定
    },
  ];
};

const addExpressDeliveryObjectToProductList = (
  products: NormalizedProduct[],
  deliveryType: DeliveryType,
): NormalizedProduct[] => {
  if (products.length === 0) {
    throw Error('A product list is empty.');
  }

  // 配送方法が速達以外は返却
  if (deliveryType !== DeliveryType.express) {
    return products;
  }

  // 配列最後のviewOrder取得
  const trailingViewOrder = products[products.length - 1].viewOrder;
  if (!trailingViewOrder) {
    throw Error('Missing trailing view order.');
  }

  return [
    ...products,
    {
      relationID: 'express',
      productID: 'express',
      name: OrderFeeLabel.expressFee,
      purchasePrice: 0, // 仕入れ値
      unitPrice: 1000, // 売価
      quantity: 1,
      isExportCSV: false, // 速達料はcsvに出力しない
      viewOrder: trailingViewOrder + 1, // 配列最後のviewOrderの値から1を足して表示順を最後に設定
    },
  ];
};
