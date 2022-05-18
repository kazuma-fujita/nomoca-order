import type { ComponentStoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { Props, SubscriptionOrderSearchForm } from './subscription-order-search-form';
import { SubscriptionOrderSearchParams } from './subscription-order-search-form-container';

const Wrapper: React.FC<Props> = (props) => {
  const { handleSubmit, control } = useForm<SubscriptionOrderSearchParams>();
  const submitHandler = handleSubmit((data: SubscriptionOrderSearchParams) => console.log(data));
  return (
    <SubscriptionOrderSearchForm
      isLoading={props.isLoading}
      error={props.error}
      submitHandler={submitHandler}
      control={control}
    />
  );
};

type Story = ComponentStoryObj<typeof Wrapper>;

export default { component: Wrapper };

export const Default: Story = {
  args: { isLoading: false },
};

export const Loading: Story = {
  args: { ...Default.args, isLoading: true },
};

export const ErrorAlert: Story = {
  args: { ...Default.args, error: Error('The input values are out of range.') },
};
