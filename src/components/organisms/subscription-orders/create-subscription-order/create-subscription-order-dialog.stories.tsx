import type { ComponentStoryObj } from '@storybook/react';
import { SubscriptionOrder } from 'API';
import { CreateSubscriptionOrderDialog, Props } from './create-subscription-order-dialog';
import { useForm, useFieldArray } from 'react-hook-form';
import { userEvent, screen } from '@storybook/testing-library';
import { defaultValues } from './create-subscription-order-dialog-container';
import { NowDateContextProvider } from 'stores/use-now-date';

const Wrapper: React.FC<Props> = (props) => {
  const formReturn = useForm<SubscriptionOrder>({ defaultValues });
  const { handleSubmit, control } = formReturn;
  const fieldArrayReturn = useFieldArray({ control, name: 'products.items' });
  const submitHandler = handleSubmit((data: SubscriptionOrder) => console.log(data));
  const copy = {
    ...props,
    formReturn: formReturn,
    fieldArrayReturn: fieldArrayReturn,
    submitHandler: submitHandler,
  };
  return <CreateSubscriptionOrderDialog {...copy} />;
};

type Story = ComponentStoryObj<typeof Wrapper>;

export default { component: Wrapper };

export const Default: Story = {
  args: { on: true },
  decorators: [
    (StoryComponent) => (
      <NowDateContextProvider now={new Date(2023, 0, 1, 9)}>
        <StoryComponent />
      </NowDateContextProvider>
    ),
  ],
};

export const Loading: Story = {
  ...Default,
  args: { ...Default.args, isLoading: true },
};

export const ErrorAlert: Story = {
  ...Default,
  args: { ...Default.args, error: Error('It occurred an async error.') },
};
