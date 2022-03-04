import type { ComponentStoryObj } from '@storybook/react';
import { DeliveryType } from 'API';
import { useFieldArray, UseFieldArrayReturn, useForm } from 'react-hook-form';
import { OrderFormParam } from 'stores/use-order-form-param';
import { SingleOrderFormTemplate } from './single-order-form-template';

const defaultValues: OrderFormParam = {
  products: [{ relationID: '', productID: '', name: '', unitPrice: 0, quantity: 1 }],
  staffID: '',
  deliveryType: DeliveryType.regular,
};

const Wrapper: React.FC = () => {
  const formReturn = useForm<OrderFormParam>({ defaultValues });
  const { handleSubmit, control } = formReturn;
  const fieldArrayReturn = useFieldArray({ control, name: 'products' });
  const submitHandler = handleSubmit((data: OrderFormParam) => console.log(data));
  return (
    <SingleOrderFormTemplate
      formReturn={formReturn}
      fieldArrayReturn={fieldArrayReturn as UseFieldArrayReturn}
      submitHandler={submitHandler}
      cancelHandler={() => {}}
    />
  );
};

type Story = ComponentStoryObj<typeof Wrapper>;

export default { component: Wrapper };

export const Default: Story = {};

// export const Default: Story = {
//   args: { on: true },
// };

// export const Loading: Story = {
//   args: { ...Default.args, isLoading: true },
// };

// export const ErrorAlert: Story = {
//   args: { ...Default.args, error: Error('It occurred an async error.') },
// };

// export const EmptyError = {
//   ...Default,
//   play: async () => userEvent.click(screen.getByText(/追加する/i)),
// };
