import type { ComponentStoryObj } from '@storybook/react';
import { Staff } from 'API';
import { CreateStaffForm, Props } from './create-staff-form';
import { useForm } from 'react-hook-form';
import { userEvent, screen } from '@storybook/testing-library';

const CreateStaffFormWrapper: React.FC<Props> = (props) => {
  const formReturn = useForm<Staff>({ defaultValues: { name: '' } });
  const { handleSubmit } = formReturn;
  const submitHandler = handleSubmit((data: Staff) => console.log(data));
  const copy = { ...props, formReturn: formReturn, submitHandler: submitHandler };
  return <CreateStaffForm {...copy} />;
};

type Story = ComponentStoryObj<typeof CreateStaffFormWrapper>;

export default { component: CreateStaffFormWrapper };

export const Default: Story = {
  args: { on: true },
};

export const Loading: Story = {
  args: { ...Default.args, isLoading: true },
};

export const ErrorAlert: Story = {
  args: { ...Default.args, error: Error('It occurred an async error.') },
};

export const EmptyError = {
  ...Default,
  play: async () => userEvent.click(screen.getByText(/追加する/i)),
};
