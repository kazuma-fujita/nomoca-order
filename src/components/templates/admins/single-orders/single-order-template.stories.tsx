import type { ComponentStoryObj } from '@storybook/react';
import { adminOrderListMock, orderListMock } from 'mocks/order-list.mock';
import { SingleOrderTemplate } from './single-order-template';

const description = `

## Use Case

description

	dummy
	dummy

## Specs

## Back Office Ops

`;

type Story = ComponentStoryObj<typeof SingleOrderTemplate>;

export default { component: SingleOrderTemplate };

export const Default: Story = {
  args: { data: adminOrderListMock },
};

Default.parameters = {
  docs: {
    description: {
      component: description,
    },
  },
};

export const Loading: Story = {
  ...Default,
  args: { isLoading: true },
};

export const Empty: Story = {
  ...Default,
  args: { isEmptyList: true },
};

export const FetchError: Story = {
  ...Default,
  args: { error: Error('The API fetched data but it returned null.') },
};
