import type { ComponentStoryObj } from '@storybook/react';
import { DeliveryType, OrderType } from 'API';
import Amplify from '@aws-amplify/core';
import { productListMock } from 'mocks/product.mock';
import { staffListMock } from 'mocks/staff.mock';
import { graphql } from 'msw';
import { OrderFormParam, OrderFormParamContextProvider } from 'stores/use-order-form-param';
import { ProductListContextProvider } from 'stores/use-product-list';
import { StaffListContextProvider } from 'stores/use-staff-list';
import { SingleOrderFormTemplate } from './single-order-form-template';
import awsconfig from 'aws-exports';
import { singleOrderFormDefaultValues } from 'components/organisms/single-orders/create-single-order-button';

// Cognito認証でAppSyncを実行するとNo current user errorが発生する為、API_KEY認証に切り替え
Amplify.configure({ ...awsconfig, aws_appsync_authenticationType: 'API_KEY' });

type Story = ComponentStoryObj<typeof SingleOrderFormTemplate>;

export default { component: SingleOrderFormTemplate };

export const Default: Story = {
  decorators: [
    (StoryComponent) => (
      <ProductListContextProvider orderType={OrderType.singleOrder} isFilterByActiveProduct={true}>
        <StaffListContextProvider isFilterByActiveStaff={true}>
          <OrderFormParamContextProvider
            orderType={OrderType.singleOrder}
            initialOrderFormParam={singleOrderFormDefaultValues}
          >
            <StoryComponent />
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
    ],
  },
};
