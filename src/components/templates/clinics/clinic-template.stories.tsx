import type { ComponentStoryObj } from '@storybook/react';
import { ScreenName } from 'constants/screen-name';
import { ClinicContextProvider } from 'hooks/clinics/use-fetch-clinic';
import { FetchResponse } from 'hooks/swr/use-fetch';
import { clinicMock } from 'mocks/clinic.mock';
import { ClinicTemplate } from './clinic-template';

const description = `

# Use Case

## 顧客ユースケース

- 顧客は本画面上で発送先情報を新規登録・変更する
- 1アカウントに対して1発送先のみ登録可能
- 郵便番号入力時、都道府県、市区町村を自動補完
- 登録した発送先情報は顧客が利用する注文・定期便入力画面の発送先項目に反映される

# Specs

## 配送先

| 項目 | 仕様 |
| ---: | :--- |
| 医院名 | 長い文字列は折返し表示 |
| 郵便番号 | ハイフン無し7桁表示 |
| 住所 | 都道府県市区町村番地建物名表示 |
| 電話番号 | ハイフン無し10 or 11桁表示 |

## 配送先を作成/編集するダイアログ

### 共通

- Validation エラー文言はTextBox下部に表示
- 文字列はtrim処理後フォーム送信

### 医院名

| 項目 | 値 |
| ---: | :--- |
| 必須 | ◯ |
| 種類 | TextBox |
| 型 | All types of characters |
| 最大桁 | 256 |

### 郵便番号

- 郵便番号入力時、Google Geo API経由で都道府県、市区町村を自動補完

| 項目 | 値 |
| ---: | :--- |
| 必須 | ◯ |
| 種類 | TextBox |
| 型 | Numeric |
| 最小桁 | 7 |
| 最大桁 | 7 |
| 備考 | ハイフンを除く整数値を入力 |

### 都道府県

| 項目 | 値 |
| ---: | :--- |
| 必須 | ◯ |
| 種類 | TextBox |
| 型 | All types of characters |
| 最小桁 | 3 |
| 最大桁 | 4 |
| 備考 | 47都道府県以外はValidationエラー |

### 市区町村

| 項目 | 値 |
| ---: | :--- |
| 必須 | ◯ |
| 種類 | TextBox |
| 型 | All types of characters |
| 最大桁 | 256 |
| 備考 | 半角記号、空白、数学記号、通貨記号、音声記号、絵文字、機種依存文字はValidationエラー |

### 番地

| 項目 | 値 |
| ---: | :--- |
| 必須 | ◯ |
| 種類 | TextBox |
| 型 | All types of characters |
| 最大桁 | 256 |
| 備考 | ハイフン「-」を除く半角記号、空白、数学記号、通貨記号、音声記号、絵文字、機種依存文字はValidationエラー |

### 建物名・部屋番号

| 項目 | 値 |
| ---: | :--- |
| 必須 | - |
| 種類 | TextBox |
| 型 | All types of characters |
| 最大桁 | 256 |
| 備考 | 「!"#%&'()-.,」を除く半角記号、数学記号、通貨記号、音声記号、絵文字、機種依存文字はValidationエラー <br /> 但し、建物名・部屋番号の間など、文字列中の空白はありえる為許可 |

### 電話番号

| 項目 | 値 |
| ---: | :--- |
| 必須 | ◯ |
| 種類 | TextBox |
| 型 | Numeric |
| 最小桁 | 10 |
| 最大桁 | 11 |
| 備考 | ハイフンを除く整数値を入力 |

`;

const Wrapper: React.FC<FetchResponse> = (props) => (
  <ClinicContextProvider mockResponse={props}>
    <ClinicTemplate />
  </ClinicContextProvider>
);

type Story = ComponentStoryObj<typeof Wrapper>;

export default { title: ScreenName.clinic, component: Wrapper };

export const Default: Story = {
  args: {
    data: clinicMock,
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

// type Story = ComponentStoryObj<typeof ClinicTemplate>;

// export default { component: ClinicTemplate };

// export const Default: Story = {
//   decorators: [
//     (StoryComponent) => (
//       <ClinicContextProvider>
//         <StoryComponent />
//       </ClinicContextProvider>
//     ),
//   ],
// };

// Default.parameters = {
//   msw: {
//     handlers: [
//       graphql.query('ListClinics', (req, res, ctx) => {
//         const response = {
//           listClinics: {
//             items: [clinicMock],
//           },
//         };
//         return res(ctx.data(response));
//       }),
//     ],
//   },
// };

// export const Empty: Story = {
//   ...Default,
//   parameters: {
//     msw: {
//       handlers: [
//         graphql.query('ListClinics', (req, res, ctx) => {
//           const response = {
//             listClinics: {
//               items: [],
//             },
//           };
//           return res(ctx.data(response));
//         }),
//       ],
//     },
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
