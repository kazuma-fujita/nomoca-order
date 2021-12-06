import type { ComponentStoryObj } from '@storybook/react';
import { Staff } from 'API';
import { CreateStaffForm, Props } from './create-staff-form';
import { useForm } from 'react-hook-form';

const CreateStaffFormWrapper: React.FC<Props> = (props) => {
  const formReturn = useForm<Staff>({ defaultValues: { name: '' } });
  const copy = { ...props, formReturn: formReturn };
  return <CreateStaffForm {...copy} />;
};

type Story = ComponentStoryObj<typeof CreateStaffFormWrapper>;

export default { component: CreateStaffFormWrapper };

export const Default: Story = {
  args: { on: true },
};

// export const EmptyError = {
//   ...Default,
//   play: async () => userEvent.click(screen.getByText(/ログイン/i)),
// };
