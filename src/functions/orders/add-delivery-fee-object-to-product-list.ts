import { NormalizedProduct } from 'hooks/orders/use-fetch-order-list';
import { calcSubtotalFromProductList } from 'functions/orders/calc-total-taxes-subtotal';

export const addDeliveryFeeObjectToProductList = (products: NormalizedProduct[]): NormalizedProduct[] =>
  10000 > calcSubtotalFromProductList(products)
    ? [
        ...products,
        { relationID: 'deliveryFee', productID: 'deliveryFee', name: '配送手数料', unitPrice: 1000, quantity: 1 },
      ]
    : products;
