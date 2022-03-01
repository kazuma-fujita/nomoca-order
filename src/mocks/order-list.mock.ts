import {
  DeliveryStatus,
  DeliveryType,
  ModelOrderProductConnection,
  Order,
  OrderProduct,
  OrderType,
  Staff,
  Type,
} from 'API';
import { ExtendedOrder } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { createNormalizedProductsMock } from 'mocks/product.mock';
import { staffMock } from './staff.mock';

const orderProduct: OrderProduct = {
  __typename: 'OrderProduct',
  id: '',
  orderID: '',
  name: '商品',
  unitPrice: 1000,
  quantity: 1,
  viewOrder: 1,
  createdAt: '2021-11-25T14:32:55Z',
  updatedAt: '2021-11-25T14:32:55Z',
};

const orderProductConnection: ModelOrderProductConnection = {
  __typename: 'ModelOrderProductConnection',
  items: [orderProduct],
};

const orderItem: Order = {
  __typename: 'Order',
  id: 'dummyID',
  staffID: '',
  type: Type.order,
  orderType: OrderType.singleOrder,
  products: orderProductConnection,
  staff: staffMock,
  deliveryStartYear: 2022,
  deliveryStartMonth: 1,
  deliveryInterval: 1,
  createdAt: '2021-11-25T14:32:55Z',
  updatedAt: '2021-11-25T14:32:55Z',
};

const createProductConnections = (row: number): OrderProduct[] =>
  [...Array(row)].map((_, i) => ({
    ...orderProduct,
    id: `dummyProductID-${i + 1}`,
    name: `商品${row}-${i + 1}`,
    unitPrice: 1000 * (i + 1),
    quantity: i + 1,
  }));

export const orderListMock: ExtendedOrder<Order>[] = [...Array(12)].map((_, i) => ({
  ...orderItem,
  id: `dummyID-${i + 1}`,
  orderType: OrderType.singleOrder,
  products: {
    ...orderProductConnection,
    items: createProductConnections(i + 1),
  },
  normalizedProducts: createNormalizedProductsMock(i + 1),
  staff: { ...orderItem.staff, id: `dummyStaffID-${i + 1}`, name: `担当者${i + 1}` },
  deliveryStatus:
    (i + 1) % 3 === 0 ? DeliveryStatus.ordered : (i + 1) % 3 === 1 ? DeliveryStatus.delivered : DeliveryStatus.canceled,
  deliveryType: (i + 1) % 2 === 0 ? DeliveryType.regular : DeliveryType.express,
  updatedAt: new Date(2021, 1 + i, 2 + i, 12 + i, 30 + i, 0).toISOString(),
}));
