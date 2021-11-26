import type { ComponentStoryObj } from '@storybook/react';
import { Staff } from 'API';
import { StaffList } from './staff-list';
import { ObjectType } from 'constants/object-type';

type Story = ComponentStoryObj<typeof StaffList>;

export default { component: StaffList };

// const defaultTask = TaskItemStories.Default.args?.task as Task;

const items: Staff[] = [
  {
    __typename: ObjectType.Staff,
    id: 'dummyId1',
    name: '山田 太郎',
    type: ObjectType.Staff,
    viewOrder: 1,
    disabled: false,
    createdAt: '2021-11-25T14:32:55Z',
    updatedAt: '2021-11-25T14:32:55Z',
  },
  {
    __typename: ObjectType.Staff,
    id: 'dummyId2',
    name: '佐藤 花子',
    type: ObjectType.Staff,
    viewOrder: 2,
    disabled: false,
    createdAt: '2021-11-25T14:32:55Z',
    updatedAt: '2021-12-01T15:03:21Z',
  },
  {
    __typename: ObjectType.Staff,
    id: 'dummyId3',
    name: '鈴木 正男',
    type: ObjectType.Staff,
    viewOrder: 3,
    disabled: true,
    createdAt: '2021-11-25T14:32:55Z',
    updatedAt: '2021-12-09T09:02:21Z',
  },
];

// const defaultTasks = Array.from({ length: 6 }, (_, i) => ({
//   ...defaultTask,
//   id: `${i + 1}`,
//   title: `Task ${i + 1}`,
// }));

export const Default: Story = {
  args: { data: items },
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

// export const Empty: Story = {
//   args: { ...Loading.args, loading: false },
// };
