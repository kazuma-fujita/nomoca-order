import type { ComponentStoryObj } from '@storybook/react';
import { subscriptionOrderListMock } from 'mocks/subscription-order-list.mock';
import { SubscriptionOrderHistoryList } from './subscription-order-history-list';

type Story = ComponentStoryObj<typeof SubscriptionOrderHistoryList>;

export default { component: SubscriptionOrderHistoryList };

export const Default: Story = {
  args: { data: subscriptionOrderListMock },
  decorators: [(StoryComponent) => <StoryComponent />],
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
