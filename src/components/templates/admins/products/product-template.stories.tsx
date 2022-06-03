import type { ComponentStoryObj } from '@storybook/react';
import { OrderType } from 'API';
import { ProductTemplate } from 'components/templates/admins/products/product-template';
import { ProductListContextProvider } from 'hooks/products/use-fetch-product-list';
import { FetchResponse } from 'hooks/swr/use-fetch';
import { productListMock } from 'mocks/product.mock';

const description = `

## Use Case

description

	dummy
	dummy

## Specs

## Back Office Ops

`;

const Wrapper: React.FC<FetchResponse> = (props) => (
  <ProductListContextProvider isFilterByActiveProduct={false} orderType={OrderType.singleOrder} mockResponse={props}>
    <ProductTemplate />
  </ProductListContextProvider>
);

type Story = ComponentStoryObj<typeof Wrapper>;

export default { title: '商品管理', component: Wrapper };

export const Default: Story = {
  args: {
    data: productListMock,
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

// type Story = ComponentStoryObj<typeof ProductTemplate>;

// export default { component: ProductTemplate };

// export const Default: Story = {
//   decorators: [
//     (StoryComponent) => (
//       <ProductListContextProvider isFilterByActiveProduct={false} orderType={OrderType.singleOrder}>
//         <StoryComponent />
//       </ProductListContextProvider>
//     ),
//   ],
// };

// Default.parameters = {
//   msw: {
//     handlers: [
//       graphql.query('ListProductsSortedByViewOrder', (req, res, ctx) => {
//         const response = {
//           listProductsSortedByViewOrder: {
//             items: productListMock,
//           },
//         };
//         return res(ctx.data(response));
//       }),
//     ],
//   },
// };
