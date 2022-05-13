import type { ComponentStoryObj } from '@storybook/react';
import { OrderType } from 'API';
import { orderListMock } from 'mocks/order-list.mock';
import { graphql } from 'msw';
import { OrderFormParamContextProvider } from 'stores/use-order-form-param';
import { OrderListTemplate } from './order-list-template';

type Story = ComponentStoryObj<typeof OrderListTemplate>;

export default { component: OrderListTemplate };

export const Default: Story = {
  decorators: [
    (StoryComponent) => (
      <OrderFormParamContextProvider orderType={OrderType.singleOrder}>
        <StoryComponent />
      </OrderFormParamContextProvider>
    ),
  ],
};

Default.parameters = {
  msw: {
    handlers: [
      graphql.query('ListOrdersSortedByCreatedAt', (req, res, ctx) => {
        const response = {
          listOrdersSortedByCreatedAt: {
            items: orderListMock,
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
