import type { ComponentStoryObj } from '@storybook/react';
import { SubscriptionOrderTemplate } from 'components/templates/admins/subscription-orders/subscription-order-template';
import { AdminSubscriptionOrderListContextProvider } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { subscriptionOrderListMock } from 'mocks/subscription-order-list.mock';
import { NowDateContextProvider } from 'stores/use-now-date';
import { FetchResponse } from 'hooks/swr/use-fetch';
import { ScreenName } from 'constants/screen-name';

const description = `

# Use Case

## 前提

- 本画面は当月配送予定商品一覧とCSV出力ボタンで構成される
  - 解約済みの定期便商品は含まれない
	- 定期便申し込み日時降順で一覧表示
- 月に一度、業務は本システム上で当月発送分の定期便商品一覧CSVを出力し発注業務を行う
  - 商品管理画面の \`CSV出力\` 項目にチェックが入った商品のみCSV出力対象とする
  - 当月発送分のCSVは月に一度のみ出力可能。CSV出力後は翌月1日までCSV出力ボタンはクリック不可
- 本システムではCSV出力と顧客通知を同時に行う
  - CSV出力時、本システムから顧客へ発送通知メールを送信
  - CSV出力時、発送履歴をDB登録する。顧客は発送履歴を注文画面から閲覧可能

## 顧客ユースケース

- 顧客は本システム上で定期便申し込み・変更・解約をする
  - 顧客は配送開始月、配送頻度を指定可能
		- 配送開始月は翌月以降、6ヶ月先まで選択可能
		- 配送頻度は1〜6ヶ月の範囲で選択可能
  - 定期便申し込み・変更・解約完了時、完了メールをログインメールアドレス宛に受信
  - 定期便内容変更・解約は任意のタイミングで可能
- 配送予定月に発送通知メールを受信
- メール受信と共に注文画面から発送履歴を閲覧可能
  - 注文画面一覧に定期便商品が追加され、発送日時列に発送日時が表示される

## 業務ユースケース

- 顧客の定期便申し込み・変更・解約完了メールを業務・SHメーリングリストに受信
  - TODO: 配信メーリングリストが欲しい
- 月に一度、業務は本システム上で当月発送分の定期便商品一覧CSVを出力し発注業務を行う
- 業務は出力したCSVを元に新世紀に発注依頼、SFに登録作業を実施
- 業務は定期便の申し込み・変更・解約履歴を完了メールから確認する

# Specs

## 当月発送定期便をCSV出力して顧客に発送通知をするボタン

- 当月発送分定期便商品の一覧CSVを出力
- CSV出力後、顧客へ発送通知メールを送信
- CSV出力後、DBに発送履歴を作成。顧客は発送履歴を注文画面で閲覧可
- 当月発送分のCSVは一度のみ出力可能。CSV出力後は翌月1日までボタンクリック不可


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
