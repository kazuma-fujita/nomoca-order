import type { ComponentStoryObj } from '@storybook/react';
import { SubscriptionOrderList } from './subscription-order-list';
import * as Stories from 'components/templates/admins/subscription-orders/subscription-order-template.stories';
import { subscriptionOrderListMock } from 'mocks/subscription-order-list.mock';
import { NowDateContextProvider } from 'stores/use-now-date';

type Story = ComponentStoryObj<typeof SubscriptionOrderList>;

export default { component: SubscriptionOrderList };

export const Default: Story = {
  // args: { data: Stories.Default.args?.data },
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
