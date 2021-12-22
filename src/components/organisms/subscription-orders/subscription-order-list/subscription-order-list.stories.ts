import type { ComponentStoryObj } from '@storybook/react';
import * as Stories from 'components/organisms/admins/subscription-orders/subscription-order-list/subscription-order-list.stories';
import { SubscriptionOrderList } from './subscription-order-list';

type Story = ComponentStoryObj<typeof SubscriptionOrderList>;

export default { component: SubscriptionOrderList };

export const Default: Story = {
  args: { data: Stories.Default.args?.data, now: new Date(2023, 0, 1, 9) },
  // args: { data: Stories.Default.args?.data },
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
