import { Edit } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { Staff } from 'API';
import { useUpdateStaff } from 'hooks/staffs/use-update-staff';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useToggle } from 'react-use';
import { InputStaffDialog } from './input-staff-dialog';

type Props = {
  id: string;
  name: string;
};

export const UpdateStaffButton = (props: Props) => {
  // const { handleSubmit, watch, register, formState } = useForm<Staff>();
  const useFormReturn = useForm<Staff>({ defaultValues: { name: props.name } });
  const { handleSubmit, reset: resetForm } = useFormReturn;
  const { updateStaff, isLoading, error, resetState } = useUpdateStaff();
  const [on, toggle] = useToggle(false);
  const submitHandler = handleSubmit(
    useCallback(async (data: Staff) => {
      await updateStaff(props.id, data.name);
      if (!error) {
        resetForm();
        toggle();
      }
    }, [])
  );
  const cancelHandler = useCallback(() => {
    resetForm();
    resetState();
    toggle();
  }, []);
  const label = '編集';
  return (
    <>
      <Button onClick={toggle} variant='outlined' startIcon={<Edit />}>
        {label}
      </Button>
      <InputStaffDialog
        label={label}
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
