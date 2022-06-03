import type { ComponentStoryObj } from '@storybook/react';
import { OrderType } from 'API';
import { ScreenName } from 'constants/screen-name';
import { SubscriptionOrderListContextProvider } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { FetchResponse } from 'hooks/swr/use-fetch';
import { subscriptionOrderListMock } from 'mocks/subscription-order-list.mock';
import { NowDateContextProvider } from 'stores/use-now-date';
import { OrderFormParamContextProvider } from 'stores/use-order-form-param';
import { OrderListTemplate } from './order-list-template';

const description = `

## Use Case

description

	dummy
	dummy

## Specs

## Back Office Ops

`;

const Wrapper: React.FC<FetchResponse> = (props) => (
  <SubscriptionOrderListContextProvider mockResponse={props}>
    <OrderFormParamContextProvider orderType={OrderType.subscriptionOrder}>
      <NowDateContextProvider now={new Date(2023, 0, 1, 9)}>
        <OrderListTemplate />
      </NowDateContextProvider>
    </OrderFormParamContextProvider>
  </SubscriptionOrderListContextProvider>
);

type Story = ComponentStoryObj<typeof Wrapper>;

export default { title: ScreenName.subscriptionOrder, component: Wrapper };

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
