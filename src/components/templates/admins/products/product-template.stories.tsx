import type { ComponentStoryObj } from '@storybook/react';
import { OrderType } from 'API';
import { ProductTemplate } from 'components/templates/admins/products/product-template';
import { ProductListContextProvider } from 'hooks/products/use-fetch-product-list';
import { FetchResponse } from 'hooks/swr/use-fetch';
import { productListMock } from 'mocks/product.mock';

const description = `

# Use Case

## SH・業務ユースケース

- SH・業務は本画面上で商品情報を新規登録・変更する
  - 登録した商品情報は顧客が利用する注文・定期便入力画面の商品プルダウンに反映される
  - CSV出力にチェックを入れて商品を登録すると、注文・定期便管理画面のCSV出力商品対象となる
- 本画面上で注文・定期便入力画面の商品プルダウン表示順を入れ替え可能
  - 本画面商品一覧の表示順は商品プルダウンの表示順となる
  - 一覧のプルダウン表示順アイコンをドラッグ&ドロップして商品の表示順入れ替えが可能
- 商品編集の無効にチェックを入れて登録すると、商品プルダウンから商品が非表示となる

# Specs

## 商品一覧

- 一覧表示順はプルダウン表示順昇順

| 項目 | 仕様 |
| ---: | :--- |
| 商品名 | 長い文字列は折返し表示 |
| 単価 | 3桁区切りでカンマ表示 |
| CSV出力 | 有効:◯ 無効:- |
| 無効 | 有効:◯ 無効:- |
| プルダウン表示順 | ドラッグ&ドロップで行の入れ替え実行 |
| 更新日時 | 商品編集日時。表記:yyyy/MM/dd 24HH:mm |

## 商品を追加するダイアログ

### 共通

- Validation エラー文言はTextBox下部に表示
- 文字列はtrim処理後フォーム送信

### 商品名

| 項目 | 値 |
| ---: | :--- |
| 必須 | ◯ |
| 種類 | TextBox |
| 型 | All types of characters |
| 最大桁 | 256 |

### 単価

| 項目 | 値 |
| ---: | :--- |
| 必須 | ◯ |
| 種類 | TextBox |
| 型 | Numeric |
| 最大桁 | 256 |

### CSV出力

- CSV出力にチェックを入れて商品を登録すると、注文・定期便管理画面のCSV出力商品対象となる

| 項目 | 値 |
| ---: | :--- |
| 必須 | - |
| 種類 | CheckBox |
| 型 | Boolean |
| 最大桁 | - |
| 備考 | - |

## 商品を編集するダイアログ

### 共通

- Validation エラー文言はTextBox下部に表示
- 商品名、単価、CSV出力項目は商品追加ダイアログと同様仕様

### 無効

- 商品編集の無効にチェックを入れて登録すると、商品プルダウンから商品が非表示となる

| 項目 | 値 |
| ---: | :--- |
| 必須 | - |
| 種類 | CheckBox |
| 型 | Boolean |
| 最大桁 | - |
| 備考 | - |

`;

const Wrapper: React.FC<FetchResponse> = (props) => (
  <ProductListContextProvider isFilterByActiveProduct={false} orderType={OrderType.singleOrder} mockResponse={props}>
    <ProductTemplate />
  </ProductListContextProvider>
);

type Story = ComponentStoryObj<typeof Wrapper>;

export default { title: '商品管理', component: Wrapper };

export const Default: Story = {
  args: {
    data: productListMock,
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

// type Story = ComponentStoryObj<typeof ProductTemplate>;

// export default { component: ProductTemplate };

// export const Default: Story = {
//   decorators: [
//     (StoryComponent) => (
//       <ProductListContextProvider isFilterByActiveProduct={false} orderType={OrderType.singleOrder}>
//         <StoryComponent />
//       </ProductListContextProvider>
//     ),
//   ],
// };

// Default.parameters = {
//   msw: {
//     handlers: [
//       graphql.query('ListProductsSortedByViewOrder', (req, res, ctx) => {
//         const response = {
//           listProductsSortedByViewOrder: {
//             items: productListMock,
//           },
//         };
//         return res(ctx.data(response));
//       }),
//     ],
//   },
// };
