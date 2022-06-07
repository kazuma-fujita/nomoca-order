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

# Use Case

## 顧客ユースケース

- 顧客は本画面上で定期便申し込み、変更、解約をする
  - 定期便申し込み、変更、解約完了時、完了メールをログインメールアドレス宛に受信
  - 定期便内容変更・解約は任意のタイミングで可能
- 配送予定月に発送通知メールを受信
- メール受信と共に注文画面から発送履歴を閲覧可能
  - 注文画面一覧に定期便商品が追加され、発送日時列に発送日時が表示される

# Specs

## 一覧画面

- 定期便申し込み日時降順で一覧表示

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
    data: [subscriptionOrderListMock[0]],
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
