import type { ComponentStoryObj } from '@storybook/react';
import { ProductTemplate } from 'components/templates/admins/products/product-template';
import { productListMock } from 'mocks/product.mock';

type Story = ComponentStoryObj<typeof ProductTemplate>;

export default { component: ProductTemplate };

export const Default: Story = {
  args: { data: productListMock },
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
