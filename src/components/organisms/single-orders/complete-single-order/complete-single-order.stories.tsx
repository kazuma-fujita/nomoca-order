import type { ComponentStoryObj } from '@storybook/react';
import { CompleteSingleOrder } from 'components/organisms/single-orders/complete-single-order/complete-single-order';

type Story = ComponentStoryObj<typeof CompleteSingleOrder>;

export default { component: CompleteSingleOrder };

export const Default: Story = {
  args: { onButtonClick: () => {} },
};
