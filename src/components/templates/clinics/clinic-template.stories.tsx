import type { ComponentStoryObj } from '@storybook/react';
import { ClinicContextProvider } from 'hooks/clinics/use-fetch-clinic';
import { clinicMock } from 'mocks/clinic.mock';
import { graphql } from 'msw';
import { ClinicTemplate } from './clinic-template';

type Story = ComponentStoryObj<typeof ClinicTemplate>;

export default { component: ClinicTemplate };

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
  // docs: {
  //   description: {
  //     component: description,
  //   },
  // },
  msw: {
    handlers: [
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

export const Empty: Story = {
  ...Default,
  parameters: {
    msw: {
      handlers: [
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

// export const Loading: Story = {
//   args: { isLoading: true },
// };

// export const Empty: Story = {
//   args: { isEmptyList: true },
// };

// export const FetchError: Story = {
//   args: { error: Error('The API fetched data but it returned null.') },
// };
