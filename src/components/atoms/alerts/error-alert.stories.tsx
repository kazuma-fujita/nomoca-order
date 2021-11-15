import { ErrorAlert } from './error-alert';
import { ComponentStoryObj } from '@storybook/react';

export default { component: ErrorAlert };

export const SingleLine: ComponentStoryObj<typeof ErrorAlert> = { args: { children: 'Error Message.' } };
export const MultiLine: ComponentStoryObj<typeof ErrorAlert> = {
  args: { children: 'Error Message.\nError Message.\nError Message.' },
};
