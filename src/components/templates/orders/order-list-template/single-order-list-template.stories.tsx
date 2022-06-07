import type { ComponentStoryObj } from '@storybook/react';
import { OrderType } from 'API';
import { ScreenName } from 'constants/screen-name';
import { OrderListContextProvider } from 'hooks/orders/use-fetch-order-list';
import { FetchResponse } from 'hooks/swr/use-fetch';
import { orderListMock } from 'mocks/order-list.mock';
import { OrderFormParamContextProvider } from 'stores/use-order-form-param';
import { OrderListTemplate } from './order-list-template';

const description = `

# Use Case

## 顧客ユースケース

- 顧客は本画面上で注文・注文キャンセルをする
  - 顧客は通常、速達配送どちらかの配送方法を指定可能
  - 注文・注文キャンセル完了時、完了メールをログインメールアドレス宛に受信
- 注文キャンセルは一覧上のキャンセルボタンから実行する
	- 発送状況が \`未発送\` 時のみ注文キャンセル可能
  - 発送状況が \`発送済\` \`注文キャンセル\` の場合、注文キャンセル不可
  - 一度 \`注文キャンセル\` に変更した商品は \`未発送\` 状態に差し戻し不可
- 商品発送日に発送通知メールをログインメールアドレス宛に受信
- メール受信と共に注文画面から発送履歴を閲覧可能
  - 注文画面一覧の発送日時列に発送日時が表示される

# Specs

## 一覧画面

- 注文日時降順で一覧表示

## 当月発送定期便をCSV出力して顧客に発送通知をするボタン

- 当月発送分定期便商品の一覧CSVを出力
- CSV出力後、顧客へ発送通知メールを送信
- CSV出力後、DBに発送履歴を作成。顧客は発送履歴を注文画面で閲覧可
- 当月発送分のCSVは一度のみ出力可能。CSV出力後は翌月1日までボタンクリック不可


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
