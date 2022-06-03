import type { ComponentStoryObj } from '@storybook/react';
import { ScreenName } from 'constants/screen-name';
import { ClinicContextProvider } from 'hooks/clinics/use-fetch-clinic';
import { FetchResponse } from 'hooks/swr/use-fetch';
import { clinicMock } from 'mocks/clinic.mock';
import { ClinicTemplate } from './clinic-template';

const description = `

## Use Case

description

	dummy
	dummy

## Specs

## Back Office Ops

`;

const Wrapper: React.FC<FetchResponse> = (props) => (
  <ClinicContextProvider mockResponse={props}>
    <ClinicTemplate />
  </ClinicContextProvider>
);

type Story = ComponentStoryObj<typeof Wrapper>;

export default { title: ScreenName.clinic, component: Wrapper };

export const Default: Story = {
  args: {
    data: clinicMock,
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

// type Story = ComponentStoryObj<typeof ClinicTemplate>;

// export default { component: ClinicTemplate };

// export const Default: Story = {
//   decorators: [
//     (StoryComponent) => (
//       <ClinicContextProvider>
//         <StoryComponent />
//       </ClinicContextProvider>
//     ),
//   ],
// };

// Default.parameters = {
//   msw: {
//     handlers: [
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

// export const Empty: Story = {
//   ...Default,
//   parameters: {
//     msw: {
//       handlers: [
//         graphql.query('ListClinics', (req, res, ctx) => {
//           const response = {
//             listClinics: {
//               items: [],
//             },
//           };
//           return res(ctx.data(response));
//         }),
//       ],
//     },
//   },
// };

// export const Loading: Story = {
//   args: { isLoading: true },
// };

// export const Empty: Story = {
//   args: { isEmptyList: true },
// };

// export const FetchError: Story = {
//   args: { error: Error('The API fetched data but it returned null.') },
// };
