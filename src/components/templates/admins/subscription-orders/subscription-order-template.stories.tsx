import type { ComponentStoryObj } from '@storybook/react';
import { SubscriptionOrderTemplate } from 'components/templates/admins/subscription-orders/subscription-order-template';
import { subscriptionOrderListMock } from 'mocks/subscription-order-list.mock';
import { NowDateContextProvider } from 'stores/use-now-date';

type Story = ComponentStoryObj<typeof SubscriptionOrderTemplate>;

export default { component: SubscriptionOrderTemplate };

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
  args: { isLoading: true },
};

export const Empty: Story = {
  args: { isEmptyList: true },
};

export const FetchError: Story = {
  args: { error: Error('The API fetched data but it returned null.') },
};
