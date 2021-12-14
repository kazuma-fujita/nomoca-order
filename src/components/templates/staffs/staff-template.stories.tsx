import type { ComponentStoryObj } from '@storybook/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from 'components/organisms/staffs/staff-list/staff-list.stories';
import { StaffTemplate } from './staff-template';

const { Default } = composeStories(stories);

type Story = ComponentStoryObj<typeof StaffTemplate>;

export default { component: StaffTemplate };

export const Template: Story = {
  args: { listComponent: <Default /> },
};
