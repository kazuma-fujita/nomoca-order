import Amplify from '@aws-amplify/core';
import type { ComponentStoryObj } from '@storybook/react';
import { DeliveryType, OrderType } from 'API';
import awsconfig from 'aws-exports';
import { ClinicContextProvider } from 'hooks/clinics/use-fetch-clinic';
import { clinicMock } from 'mocks/clinic.mock';
import { createNormalizedProductsMock, productListMock } from 'mocks/product.mock';
import { staffListMock } from 'mocks/staff.mock';
import { graphql } from 'msw';
import { OrderFormParam, OrderFormParamContextProvider } from 'stores/use-order-form-param';
import { ProductListContextProvider } from 'stores/use-product-list';
import { StaffListContextProvider } from 'stores/use-staff-list';
import { ConfirmOrderTemplate } from './confirm-order-template';

// Cognito認証でAppSyncを実行するとNo current user errorが発生する為、API_KEY認証に切り替え
Amplify.configure({ ...awsconfig, aws_appsync_authenticationType: 'API_KEY' });

type Story = ComponentStoryObj<typeof ConfirmOrderTemplate>;

export default { component: ConfirmOrderTemplate };

const defaultValues: OrderFormParam = {
  products: createNormalizedProductsMock(3),
  staffID: 'dummyStaffID-1',
  deliveryType: DeliveryType.regular,
};

export const Default: Story = {
  decorators: [
    (StoryComponent) => (
      <ProductListContextProvider
        orderType={OrderType.singleOrder}
        isFilterByActiveProduct={true}
        isRevalidateOnFocus={false}
      >
        <StaffListContextProvider isFilterByActiveStaff={true} isRevalidateOnFocus={false}>
          <OrderFormParamContextProvider orderType={OrderType.singleOrder} initialOrderFormParam={defaultValues}>
            <ClinicContextProvider>
              <StoryComponent />
            </ClinicContextProvider>
          </OrderFormParamContextProvider>
        </StaffListContextProvider>
      </ProductListContextProvider>
    ),
  ],
};

Default.parameters = {
  msw: {
    handlers: [
      graphql.query('ListStaffSortedByViewOrder', (req, res, ctx) => {
        const response = {
          listStaffSortedByViewOrder: {
            items: staffListMock,
          },
        };
        return res(ctx.data(response));
      }),
      graphql.query('ListProductsSortedByViewOrder', (req, res, ctx) => {
        const response = {
          listProductsSortedByViewOrder: {
            items: productListMock,
          },
        };
        return res(ctx.data(response));
      }),
      graphql.query('ListClinics', (req, res, ctx) => {
        const response = {
          listClinics: {
            items: [clinicMock],
          },
        };
        return res(ctx.data(response));
      }),
    ],
  },
};

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
