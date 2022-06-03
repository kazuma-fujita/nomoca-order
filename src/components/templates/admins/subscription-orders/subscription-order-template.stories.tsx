import type { ComponentStoryObj } from '@storybook/react';
import { SubscriptionOrderTemplate } from 'components/templates/admins/subscription-orders/subscription-order-template';
import { AdminSubscriptionOrderListContextProvider } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { subscriptionOrderListMock } from 'mocks/subscription-order-list.mock';
import { NowDateContextProvider } from 'stores/use-now-date';
import { FetchResponse } from 'hooks/swr/use-fetch';
import { ScreenName } from 'constants/screen-name';

const description = `

## Use Case

description

	dummy
	dummy

## Specs

## Back Office Ops

`;

const Wrapper: React.FC<FetchResponse> = (props) => (
  <AdminSubscriptionOrderListContextProvider mockResponse={props}>
    <NowDateContextProvider now={new Date(2023, 0, 1, 9)}>
      <SubscriptionOrderTemplate />
    </NowDateContextProvider>
  </AdminSubscriptionOrderListContextProvider>
);

type Story = ComponentStoryObj<typeof Wrapper>;

export default { title: ScreenName.adminsSubscriptionOrder, component: Wrapper };

export const Default: Story = {
  args: {
    data: subscriptionOrderListMock,
    error: null,
    isLoading: false,
    isEmptyList: false,
    mutate: async () => undefined,
  },
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
};

export const Loading: Story = { args: { ...Default.args, data: null, isLoading: true } };

export const FetchError: Story = { args: { ...Default.args, data: null, error: Error('Occurred data fetch error') } };

export const EmptyData: Story = { args: { ...Default.args, data: [], isEmptyList: true } };
