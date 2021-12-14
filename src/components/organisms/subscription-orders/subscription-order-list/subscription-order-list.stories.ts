import type { ComponentStoryObj } from '@storybook/react';
import {
  Staff,
  SubscriptionOrder,
  Product,
  SubscriptionOrderProduct,
  ModelSubscriptionOrderProductConnection,
} from 'API';
import { SubscriptionOrderList, Props } from './subscription-order-list';
import { ObjectType } from 'constants/object-type';
import { useToggle } from 'react-use';

type Story = ComponentStoryObj<typeof SubscriptionOrderList>;

export default { component: SubscriptionOrderList };

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

const items: SubscriptionOrder[] = [...Array(3)].map((_, i) => ({
  ...item,
  id: `dummyID-${i + 1}`,
  products: {
    ...products,
    items: createProductRelations(i + 1),
  },
  staff: { ...item.staff, id: `dummyStaffID-${i + 1}`, name: `担当者${i + 1}` },
  deliveryStartMonth: i + 1,
  updatedAt: new Date(2021, 1 + i, 2 + i, 12 + i, 30 + i, 0).toISOString(),
}));

export const Default: Story = {
  args: { data: items },
};

export const Loading: Story = {
  args: { isLoading: true },
};

export const Empty: Story = {
  args: { isListEmpty: true },
};

export const FetchError: Story = {
  args: { error: Error('The API fetched data but it returned null.') },
};
