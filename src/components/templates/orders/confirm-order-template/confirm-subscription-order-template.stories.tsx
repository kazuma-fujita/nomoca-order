import type { ComponentStoryObj } from '@storybook/react';
import { OrderType } from 'API';
import { ProductListContextProvider } from 'hooks/products/use-fetch-product-list';
import { StaffListContextProvider } from 'hooks/staffs/use-fetch-staff-list';
import { clinicMock } from 'mocks/clinic.mock';
import { createNormalizedProductsMock, productListMock } from 'mocks/product.mock';
import { staffListMock } from 'mocks/staff.mock';
import { OrderFormParam, OrderFormParamContextProvider } from 'stores/use-order-form-param';
import { OrderFormStorybookProps } from 'types/storybook-types';
import { ClinicContextProvider } from 'hooks/clinics/use-fetch-clinic';
import { ConfirmOrderTemplate } from './confirm-order-template';

const description = `

# Use Case

## 顧客ユースケース

- 顧客は本画面上で入力商品情報を確認する
  - 入力した商品の数量、単価、金額、小計、税、合計金額を表示
  - 入力画面の複数の商品プルダウンで同一商品を選択した場合、本画面では個数を合算した1商品のみ表示
- 配送開始月、配送頻度、配送先、発注担当者を確認する
- 注文ボタンを押下し注文完了画面へ遷移する

# Specs

## 商品

`;

const defaultValues: OrderFormParam = {
  products: createNormalizedProductsMock(3),
  staffID: 'dummyStaffID-1',
  deliveryStartYear: 2022,
  deliveryStartMonth: 3,
  deliveryInterval: 3,
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
        <OrderFormParamContextProvider orderType={OrderType.subscriptionOrder} initialOrderFormParam={defaultValues}>
          <ConfirmOrderTemplate />
        </OrderFormParamContextProvider>
      </ClinicContextProvider>
    </StaffListContextProvider>
  </ProductListContextProvider>
);

type Story = ComponentStoryObj<typeof Wrapper>;

export default { title: '定期便入力確認', component: Wrapper };

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

// export const Loading: Story = {
//   args: {
//     ...Default.args,
//     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//     products: { ...Default.args!.products!, data: null, isLoading: true },
//     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//     staff: { ...Default.args!.staff!, data: null, isLoading: true },
//     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//     clinic: { ...Default.args!.clinic!, data: null, isLoading: true },
//   },
// };

// export const FetchError: Story = {
//   args: {
//     ...Default.args,
//     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//     products: { ...Default.args!.products!, data: null, error: Error('Occurred data fetch error') },
//     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//     staff: { ...Default.args!.staff!, data: null, error: Error('Occurred data fetch error') },
//     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//     clinic: { ...Default.args!.clinic!, data: null, error: Error('Occurred data fetch error') },
//   },
// };

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

// type Story = ComponentStoryObj<typeof ConfirmOrderTemplate>;

// export default { component: ConfirmOrderTemplate };

// export const Default: Story = {
//   decorators: [
//     (StoryComponent) => (
//       <ProductListContextProvider
//         orderType={OrderType.subscriptionOrder}
//         isFilterByActiveProduct={true}
//         isRevalidateOnFocus={false}
//       >
//         <StaffListContextProvider isFilterByActiveStaff={true} isRevalidateOnFocus={false}>
//           <OrderFormParamContextProvider orderType={OrderType.subscriptionOrder} initialOrderFormParam={defaultValues}>
//             <ClinicContextProvider>
//               <StoryComponent />
//             </ClinicContextProvider>
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

// export const Default: Story = {
//   args: {
//     products: products,
//     deliveryTypeLabel: '通常配送',
//     staffName: '発注担当者1',
//     isLoading: false,
//     error: null,
//     submitHandler: async () => {},
//   },
//   parameters: {
//     nextRouter: {
//       path: '/single-order',
//       query: {
//         screen: 'input',
//       },
//     },
//   },
// };

// export const Loading: Story = {
//   ...Default,
//   args: { ...Default.args, isLoading: true },
// };

// export const ErrorAlert: Story = {
//   ...Default,
//   args: { ...Default.args, error: Error('It occurred an async error.') },
// };
