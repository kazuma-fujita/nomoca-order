import type { ComponentStoryObj } from '@storybook/react';
import { OrderType } from 'API';
import { ClinicContextProvider } from 'hooks/clinics/use-fetch-clinic';
import { orderFormDefaultValues } from 'hooks/orders/use-input-order';
import { ProductListContextProvider } from 'hooks/products/use-fetch-product-list';
import { StaffListContextProvider } from 'hooks/staffs/use-fetch-staff-list';
import { clinicMock } from 'mocks/clinic.mock';
import { productListMock } from 'mocks/product.mock';
import { staffListMock } from 'mocks/staff.mock';
import { NowDateContextProvider } from 'stores/use-now-date';
import { OrderFormParamContextProvider } from 'stores/use-order-form-param';
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
  - 1〜6ヶ月の範囲で選択可能
- 配送先を作成、または編集する
  - 1アカウント1配送先のみ登録可能
  - 配送先登録が無ければ \`配送先を作成する\` ボタンを表示
	- 配送先登録済みの場合 \`配送先を編集する\` ボタンを表示
- 発注担当者を選択、または追加する
  - 発注担当者登録が無ければ  \`発注担当者を追加する\` ボタンを表示
  - 発注担当者登録済みの場合、発注担当者プルダウンと \`発注担当者を追加する\` ボタンを表示
- 確認ボタンを押下し注文確認画面へ遷移する

# Specs

## 一覧画面

- 注文日時降順で一覧表示

## 当月発送定期便をCSV出力して顧客に発送通知をするボタン

- 当月発送分定期便商品の一覧CSVを出力
- CSV出力後、顧客へ発送通知メールを送信
- CSV出力後、DBに発送履歴を作成。顧客は発送履歴を注文画面で閲覧可
- 当月発送分のCSVは一度のみ出力可能。CSV出力後は翌月1日までボタンクリック不可


`;

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

// type Story = ComponentStoryObj<typeof OrderFormTemplate>;

// export default { component: OrderFormTemplate };

// export const Default: Story = {
//   decorators: [
//     (StoryComponent) => (
//       <ProductListContextProvider
//         orderType={OrderType.subscriptionOrder}
//         isFilterByActiveProduct={true}
//         isRevalidateOnFocus={false}
//       >
//         <StaffListContextProvider isFilterByActiveStaff={true} isRevalidateOnFocus={false}>
//           <OrderFormParamContextProvider
//             orderType={OrderType.subscriptionOrder}
//             initialOrderFormParam={orderFormDefaultValues}
//           >
//             <NowDateContextProvider now={new Date(2022, 3, 1, 9)}>
//               <ClinicContextProvider>
//                 <StoryComponent />
//               </ClinicContextProvider>
//             </NowDateContextProvider>
//           </OrderFormParamContextProvider>
//         </StaffListContextProvider>
//       </ProductListContextProvider>
//     ),
//   ],
// };

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
