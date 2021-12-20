import type { ComponentStoryObj } from '@storybook/react';
import {
  ModelSubscriptionOrderProductConnection,
  Product,
  Staff,
  SubscriptionOrder,
  SubscriptionOrderProduct,
} from 'API';
import { ObjectType } from 'constants/object-type';
import { SubscriptionOrderList } from './subscription-order-list';

const product: Product = {
  __typename: ObjectType.Product,
  id: 'dummyProductID',
  name: '商品',
  type: ObjectType.Product,
  viewOrder: 1,
  disabled: false,
  createdAt: '2021-11-25T14:32:55Z',
  updatedAt: '2021-11-25T14:32:55Z',
};

const productRelation: SubscriptionOrderProduct = {
  __typename: 'SubscriptionOrderProduct',
  id: '',
  subscriptionOrderID: '',
  productID: '',
  product: product,
  quantity: 1,
  createdAt: '2021-11-25T14:32:55Z',
  updatedAt: '2021-11-25T14:32:55Z',
};

const products: ModelSubscriptionOrderProductConnection = {
  __typename: 'ModelSubscriptionOrderProductConnection',
  items: [productRelation],
};

const staff: Staff = {
  __typename: ObjectType.Staff,
  id: 'DummyStaffID',
  name: '',
  type: ObjectType.Staff,
  viewOrder: 1,
  disabled: false,
  createdAt: '2021-11-25T14:32:55Z',
  updatedAt: '2021-11-25T14:32:55Z',
};

const item: SubscriptionOrder = {
  __typename: ObjectType.SubscriptionOrder,
  id: 'dummyID',
  staffID: '',
  type: ObjectType.SubscriptionOrder,
  products: products,
  staff: staff,
  deliveryStartYear: 2022,
  deliveryStartMonth: 1,
  deliveryInterval: 1,
  createdAt: '2021-11-25T14:32:55Z',
  updatedAt: '2021-11-25T14:32:55Z',
};

const createProductRelations = (row: number): SubscriptionOrderProduct[] =>
  [...Array(row)].map((_, i) => ({
    ...productRelation,
    product: {
      ...product,
      id: `dummyProductID-${i + 1}`,
      name: `商品${row}-${i + 1}`,
    },
  }));

export const subscriptionOrderItems: SubscriptionOrder[] = [...Array(12)].map((_, i) => ({
  ...item,
  id: `dummyID-${i + 1}`,
  products: {
    ...products,
    items: createProductRelations(i + 1),
  },
  staff: { ...item.staff, id: `dummyStaffID-${i + 1}`, name: `担当者${i + 1}` },
  deliveryStartMonth: i + 1,
  deliveryInterval: i + 1,
  updatedAt: new Date(2021, 1 + i, 2 + i, 12 + i, 30 + i, 0).toISOString(),
}));
