import type { ComponentStoryObj } from '@storybook/react';
import { Staff, Type } from 'API';
import { StaffList } from './staff-list';
import { staffListMock } from 'mocks/staff.mock';

type Story = ComponentStoryObj<typeof StaffList>;

export default { component: StaffList };

export const Default: Story = {
  args: { data: staffListMock },
};

export const Loading: Story = {
  args: { isLoading: true },
};

export const Empty: Story = {
  args: { isEmptyList: true },
};

export const FetchError: Story = {
  args: { error: Error('The API fetched data but it returned null.') },
};
