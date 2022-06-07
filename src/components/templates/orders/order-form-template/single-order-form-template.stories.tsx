import type { ComponentStoryObj } from '@storybook/react';
import { OrderType } from 'API';
import { ClinicContextProvider } from 'hooks/clinics/use-fetch-clinic';
import { orderFormDefaultValues } from 'hooks/orders/use-input-order';
import { ProductListContextProvider } from 'hooks/products/use-fetch-product-list';
import { StaffListContextProvider } from 'hooks/staffs/use-fetch-staff-list';
import { clinicMock } from 'mocks/clinic.mock';
import { productListMock } from 'mocks/product.mock';
import { staffListMock } from 'mocks/staff.mock';
import { OrderFormParamContextProvider } from 'stores/use-order-form-param';
import { OrderFormStorybookProps } from 'types/storybook-types';
import { OrderFormTemplate } from './order-form-template';

const description = `

# Use Case

## 顧客ユースケース

- 顧客は本画面上で注文商品を選択する
  - 商品数量は1〜25個の範囲で選択
  - 選択した商品、個数を計算し単価・金額・税・合計金額をプレビュー表示
  - 商品追加・削除ボタンで購入商品の追加・削除が可能
- 配送方法を選択する
  - 通常配送、速達配送を選択可能
- 配送先を作成、または編集する
  - 1アカウント1配送先のみ登録可能
  - 配送先登録が無ければ \`配送先を作成する\` ボタンを表示
	- 配送先登録済みの場合 \`配送先を編集する\` ボタンを表示
- 発注担当者を選択、または追加する
  - 発注担当者登録が無ければ  \`発注担当者を追加する\` ボタンを表示
  - 発注担当者登録済みの場合、発注担当者プルダウンと \`発注担当者を追加する\` ボタンを表示
- 確認ボタンを押下し注文確認画面へ遷移する

# Specs

### 商品

| 項目 | 値 |
| ---: | :--- |
| 必須 | ◯ |
| 種類 | SelectBox |
| 型 | All types of characters |
| 最大桁 | 256 |

### 数量

| 項目 | 値 |
| ---: | :--- |
| 必須 | ◯ |
| 種類 | SelectBox |
| 型 | Numeric |
| 初期値 | 1 |
| 選択範囲 | 1 - 25 |

### 商品追加

| 項目 | 値 |
| ---: | :--- |
| 種類 | Button |
| アクション | 商品、数量プルダウン追加 |

### 商品削除

| 項目 | 値 |
| ---: | :--- |
| 種類 | Button |
| アクション | 商品、数量プルダウン削除 |

### 配送方法

- 速達配送を選択した場合、確認画面にて+1,000円(税別)加算

| 項目 | 値 |
| ---: | :--- |
| 必須 | ◯ |
| 種類 | Radio |
| 初期値 | 通常配送 |
| 選択範囲 | 通常配送 / 速達配送 |

### 配送先

- 1アカウント1配送先のみ登録可能
- 配送先登録が無ければ \`配送先を作成する\` ボタンを表示
- 配送先登録済みの場合 \`配送先を編集する\` ボタンを表示
- 入力フォーム仕様は以下参照
  - [**配送先仕様**](./?path=/docs/配送先--default)

### 発注担当者

- 発注担当者登録が無ければ  \`発注担当者を追加する\` ボタンを表示
- 発注担当者登録済みの場合、発注担当者プルダウンと \`発注担当者を追加する\` ボタンを表示
- 入力フォーム仕様は以下参照
  - [**発注担当者仕様**](./?path=/docs/発注担当者--default)

### 確認する

| 項目 | 値 |
| ---: | :--- |
| 種類 | Link |
| 遷移先 | 完了画面 |

### キャンセル

| 項目 | 値 |
| ---: | :--- |
| 種類 | Link |
| 遷移先 | 入力画面 |

`;

const Wrapper: React.FC<OrderFormStorybookProps> = ({ products, staff, clinic }) => (
  <ProductListContextProvider
    orderType={OrderType.singleOrder}
    isFilterByActiveProduct={true}
    isRevalidateOnFocus={false}
    mockResponse={products}
  >
    <StaffListContextProvider isFilterByActiveStaff={true} isRevalidateOnFocus={false} mockResponse={staff}>
      <ClinicContextProvider mockResponse={clinic}>
        <OrderFormParamContextProvider orderType={OrderType.singleOrder} initialOrderFormParam={orderFormDefaultValues}>
          <OrderFormTemplate />
        </OrderFormParamContextProvider>
      </ClinicContextProvider>
    </StaffListContextProvider>
  </ProductListContextProvider>
);

type Story = ComponentStoryObj<typeof Wrapper>;

export default { title: '注文入力', component: Wrapper };

export const Default: Story = {
  args: {
    products: {
      data: productListMock,
      error: null,
      isLoading: false,
      isEmptyList: false,
      mutate: async () => undefined,
    },
    staff: {
      data: staffListMock,
      error: null,
      isLoading: false,
      isEmptyList: false,
      mutate: async () => undefined,
    },
    clinic: {
      data: clinicMock,
      error: null,
      isLoading: false,
      isEmptyList: false,
      mutate: async () => undefined,
    },
  },
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    products: { ...Default.args!.products!, data: null, isLoading: true },
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    staff: { ...Default.args!.staff!, data: null, isLoading: true },
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    clinic: { ...Default.args!.clinic!, data: null, isLoading: true },
  },
};

export const FetchError: Story = {
  args: {
    ...Default.args,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    products: { ...Default.args!.products!, data: null, error: Error('Occurred data fetch error') },
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    staff: { ...Default.args!.staff!, data: null, error: Error('Occurred data fetch error') },
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    clinic: { ...Default.args!.clinic!, data: null, error: Error('Occurred data fetch error') },
  },
};

export const EmptyData: Story = {
  args: {
    ...Default.args,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    products: { ...Default.args!.products!, data: [], isEmptyList: true },
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    staff: { ...Default.args!.staff!, data: [], isEmptyList: true },
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    clinic: { ...Default.args!.clinic!, data: null, isEmptyList: true },
  },
};

// export const FetchError: Story = { args: { ...Default.args, data: null, error: Error('Occurred data fetch error') } };

// export const EmptyData: Story = { args: { ...Default.args, data: [], isEmptyList: true } };
// Default.parameters = {
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
//       graphql.query('ListProductsSortedByViewOrder', (req, res, ctx) => {
//         const response = {
//           listProductsSortedByViewOrder: {
//             items: productListMock,
//           },
//         };
//         return res(ctx.data(response));
//       }),
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
