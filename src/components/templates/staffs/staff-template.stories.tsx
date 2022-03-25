import type { ComponentStoryObj } from '@storybook/react';
import { staffListMock } from 'mocks/staff.mock';
import { graphql } from 'msw';
import { StaffListContextProvider } from 'hooks/staffs/use-fetch-staff-list';
import { StaffTemplate } from './staff-template';

type Story = ComponentStoryObj<typeof StaffTemplate>;

export default { component: StaffTemplate };

export const Default: Story = {
  decorators: [
    (StoryComponent) => (
      <StaffListContextProvider isFilterByActiveStaff={false}>
        <StoryComponent />
      </StaffListContextProvider>
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
      graphql.query('ListStaffSortedByViewOrder', (req, res, ctx) => {
        const response = {
          listStaffSortedByViewOrder: {
            items: staffListMock,
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
