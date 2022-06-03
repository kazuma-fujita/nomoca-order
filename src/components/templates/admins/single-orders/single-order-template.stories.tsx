import type { ComponentStoryObj } from '@storybook/react';
import { OrderListContextProvider } from 'hooks/orders/use-fetch-order-list';
import { FetchResponse } from 'hooks/swr/use-fetch';
import { adminOrderListMock } from 'mocks/order-list.mock';
import { SingleOrderTemplate } from './single-order-template';
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
  <OrderListContextProvider mockResponse={props}>
    <SingleOrderTemplate />
  </OrderListContextProvider>
);

type Story = ComponentStoryObj<typeof Wrapper>;

export default { title: ScreenName.adminsSingleOrder, component: Wrapper };

export const Default: Story = {
  args: {
    data: adminOrderListMock,
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
