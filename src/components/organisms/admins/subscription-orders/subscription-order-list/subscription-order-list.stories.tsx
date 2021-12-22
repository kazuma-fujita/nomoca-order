import type { ComponentStoryObj } from '@storybook/react';
import { NowDateContextProvider } from 'stores/use-now-date';
import { SubscriptionOrderList } from './subscription-order-list';
import { subscriptionOrderItems } from './subscription-order-list.mock';

type Story = ComponentStoryObj<typeof SubscriptionOrderList>;

export default { component: SubscriptionOrderList };

export const Default: Story = {
  args: { data: subscriptionOrderItems },
  decorators: [
    (StoryComponent) => (
      <NowDateContextProvider now={new Date(2023, 0, 1, 9)}>
        <StoryComponent />
      </NowDateContextProvider>
    ),
  ],
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
