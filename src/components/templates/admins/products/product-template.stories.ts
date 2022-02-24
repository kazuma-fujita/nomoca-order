import type { ComponentStoryObj } from '@storybook/react';
import { Staff, Type, Product } from 'API';
import { ProductTemplate } from 'components/templates/admins/products/product-template';
import { productMock } from 'mocks/order-list.mock';

type Story = ComponentStoryObj<typeof ProductTemplate>;

export default { component: ProductTemplate };

const items: Product[] = [...Array(3)].map((_, i) => ({
  ...productMock,
  id: `dummyProductID-${i + 1}`,
  name: `商品-${i + 1}`,
  viewOrder: i + 1,
  updatedAt: new Date(2022, 1 + i, 2 + i, 12 + i, 30 + i, 0).toISOString(),
}));

export const Default: Story = {
  args: { data: items },
};

export const Loading: Story = {
  args: { isLoading: true },
};

export const Empty: Story = {
  args: { isEmptyList: true },
};

export const FetchError: Story = {
  args: { error: Error('The API fetched data but it returned null.') },
};
