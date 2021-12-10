import { Staff } from 'API';
import { useCreateStaff } from 'hooks/staffs/use-create-staff';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { CreateStaffForm } from './create-staff-form';

type Props = {
  on: boolean;
  toggle: (nextValue?: any) => void;
};

export const CreateStaffFormContainer = ({ on, toggle }: Props) => {
  const formReturn = useForm<Staff>({ defaultValues: { name: '' } });
  const { handleSubmit, reset: resetForm } = formReturn;
  const { createStaff, isLoading, error, resetState } = useCreateStaff();

  const cancelHandler = useCallback(() => {
    resetForm();
    resetState();
    toggle();
  }, [resetForm, resetState, toggle]);

  const submitHandler = handleSubmit(
    useCallback(
      async (data: Staff) => {
        try {
          await createStaff(data.name);
          cancelHandler();
        } catch (error) {}
      },
      [cancelHandler, createStaff],
    ),
  );

  return (
    <CreateStaffForm
      formReturn={formReturn}
      on={on}
      isLoading={isLoading}
      error={error}
      submitHandler={submitHandler}
      cancelHandler={cancelHandler}
    />
  );
};
