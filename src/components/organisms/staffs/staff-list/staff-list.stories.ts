import type { ComponentStoryObj } from '@storybook/react';
import { Staff } from 'API';
import { StaffList } from './staff-list';
import { ObjectType } from 'constants/object-type';

type Story = ComponentStoryObj<typeof StaffList>;

export default { component: StaffList };

// const defaultTask = TaskItemStories.Default.args?.task as Task;

const item: Staff = {
  __typename: ObjectType.Staff,
  id: '',
  name: '',
  type: ObjectType.Staff,
  viewOrder: 1,
  disabled: false,
  createdAt: '2021-11-25T14:32:55Z',
  updatedAt: '2021-11-25T14:32:55Z',
};

const items: Staff[] = [...Array(3)].map((_, i) => ({
  ...item,
  id: `dummyId-${i + 1}`,
  name: `担当者${i + 1}`,
  viewOrder: i + 1,
  updatedAt: new Date(2021, 1 + i, 2 + i, 12 + i, 30 + i, 0).toISOString(),
}));

export const Default: Story = {
  args: { data: items },
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

// export const WithPinnedTasks: Story = {
//   args: {
//     tasks: [
//       ...defaultTasks.slice(0, 5),
//       {
//         id: '6',
//         title: 'Task 6 (pinned)',
//         state: 'TASK_PINNED',
//         updatedAt: new Date(2021, 0, 10, 10, 0),
//       },
//     ],
//   },
// };

// export const Loading: Story = {
//   args: { tasks: [], loading: true },
// };
