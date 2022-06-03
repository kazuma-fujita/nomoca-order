import type { ComponentStoryObj } from '@storybook/react';
import { Clinic, OrderType, Product, Staff } from 'API';
import { ClinicContextProvider } from 'hooks/clinics/use-fetch-clinic';
import { orderFormDefaultValues } from 'hooks/orders/use-input-order';
import { ProductListContextProvider } from 'hooks/products/use-fetch-product-list';
import { StaffListContextProvider } from 'hooks/staffs/use-fetch-staff-list';
import { FetchResponse } from 'hooks/swr/use-fetch';
import { clinicMock } from 'mocks/clinic.mock';
import { productListMock } from 'mocks/product.mock';
import { staffListMock } from 'mocks/staff.mock';
import { OrderFormParamContextProvider } from 'stores/use-order-form-param';
import { OrderFormTemplate } from './order-form-template';

const description = `

## Use Case

description

	dummy
	dummy

## Specs

## Back Office Ops

`;

type Props = {
  products: FetchResponse<Product[]>;
  staff: FetchResponse<Staff[]>;
  clinic: FetchResponse<Clinic | null>;
};

const Wrapper: React.FC<Props> = ({ products, staff, clinic }) => (
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
