import { Add } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { Staff } from 'API';
import { StaffNameTextField } from 'components/atoms/text-fields/staff-name-text-field';
import { useCreateStaff } from 'hooks/staffs/use-create-staff';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useToggle } from 'react-use';
import { useStaffList } from 'stores/use-staff-list';
import { InputDialog } from 'components/atoms/dialogs/input-dialog';

export const CreateStaffButton = () => {
  const useFormReturn = useForm<Staff>({ defaultValues: { name: '' } });
  const { handleSubmit, reset: resetForm } = useFormReturn;
  const { createStaff, isLoading, error, resetState } = useCreateStaff();
  const [on, toggle] = useToggle(false);
  const { data: staffList } = useStaffList();
  const submitHandler = handleSubmit(
    useCallback(
      async (data: Staff) => {
        await createStaff(data.name);
        if (!error) {
          cancelHandler();
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
  const submitButtonLabel = '追加する';
  const label = `担当者を${submitButtonLabel}`;
  return (
    <>
      <Button onClick={toggle} variant='outlined' startIcon={<Add />}>
        {label}
      </Button>
      <InputDialog
        dialogTitle={label}
        submitButtonLabel={submitButtonLabel}
        startIcon={<Add />}
        on={on}
        isLoading={isLoading}
        error={error}
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
      >
        <StaffNameTextField {...useFormReturn} disabled={isLoading} />
      </InputDialog>
    </>
  );
};
