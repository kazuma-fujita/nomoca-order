import {
  DeliveryStatus,
  DeliveryType,
  ModelOrderProductConnection,
  Order,
  OrderProduct,
  OrderType,
  Product,
  Staff,
  Type,
} from 'API';
import { ExtendedOrder, NormalizedProduct } from 'hooks/orders/use-fetch-order-list';

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

const staff: Staff = {
  __typename: 'Staff',
  id: 'DummyStaffID',
  name: '',
  type: Type.staff,
  viewOrder: 1,
  disabled: false,
  createdAt: '2021-11-25T14:32:55Z',
  updatedAt: '2021-11-25T14:32:55Z',
};

const orderProduct: OrderProduct = {
  __typename: 'OrderProduct',
  id: '',
  orderID: '',
  productID: '',
  product: productMock,
  quantity: 1,
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
  staff: staff,
  deliveryStartYear: 2022,
  deliveryStartMonth: 1,
  deliveryInterval: 1,
  createdAt: '2021-11-25T14:32:55Z',
  updatedAt: '2021-11-25T14:32:55Z',
};

const createProductConnections = (row: number): OrderProduct[] =>
  [...Array(row)].map((_, i) => ({
    ...orderProduct,
    product: {
      ...productMock,
      id: `dummyProductID-${i + 1}`,
      name: `商品${row}-${i + 1}`,
    },
  }));

const createNormalizedProducts = (row: number): NormalizedProduct[] =>
  [...Array(row)].map((_, i) => ({
    relationID: `dummyOrderProductID-${i + 1}`,
    productID: `dummyProductID-${i + 1}`,
    name: `商品${row}-${i + 1}`,
    unitPrice: 1000,
    quantity: i + 1,
  }));

export const singleOrderItems: ExtendedOrder[] = [...Array(12)].map((_, i) => ({
  ...orderItem,
  id: `dummyID-${i + 1}`,
  orderType: OrderType.singleOrder,
  products: {
    ...orderProductConnection,
    items: createProductConnections(i + 1),
  },
  normalizedProducts: createNormalizedProducts(i + 1),
  staff: { ...staff, id: `dummyStaffID-${i + 1}`, name: `担当者${i + 1}` },
  deliveryStatus:
    (i + 1) % 3 === 0 ? DeliveryStatus.ordered : (i + 1) % 3 === 1 ? DeliveryStatus.delivered : DeliveryStatus.canceled,
  deliveryType: (i + 1) % 2 === 0 ? DeliveryType.regular : DeliveryType.express,
  updatedAt: new Date(2021, 1 + i, 2 + i, 12 + i, 30 + i, 0).toISOString(),
}));

export const subscriptionOrderItems: ExtendedOrder[] = [...Array(12)].map((_, i) => ({
  ...orderItem,
  id: `dummyID-${i + 1}`,
  orderType: OrderType.subscriptionOrder,
  products: {
    ...orderProductConnection,
    items: createProductConnections(i + 1),
  },
  normalizedProducts: createNormalizedProducts(i + 1),
  staff: { ...staff, id: `dummyStaffID-${i + 1}`, name: `担当者${i + 1}` },
  deliveryStartMonth: i + 1,
  deliveryInterval: i + 1,
  updatedAt: new Date(2021, 1 + i, 2 + i, 12 + i, 30 + i, 0).toISOString(),
}));
