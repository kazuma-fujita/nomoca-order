import { Add } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { Staff } from 'API';
import { useCreateStaff } from 'hooks/staffs/use-create-staff';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useToggle } from 'react-use';
import { InputStaffDialog } from './input-staff-dialog';
import { useStaffList } from 'stores/use-staff-list';

export const CreateStaffButton = () => {
  // const { handleSubmit, watch, register, formState } = useForm<Staff>();
  const useFormReturn = useForm<Staff>({ defaultValues: { name: '' } });
  const { handleSubmit, reset: resetForm } = useFormReturn;
  const { createStaff, isLoading, error, resetState } = useCreateStaff();
  const [on, toggle] = useToggle(false);
  const { data: staffList, mutate } = useStaffList();
  const submitHandler = handleSubmit(
    useCallback(
      async (data: Staff) => {
        // await createStaff(staffList, mutate, data.name);
        await createStaff(data.name);
        if (!error) {
          resetForm();
          toggle();
        }
      },
      [staffList]
    )
  );
  const cancelHandler = useCallback(() => {
    resetForm();
    resetState();
    toggle();
  }, []);
  const label = '追加';
  return (
    <>
      <Button onClick={toggle} variant='outlined' startIcon={<Add />}>
        担当者を{label}する
      </Button>
      <InputStaffDialog
        label={label}
        startIcon={<Add />}
        on={on}
        isLoading={isLoading}
        error={error}
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
        useFormReturn={useFormReturn}
      />
    </>
  );
};
