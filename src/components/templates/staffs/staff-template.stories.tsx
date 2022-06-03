import type { ComponentStoryObj } from '@storybook/react';
import { ScreenName } from 'constants/screen-name';
import { StaffListContextProvider } from 'hooks/staffs/use-fetch-staff-list';
import { FetchResponse } from 'hooks/swr/use-fetch';
import { staffListMock } from 'mocks/staff.mock';
import { StaffTemplate } from './staff-template';

const description = `

## Use Case

description

	dummy
	dummy

## Specs

## Back Office Ops

`;

const Wrapper: React.FC<FetchResponse> = (props) => (
  <StaffListContextProvider isFilterByActiveStaff={false} mockResponse={props}>
    <StaffTemplate />
  </StaffListContextProvider>
);

type Story = ComponentStoryObj<typeof Wrapper>;

export default { title: ScreenName.staff, component: Wrapper };

export const Default: Story = {
  args: {
    data: staffListMock,
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

// type Story = ComponentStoryObj<typeof StaffTemplate>;

// export default { component: StaffTemplate };

// export const Default: Story = {
//   decorators: [
//     (StoryComponent) => (
//       <StaffListContextProvider isFilterByActiveStaff={false}>
//         <StoryComponent />
//       </StaffListContextProvider>
//     ),
//   ],
// };

// Default.parameters = {
//   // docs: {
//   //   description: {
//   //     component: description,
//   //   },
//   // },
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
//     ],
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
