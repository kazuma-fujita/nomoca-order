import type { ComponentStoryObj } from '@storybook/react';
import { OrderType } from 'API';
import { OrderFormParamContextProvider } from 'stores/use-order-form-param';
import { CompleteOrderTemplate } from './complete-order-template';

const description = `

# Use Case

## 顧客ユースケース

- 顧客は本画面上で注文完了を確認する
- 注文完了時に完了メールを受信する
- 注文履歴を見るボタンを押下し注文画面へ遷移する
  - 注文画面上で注文履歴を閲覧可能
`;

type Story = ComponentStoryObj<typeof CompleteOrderTemplate>;

export default { title: '注文入力完了', component: CompleteOrderTemplate };

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
};

Default.decorators = [
  (StoryComponent) => (
    <OrderFormParamContextProvider orderType={OrderType.singleOrder}>
      <StoryComponent />
    </OrderFormParamContextProvider>
  ),
];
