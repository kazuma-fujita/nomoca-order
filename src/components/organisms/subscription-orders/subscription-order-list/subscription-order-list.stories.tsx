import type { ComponentStoryObj } from '@storybook/react';
import * as Stories from 'components/organisms/admins/subscription-orders/subscription-order-list/subscription-order-list.stories';
import { SubscriptionOrderList } from './subscription-order-list';
import { NowDateContextProvider } from 'stores/use-now-date';

type Story = ComponentStoryObj<typeof SubscriptionOrderList>;

export default { component: SubscriptionOrderList };

export const Default: Story = {
  args: { data: Stories.Default.args?.data },
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
