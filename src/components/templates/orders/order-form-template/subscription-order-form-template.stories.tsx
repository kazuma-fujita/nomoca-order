import type { ComponentStoryObj } from '@storybook/react';
import { OrderType } from 'API';
import { ClinicContextProvider } from 'hooks/clinics/use-fetch-clinic';
import { ProductListContextProvider } from 'hooks/products/use-fetch-product-list';
import { StaffListContextProvider } from 'hooks/staffs/use-fetch-staff-list';
import { clinicMock } from 'mocks/clinic.mock';
import { productListMock } from 'mocks/product.mock';
import { staffListMock } from 'mocks/staff.mock';
import { NowDateContextProvider } from 'stores/use-now-date';
import { OrderFormParam, OrderFormParamContextProvider } from 'stores/use-order-form-param';
import { OrderFormStorybookProps } from 'types/storybook-types';
import { OrderFormTemplate } from './order-form-template';

const description = `

# Use Case

## 顧客ユースケース

- 顧客は本画面上で定期便商品を入力する
  - 任意の商品、個数を選択可能
  - 数量は1〜25個の範囲で選択
  - 選択した商品、個数を計算し単価・金額・税・合計金額をプレビュー表示
  - 商品追加・削除ボタンで購入商品の追加・削除が可能
  - 複数の商品プルダウンで同一商品を選択した場合、確認画面では個数を合算した1商品のみ表示
- 配送開始月を選択する
  - 翌月以降、6ヶ月先まで選択可能
- 配送頻度
  - 1, 2, 3, 4, 6ヶ月の範囲で選択可能
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

### 配送開始月

| 項目 | 値 |
| ---: | :--- |
| 必須 | ◯ |
| 種類 | SelectBox |
| 型 | Numeric |
| 初期値 | 翌月 |
| 選択範囲 | 翌月 - 6ヶ月先 |

### 配送頻度

| 項目 | 値 |
| ---: | :--- |
| 必須 | ◯ |
| 種類 | SelectBox |
| 型 | Numeric |
| 初期値 | 1ヶ月 |
| 選択範囲 | 1, 2, 3, 4, 6ヶ月 |

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

const orderFormDefaultValues: OrderFormParam = {
  id: '',
  products: [{ relationID: '', productID: '', name: '', unitPrice: 0, quantity: 1, isExportCSV: true }],
  staffID: '',
  clinicID: '',
};

const Wrapper: React.FC<OrderFormStorybookProps> = ({ products, staff, clinic }) => (
  <ProductListContextProvider
    orderType={OrderType.subscriptionOrder}
    isFilterByActiveProduct={true}
    isRevalidateOnFocus={false}
    mockResponse={products}
  >
    <StaffListContextProvider isFilterByActiveStaff={true} isRevalidateOnFocus={false} mockResponse={staff}>
      <ClinicContextProvider mockResponse={clinic}>
        <OrderFormParamContextProvider
          orderType={OrderType.subscriptionOrder}
          initialOrderFormParam={orderFormDefaultValues}
        >
          <NowDateContextProvider now={new Date(2022, 5, 1, 9)}>
            <OrderFormTemplate />
          </NowDateContextProvider>
        </OrderFormParamContextProvider>
      </ClinicContextProvider>
    </StaffListContextProvider>
  </ProductListContextProvider>
);

type Story = ComponentStoryObj<typeof Wrapper>;

export default { title: '定期便入力', component: Wrapper };

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
