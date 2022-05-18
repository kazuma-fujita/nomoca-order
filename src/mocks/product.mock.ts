import { OrderType, Product, Type } from 'API';
import { NormalizedProduct } from 'hooks/subscription-orders/use-fetch-subscription-order-list';

export const productMock: Product = {
  __typename: 'Product',
  id: 'dummyProductID',
  name: '商品',
  unitPrice: 1000,
  type: Type.product,
  orderType: OrderType.singleOrder,
  viewOrder: 1,
  isExportCSV: false,
  disabled: false,
  createdAt: '2022-03-25T09:32:55Z',
  updatedAt: '2022-03-25T09:32:55Z',
};

export const createNormalizedProductsMock = (row: number): NormalizedProduct[] =>
  [...Array(row)].map((_, i) => ({
    relationID: `dummyOrderProductID-${i + 1}`,
    productID: `dummyProductID-${i + 1}`,
    name: `商品${row}-${i + 1}`,
    unitPrice: 1000 * (i + 1),
    quantity: i + 1,
    viewOrder: i + 1,
  }));

export const productListMock: Product[] = [...Array(3)].map((_, i) => ({
  ...productMock,
  id: `dummyProductID-${i + 1}`,
  name: `商品${i + 1}`,
  unitPrice: 1000 * (i + 1),
  quantity: i + 1,
  viewOrder: i + 1,
  isExportCSV: Boolean((i + 1) % 2),
  updatedAt: new Date(2022, 1 + i, 2 + i, 12 + i, 30 + i, 0).toISOString(),
}));
