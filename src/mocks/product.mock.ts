import { OrderType, Product, Type } from 'API';
import { NormalizedProduct } from 'hooks/subscription-orders/use-fetch-subscription-order-list';

export const productMock: Product = {
  __typename: 'Product',
  id: 'dummyProductID',
  name: '商品',
  unitPrice: 1000,
  type: Type.product,
  orderType: OrderType.subscriptionOrder,
  viewOrder: 1,
  disabled: false,
  createdAt: '2021-11-25T14:32:55Z',
  updatedAt: '2021-11-25T14:32:55Z',
};

export const createNormalizedProductsMock = (row: number): NormalizedProduct[] =>
  [...Array(row)].map((_, i) => ({
    relationID: `dummyOrderProductID-${i + 1}`,
    productID: `dummyProductID-${i + 1}`,
    name: `商品${row}-${i + 1}`,
    unitPrice: 1000 * (i + 1),
    quantity: i + 1,
  }));
