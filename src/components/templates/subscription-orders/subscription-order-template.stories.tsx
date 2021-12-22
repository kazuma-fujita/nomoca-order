import type { ComponentStoryObj } from '@storybook/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from 'components/organisms/subscription-orders/subscription-order-list/subscription-order-list.stories';
import { SubscriptionOrderTemplate } from './subscription-order-template';

const { Default } = composeStories(stories);

type Story = ComponentStoryObj<typeof SubscriptionOrderTemplate>;

export default { component: SubscriptionOrderTemplate };

export const Template: Story = {
  args: { listComponent: <Default />, now: new Date(2023, 0, 1, 9) },
};
