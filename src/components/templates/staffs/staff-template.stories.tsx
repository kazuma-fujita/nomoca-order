import type { ComponentStoryObj } from '@storybook/react';
import { ScreenName } from 'constants/screen-name';
import { StaffListContextProvider } from 'hooks/staffs/use-fetch-staff-list';
import { FetchResponse } from 'hooks/swr/use-fetch';
import { staffListMock } from 'mocks/staff.mock';
import { StaffTemplate } from './staff-template';

const description = `

# Use Case

## 顧客ユースケース

- 顧客は本画面上で発注担当者情報を新規登録・変更する
  - 登録した情報は顧客が利用する注文・定期便入力画面の発注担当者プルダウンに反映される
- 本画面上で注文・定期便入力画面の発注担当者プルダウン表示順を入れ替え可能
  - 本画面発注担当者一覧の表示順は発注担当者プルダウンの表示順となる
  - 一覧のプルダウン表示順アイコンをドラッグ&ドロップして発注担当者の表示順入れ替えが可能
- 発注担当者編集の無効にチェックを入れて登録すると、発注担当者プルダウンから発注担当者が非表示となる

# Specs

## 発注担当者一覧

- 一覧表示順はプルダウン表示順昇順

| 項目 | 仕様 |
| ---: | :--- |
| 発注担当者名 | 長い文字列は折返し表示 |
| 無効 | 有効:◯ 無効:- |
| プルダウン表示順 | ドラッグ&ドロップで行の入れ替え実行 |
| 更新日時 | 担当者編集日時。表記:yyyy/MM/dd 24HH:mm |

## 発注担当者を追加するダイアログ

### 共通

- Validation エラー文言はTextBox下部に表示
- 文字列はtrim処理後フォーム送信

### 性

| 項目 | 値 |
| ---: | :--- |
| 必須 | ◯ |
| 種類 | TextBox |
| 型 | All types of characters |
| 最大桁 | 256 |

### 名

| 項目 | 値 |
| ---: | :--- |
| 必須 | ◯ |
| 種類 | TextBox |
| 型 | All types of characters |
| 最大桁 | 256 |

## 発注担当者を編集するダイアログ

### 共通

- Validation エラー文言はTextBox下部に表示
- 性・名項目は発注担当者追加ダイアログと同様仕様

### 無効

- 発注担当者編集の無効にチェックを入れて登録すると、発注担当者プルダウンから発注担当者が非表示となる

| 項目 | 値 |
| ---: | :--- |
| 必須 | - |
| 種類 | CheckBox |
| 型 | Boolean |
| 最大桁 | - |
| 備考 | - |

`;

const Wrapper: React.FC<FetchResponse> = (props) => (
  <StaffListContextProvider isFilterByActiveStaff={false} mockResponse={props}>
    <StaffTemplate />
  </StaffListContextProvider>
);

type Story = ComponentStoryObj<typeof Wrapper>;

export default { title: ScreenName.staff, component: Wrapper };

export const Default: Story = {
  args: {
    data: staffListMock,
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

// type Story = ComponentStoryObj<typeof StaffTemplate>;

// export default { component: StaffTemplate };

// export const Default: Story = {
//   decorators: [
//     (StoryComponent) => (
//       <StaffListContextProvider isFilterByActiveStaff={false}>
//         <StoryComponent />
//       </StaffListContextProvider>
//     ),
//   ],
// };

// Default.parameters = {
//   // docs: {
//   //   description: {
//   //     component: description,
//   //   },
//   // },
//   msw: {
//     handlers: [
//       graphql.query('ListStaffSortedByViewOrder', (req, res, ctx) => {
//         const response = {
//           listStaffSortedByViewOrder: {
//             items: staffListMock,
//           },
//         };
//         return res(ctx.data(response));
//       }),
//     ],
//   },
// };

// export const Loading: Story = {
//   args: { isLoading: true },
// };

// export const Empty: Story = {
//   args: { isEmptyList: true },
// };

// export const FetchError: Story = {
//   args: { error: Error('The API fetched data but it returned null.') },
// };
