import type { ComponentStoryObj } from '@storybook/react';
import { ClinicContextProvider } from 'hooks/clinics/use-fetch-clinic';
import { clinicMock } from 'mocks/clinic.mock';
import { adminOrderListMock, orderListMock } from 'mocks/order-list.mock';
import { graphql } from 'msw';
import { SingleOrderTemplate } from './single-order-template';

const description = `

## Use Case

description

	dummy
	dummy

## Specs

## Back Office Ops

`;

type Story = ComponentStoryObj<typeof SingleOrderTemplate>;

export default { component: SingleOrderTemplate };

export const Default: Story = {
  decorators: [
    (StoryComponent) => (
      <ClinicContextProvider>
        <StoryComponent />
      </ClinicContextProvider>
    ),
  ],
};

Default.parameters = {
  docs: {
    description: {
      component: description,
    },
  },
  msw: {
    handlers: [
      graphql.query('ListOrdersSortedByCreatedAt', (req, res, ctx) => {
        const response = {
          listOrdersSortedByCreatedAt: {
            items: adminOrderListMock,
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

// export const Loading: Story = {
//   ...Default,
//   args: { isLoading: true },
// };

// export const Empty: Story = {
//   ...Default,
//   args: { isEmptyList: true },
// };

// export const FetchError: Story = {
//   ...Default,
//   args: { error: Error('The API fetched data but it returned null.') },
// };
