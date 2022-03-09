import type { ComponentStoryObj } from '@storybook/react';
import { subscriptionOrderListMock } from 'mocks/subscription-order-list.mock';
import { NowDateContextProvider } from 'stores/use-now-date';
import { SubscriptionOrderListTemplate } from './subscription-order-list-template';

type Story = ComponentStoryObj<typeof SubscriptionOrderListTemplate>;

export default { component: SubscriptionOrderListTemplate };

export const Default: Story = {
  args: { data: subscriptionOrderListMock },
  decorators: [
    (StoryComponent) => (
      <NowDateContextProvider now={new Date(2023, 0, 1, 9)}>
        <StoryComponent />
      </NowDateContextProvider>
    ),
  ],
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
