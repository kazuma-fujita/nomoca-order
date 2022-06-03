import type { ComponentStoryObj } from '@storybook/react';
import { OrderType } from 'API';
import { OrderFormParamContextProvider } from 'stores/use-order-form-param';
import { CompleteOrderTemplate } from './complete-order-template';

type Story = ComponentStoryObj<typeof CompleteOrderTemplate>;

export default { title: '注文入力完了', component: CompleteOrderTemplate };

export const Default: Story = {};

Default.decorators = [
  (StoryComponent) => (
    <OrderFormParamContextProvider orderType={OrderType.singleOrder}>
      <StoryComponent />
    </OrderFormParamContextProvider>
  ),
];
