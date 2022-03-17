import type { ComponentStoryObj } from '@storybook/react';
import { OrderType } from 'API';
import { ProductTemplate } from 'components/templates/admins/products/product-template';
import { productListMock } from 'mocks/product.mock';
import { graphql } from 'msw';
import { ProductListContextProvider } from 'stores/use-product-list';

type Story = ComponentStoryObj<typeof ProductTemplate>;

export default { component: ProductTemplate };

export const Default: Story = {
  decorators: [
    (StoryComponent) => (
      <ProductListContextProvider isFilterByActiveProduct={false} orderType={OrderType.singleOrder}>
        <StoryComponent />
      </ProductListContextProvider>
    ),
  ],
};

Default.parameters = {
  // docs: {
  //   description: {
  //     component: description,
  //   },
  // },
  msw: {
    handlers: [
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

// export const Loading: Story = {
//   args: { isLoading: true },
// };

// export const Empty: Story = {
//   args: { isEmptyList: true },
// };

// export const FetchError: Story = {
//   args: { error: Error('The API fetched data but it returned null.') },
// };