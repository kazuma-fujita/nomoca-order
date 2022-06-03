import type { ComponentStoryObj } from '@storybook/react';
import { OrderType } from 'API';
import { ScreenName } from 'constants/screen-name';
import { OrderListContextProvider } from 'hooks/orders/use-fetch-order-list';
import { FetchResponse } from 'hooks/swr/use-fetch';
import { orderListMock } from 'mocks/order-list.mock';
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
  <OrderListContextProvider mockResponse={props}>
    <OrderFormParamContextProvider orderType={OrderType.singleOrder}>
      <OrderListTemplate />
    </OrderFormParamContextProvider>
  </OrderListContextProvider>
);

type Story = ComponentStoryObj<typeof Wrapper>;

export default { title: ScreenName.singleOrder, component: Wrapper };

export const Default: Story = {
  args: {
    data: orderListMock,
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
