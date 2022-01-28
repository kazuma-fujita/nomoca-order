import type { ComponentStoryObj } from '@storybook/react';
import { Order } from 'API';
import { useFieldArray, useForm } from 'react-hook-form';
import { NowDateContextProvider } from 'stores/use-now-date';
import { CreateSingleOrderDialog, Props } from './create-single-order-dialog';
import { defaultValues } from './create-single-order-dialog-container';

const Wrapper: React.FC<Props> = (props) => {
  const formReturn = useForm<Order>({ defaultValues });
  const { handleSubmit, control } = formReturn;
  const fieldArrayReturn = useFieldArray({ control, name: 'products.items' });
  const submitHandler = handleSubmit((data: Order) => console.log(data));
  const copy = {
    ...props,
    formReturn: formReturn,
    fieldArrayReturn: fieldArrayReturn,
    submitHandler: submitHandler,
  };
  return <CreateSingleOrderDialog {...copy} />;
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
