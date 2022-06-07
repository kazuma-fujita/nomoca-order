import type { ComponentStoryObj } from '@storybook/react';
import { OrderListContextProvider } from 'hooks/orders/use-fetch-order-list';
import { FetchResponse } from 'hooks/swr/use-fetch';
import { adminOrderListMock } from 'mocks/order-list.mock';
import { SingleOrderTemplate } from './single-order-template';
import { ScreenName } from 'constants/screen-name';

const description = `

# Use Case

## 前提

- 本画面は注文商品一覧とCSV出力ボタンで構成される
  - 注文日時降順で一覧表示
- SH・業務は本システム上で未発送分の注文商品一覧CSVを出力し発注業務を行う
  - 本画面注文商品一覧のチェックボックスにチェックを入れた商品をCSV出力する
  - 商品管理画面の \`CSV出力\` 項目にチェックが入った商品のみCSV出力対象とする
- 本システムではCSV出力と顧客通知を同時に行う
  - CSV出力時、本システムから顧客へ発送通知メールを送信
  - CSV出力時、発送履歴をDB登録する。顧客は発送履歴を注文画面から閲覧可能
	- CSV出力時、発送状況が \`発送済\` となり、顧客による注文キャンセル不可
	- \`発送済\` に変更した顧客、業務注文一覧商品の発送日時列に発送日時を表示
  - 一度 \`発送済\` に変更した商品は \`未発送\` 状態に差し戻し不可

## 顧客ユースケース

- 顧客は本システム上で注文・注文キャンセルをする
  - 顧客は通常、速達配送どちらかの配送方法を指定可能
  - 注文・注文キャンセル完了時、完了メールをログインメールアドレス宛に受信
	- 注文キャンセルは発送状況が \`未発送\` 時のみ可能
- 商品発送日に発送通知メールを受信
- メール受信と共に注文画面から発送履歴を閲覧可能

## 業務ユースケース

- 顧客の注文・注文キャンセル完了メールを業務・SHメーリングリストに受信
  - TODO: 配信メーリングリストが欲しい
- SH・業務は本システム上で未発送分の注文便商品一覧CSVを出力し発注業務を行う
- SH・業務は出力したCSVを元に在庫から出荷、新世紀に発注依頼、SFに登録作業を実施
- SH・業務は注文・注文キャンセル履歴を完了メールから確認する

# Specs

## 当月発送定期便をCSV出力して顧客に発送通知をするボタン

- 当月発送分定期便商品の一覧CSVを出力
- CSV出力後、顧客へ発送通知メールを送信
- CSV出力後、DBに発送履歴を作成。顧客は発送履歴を注文画面で閲覧可
- 当月発送分のCSVは一度のみ出力可能。CSV出力後は翌月1日までボタンクリック不可


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
