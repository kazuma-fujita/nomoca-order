import type { ComponentStoryObj } from '@storybook/react';
import { OrderType } from 'API';
import { ScreenName } from 'constants/screen-name';
import { OrderListContextProvider } from 'hooks/orders/use-fetch-single-order-list';
import { FetchResponse } from 'hooks/swr/use-fetch';
import { orderListMock } from 'mocks/order-list.mock';
import { OrderFormParamContextProvider } from 'stores/use-order-form-param';
import { OrderListTemplate } from './order-list-template';

const description = `

# Use Case

## 顧客ユースケース

- 顧客は本画面上で注文・注文キャンセルをする
  - 顧客は通常、速達配送どちらかの配送方法を指定可能
  - 注文・注文キャンセル完了時、完了メールを受信
- 注文キャンセルは一覧上のキャンセルボタンから実行する
  - 発送状況が \`未発送\` 時のみ注文キャンセル可能
  - 発送状況が \`発送済\` \`注文キャンセル\` の場合、注文キャンセル不可
  - 一度 \`注文キャンセル\` に変更した商品は \`未発送\` 状態に差し戻し不可
- 商品発送日に発送通知メールを受信
- メール受信と共に注文画面から発送履歴を閲覧可能
  - 注文画面一覧の発送日時列に発送日時が表示される


	顧客は本画面で定期便の発送履歴を確認可能
	定期便を申し込み済みで、定期便が配送された場合、一覧上に配送方法が定期便ラベルの行が追加される。
	発送日時に業務による定期便CSV出力日時が表示され、注文キャンセルボタンはクリック不可。


# Specs

## 注文一覧

- 一覧表示順は注文日時降順

| 項目 | 仕様 |
| ---: | :--- |
| 商品 | 注文商品表示 |
| 注文日時 | 定期便作成日時。表記:yyyy/MM/dd 24HH:mm |
| 配送方法 | 速達配送 / 通常配送 / 定期便 ラベル表示 |
| 発送状況 | 未発送 / 発送済 / 注文キャンセル ラベル表示 |
| 発送日時 | CSV出力日時。表記:yyyy/MM/dd 24HH:mm |
| 注文キャンセル | 注文キャンセル確認ダイアログ表示。発送状況が発送済、配送方法が定期便の場合クリック不可 |

## 商品を注文するボタン

| 項目 | 値 |
| ---: | :--- |
| 種類 | Button |
| アクション | 注文画面へ遷移 |

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
