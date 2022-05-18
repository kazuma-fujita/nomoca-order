import type { ComponentStoryObj } from '@storybook/react';
import { OrderType } from 'API';
import { OrderFormParamContextProvider } from 'stores/use-order-form-param';
import { CompleteOrderTemplate } from './complete-order-template';

type Story = ComponentStoryObj<typeof CompleteOrderTemplate>;

export default { component: CompleteOrderTemplate };

export const Default: Story = {};

Default.decorators = [
  (StoryComponent) => (
    <OrderFormParamContextProvider orderType={OrderType.subscriptionOrder}>
      <StoryComponent />
    </OrderFormParamContextProvider>
  ),
];
