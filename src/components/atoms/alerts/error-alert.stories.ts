import { ErrorAlert } from './error-alert';
import type { ComponentStoryObj } from '@storybook/react';

type Story = ComponentStoryObj<typeof ErrorAlert>;

export default { component: ErrorAlert };

export const SingleLine: Story = { args: { children: 'Error Message.' } };
export const MultiLine: Story = {
  args: { children: 'Error Message.\nError Message.\nError Message.' },
};
