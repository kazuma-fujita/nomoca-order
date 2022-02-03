import type { ComponentStoryObj } from '@storybook/react';
import { DisplayProduct } from 'components/molecules/receipt-table';
import { ConfirmSingleOrder } from './confirm-single-order';

const product: DisplayProduct = {
  key: 'dummyID',
  name: '商品',
  unitPrice: 1000,
  quantity: 1,
};

const products: DisplayProduct[] = [...Array(3)].map((_, i) => ({
  ...product,
  key: `dummyID-${i + 1}`,
  name: `商品${i + 1}`,
  unitPrice: 1000 * (i + 1),
  quantity: i + 1,
}));

type Story = ComponentStoryObj<typeof ConfirmSingleOrder>;

export default { component: ConfirmSingleOrder };

export const Default: Story = {
  args: { products: products, staffName: '担当者1', isLoading: false, error: null, submitHandler: async () => {} },
  parameters: {
    nextRouter: {
      path: '/single-order',
      query: {
        screen: 'input',
      },
    },
  },
};

export const Loading: Story = {
  ...Default,
  args: { ...Default.args, isLoading: true },
};

export const ErrorAlert: Story = {
  ...Default,
  args: { ...Default.args, error: Error('It occurred an async error.') },
};
