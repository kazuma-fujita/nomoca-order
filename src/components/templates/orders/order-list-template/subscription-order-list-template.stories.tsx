import type { ComponentStoryObj } from '@storybook/react';
import { OrderType } from 'API';
import { subscriptionOrderListMock } from 'mocks/subscription-order-list.mock';
import { graphql } from 'msw';
import { NowDateContextProvider } from 'stores/use-now-date';
import { OrderFormParamContextProvider } from 'stores/use-order-form-param';
import { OrderListTemplate } from './order-list-template';

type Story = ComponentStoryObj<typeof OrderListTemplate>;

export default { component: OrderListTemplate };

export const Default: Story = {
  decorators: [
    (StoryComponent) => (
      <OrderFormParamContextProvider orderType={OrderType.subscriptionOrder}>
        <NowDateContextProvider now={new Date(2023, 0, 1, 9)}>
          <StoryComponent />
        </NowDateContextProvider>
      </OrderFormParamContextProvider>
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
//   ...Default,
//   args: { isLoading: true },
// };

// export const Empty: Story = {
//   ...Default,
//   args: { isEmptyList: true },
// };

// export const FetchError: Story = {
//   ...Default,
//   args: { error: Error('The API fetched data but it returned null.') },
// };
