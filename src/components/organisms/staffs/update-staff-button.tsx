import { Edit } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { Staff } from 'API';
import { useUpdateStaff } from 'hooks/staffs/use-update-staff';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useToggle } from 'react-use';
import { InputStaffDialog } from './input-staff-dialog';

type Props = {
  id: string;
  name: string;
};

export const UpdateStaffButton = (props: Props) => {
  // const useFormReturn = useForm<Staff>({ defaultValues: { name: props.name } });
  const useFormReturn = useForm<Staff>();
  const { handleSubmit, reset: resetForm, clearErrors } = useFormReturn;
  const { updateStaff, isLoading, error, resetState } = useUpdateStaff();
  const [on, toggle] = useToggle(false);
  // useEffect(() => {
  //   resetForm({ name: props.name });
  // }, []);
  const submitHandler = handleSubmit(
    useCallback(async (data: Staff) => {
      await updateStaff(props.id, data.name);
      if (!error) {
        // cancelHandler();
        clearErrors();
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
      <Button onClick={toggle} variant='outlined' startIcon={<Edit fontSize='small' />}>
        {label}
      </Button>
      <InputStaffDialog
        label={label}
        startIcon={<Edit />}
        on={on}
        isLoading={isLoading}
        error={error}
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
        useFormReturn={useFormReturn}
        name={props.name}
      />
    </>
  );
};
