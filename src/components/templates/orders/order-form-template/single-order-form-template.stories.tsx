import type { ComponentStoryObj } from '@storybook/react';
import { OrderType } from 'API';
import { ClinicContextProvider } from 'hooks/clinics/use-fetch-clinic';
import { orderFormDefaultValues } from 'hooks/orders/use-order-form';
import { clinicMock } from 'mocks/clinic.mock';
import { productListMock } from 'mocks/product.mock';
import { staffListMock } from 'mocks/staff.mock';
import { graphql, setupWorker } from 'msw';
import { useEffect } from 'react';
import { OrderFormParamContextProvider } from 'stores/use-order-form-param';
import { ProductListContextProvider } from 'stores/use-product-list';
import { StaffListContextProvider } from 'stores/use-staff-list';
import { OrderFormTemplate } from './order-form-template';

type Story = ComponentStoryObj<typeof OrderFormTemplate>;

export default { component: OrderFormTemplate };

export const Default: Story = {
  decorators: [
    (StoryComponent) => (
      <ProductListContextProvider
        orderType={OrderType.singleOrder}
        isFilterByActiveProduct={true}
        isRevalidateOnFocus={false}
      >
        <StaffListContextProvider isFilterByActiveStaff={true} isRevalidateOnFocus={false}>
          <OrderFormParamContextProvider
            orderType={OrderType.singleOrder}
            initialOrderFormParam={orderFormDefaultValues}
          >
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

export const EmptyClinic: Story = {
  ...Default,
  parameters: {
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
              items: [],
            },
          };
          return res(ctx.data(response));
        }),
      ],
    },
  },
};
