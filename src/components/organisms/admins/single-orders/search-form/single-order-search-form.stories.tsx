import type { ComponentStoryObj } from '@storybook/react';
import { SingleOrderSearchForm } from './single-order-search-form';

type Story = ComponentStoryObj<typeof SingleOrderSearchForm>;

export default { component: SingleOrderSearchForm };

export const Default: Story = {
  args: { isLoading: false },
};

export const Loading: Story = {
  args: { ...Default.args, isLoading: true },
};

export const ErrorAlert: Story = {
  args: { ...Default.args, error: Error('The input values are out of range.') },
};
