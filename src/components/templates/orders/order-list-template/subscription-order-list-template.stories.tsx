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
  - 定期便は1申し込みのみ可能。複数定期便は作成不可
  - 定期便申し込み、変更、解約完了時、完了メールを受信
  - 定期便内容変更・解約は任意のタイミングで可能
- 配送予定月に発送通知メールを受信
- メール受信と共に注文画面から発送履歴を閲覧可能
  - 注文画面一覧に定期便商品が追加され、発送日時列に発送日時が表示される

# Specs

## 定期便一覧

- 一覧表示順は定期便申し込み日時降順

| 項目 | 仕様 |
| ---: | :--- |
| 商品 | 注文商品表示 |
| 配送開始月 | 表記:yyyy/MM月 |
| 配送頻度 | 表記:Nヶ月 |
| 次回配送予定月 | 表記:yyyy/MM月 |
| 申し込み日時 | 定期便作成日時。表記:yyyy/MM/dd 24HH:mm |
| 更新日時 | 定期便更新日時。表記:yyyy/MM/dd 24HH:mm |
| 注文内容変更 | 定期便更新画面へ遷移 |
| 定期便解約 | 定期便解約確認ダイアログ表示 |

## 定期便を申し込むボタン

- 既に定期便が作成済みの場合ボタンクリック不可

| 項目 | 値 |
| ---: | :--- |
| 種類 | Button |
| アクション | 定期便申し込み画面へ遷移 |

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
