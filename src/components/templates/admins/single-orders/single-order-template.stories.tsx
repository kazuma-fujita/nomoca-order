import type { ComponentStoryObj } from '@storybook/react';
import { OrderListContextProvider } from 'hooks/orders/use-fetch-single-order-list';
import { FetchResponse } from 'hooks/swr/use-fetch';
import { adminOrderListMock } from 'mocks/order-list.mock';
import { SingleOrderTemplate } from './single-order-template';
import { ScreenName } from 'constants/screen-name';
import { NowDateContextProvider } from 'stores/use-now-date';

const description = `

# Use Case

## 仕様

- 顧客の注文を本画面注文一覧に表示。注文は発送状況別(未発送・発送済・発送キャンセル)にフィルタリング可能
- 顧客の注文・注文キャンセル時メールは業務・SHメーリングリスト(orders-admin@genova)に受信
- 本画面注文商品一覧のチェックボックスにチェックを入れた商品をCSV出力する
- 商品管理画面の \`CSV出力\` 項目にチェックが入った商品のみCSV出力対象とする
- CSV出力時、本システムから顧客へ発送通知メールを送信
- CSV出力時、発送状況が \`発送済\` となり、顧客による注文キャンセル不可
- CSV出力した注文の発送日時列に発送日時を表示
- 一度 \`発送済\` に変更した商品は \`未発送\` 状態に差し戻し不可


	CSV出力項目にチェックが入っていな商品のみの注文の場合、
	CSV出力ボタン押下時、その注文はCSV出力対象外とし、顧客への発送通知と発送履歴のDB登録のみ実行する


## 顧客ユースケース

- 顧客は本システム上で注文・注文キャンセルをする
  - 顧客は通常、速達配送どちらかの配送方法を指定可能
  - 注文・注文キャンセル完了時、完了メールを受信
  - 注文キャンセルは発送状況が \`未発送\` 時のみ可能
- 業務によるCSV出力時に顧客は商品発送通知メールを受信する
- 顧客注文一覧画面から商品発送状況、発送日を閲覧可能

## 業務ユースケース

- SH・業務は本システム上で未発送分の注文便商品一覧CSVを出力し発注業務を行う
- SH・業務は出力したCSVを元に在庫から出荷、新世紀に発注依頼、SFに登録作業を実施
- CSV出力されない商品に関しては個別に社内在庫、社外倉庫から発送手配を行う
- CSV出力されない商品に関しても個別発送後の注文キャンセル防止の為、CSV出力して発送状況を \`発送済\` にする

# Specs

## 注文一覧

- 一覧表示順は注文日時降順

| 項目 | 仕様 |
| ---: | :--- |
| 商品 | 注文商品表示 |
| 選択チェックボックス | 選択時、CSV出力ボタン有効。複数選択可 |
| 医院名 | 長い文字列は折返し表示 |
| 電話番号 | 整数値10〜11桁 |
| 配送先ボタン | ボタン押下時、医院名、住所、電話番号、発注担当者ポップアップ表示 |
| 注文日時 | 定期便作成日時。表記:yyyy/MM/dd 24HH:mm |
| 配送方法 | 速達配送 / 通常配送 ラベル表示 |
| 発送状況 | 未発送 / 発送済 / 注文キャンセル ラベル表示 |
| 発送日時 | CSV出力日時。表記:yyyy/MM/dd 24HH:mm |

## 選択した注文をCSV出力して顧客に発送通知をするボタン

- 本画面注文商品一覧のチェックボックスにチェックを入れた商品をCSV出力
- チェックボックス選択時、ボタン有効化
- 商品管理画面の \`CSV出力\` 項目にチェックが入った商品のみCSV出力対象とする
- CSV出力時、本システムから顧客へ発送通知メールを送信
- CSV出力時、発送履歴をDB登録する。顧客は発送履歴を注文画面から閲覧可能
- CSV出力時、発送状況が \`発送済\` となり、顧客による注文キャンセル不可
- \`発送済\` に変更した顧客、業務注文一覧商品の発送日時列に発送日時を表示
- 一度 \`発送済\` に変更した商品は \`未発送\` 状態に差し戻し不可

## CSV仕様

| 項目 | 値 |
| ---: | :--- |
| ファイル形式 | CSV形式テキストファイル |
| 文字コード | Shift-JIS |
| 改行コード | CR+LF |
| レコード長 | 可変長 |
| 区切り文字 | カンマ |
| 文字列 | ダブルクオートで囲む |

`;

const Wrapper: React.FC<FetchResponse> = (props) => (
  <OrderListContextProvider mockResponse={props}>
    <NowDateContextProvider now={new Date()}>
      <SingleOrderTemplate />
    </NowDateContextProvider>
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
