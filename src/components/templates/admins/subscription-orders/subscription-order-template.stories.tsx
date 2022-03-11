import type { ComponentStoryObj } from '@storybook/react';
import { SubscriptionOrderTemplate } from 'components/templates/admins/subscription-orders/subscription-order-template';
import { AdminSubscriptionOrderListContextProvider } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { subscriptionOrderListMock } from 'mocks/subscription-order-list.mock';
import { graphql } from 'msw';
import { NowDateContextProvider } from 'stores/use-now-date';

type Story = ComponentStoryObj<typeof SubscriptionOrderTemplate>;

export default { component: SubscriptionOrderTemplate };

export const Default: Story = {
  decorators: [
    (StoryComponent) => (
      <AdminSubscriptionOrderListContextProvider>
        <NowDateContextProvider now={new Date(2023, 0, 1, 9)}>
          <StoryComponent />
        </NowDateContextProvider>
      </AdminSubscriptionOrderListContextProvider>
    ),
  ],
};

Default.parameters = {
  msw: {
    handlers: [
      graphql.query('ListSubscriptionOrdersSortedByCreatedAt', (req, res, ctx) => {
        const response = {
          listSubscriptionOrdersSortedByCreatedAt: {
            items: subscriptionOrderListMock,
          },
        };
        return res(ctx.data(response));
      }),
    ],
  },
};

// export const Loading: Story = {
//   args: { isLoading: true },
// };

// export const Empty: Story = {
//   args: { isEmptyList: true },
// };

// export const FetchError: Story = {
//   args: { error: Error('The API fetched data but it returned null.') },
// };
