import type { ComponentStoryObj } from '@storybook/react';
import { OrderType } from 'API';
import { OrderFormParamContextProvider } from 'stores/use-order-form-param';
import { CompleteOrderTemplate } from './complete-order-template';

const description = `

# Use Case

## 顧客ユースケース

- 顧客は本画面上で定期便申し込み完了を確認する
- 申し込み完了時に完了メールを受信する
- TOPへ戻るボタンを押下し定期便申し込み画面へ遷移する
  - 定期便申し込み画面上で申し込み履歴を閲覧可能
`;

type Story = ComponentStoryObj<typeof CompleteOrderTemplate>;

export default { title: '定期便入力完了', component: CompleteOrderTemplate };

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
    <OrderFormParamContextProvider orderType={OrderType.subscriptionOrder}>
      <StoryComponent />
    </OrderFormParamContextProvider>
  ),
];
