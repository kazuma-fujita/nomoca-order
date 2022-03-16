import { Edit } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { Staff } from 'API';
import { StaffNameTextField } from 'components/molecules/text-fields/staff-name-text-field';
import { useUpdateStaff } from 'hooks/staffs/use-update-staff';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useToggle } from 'react-use';
import { InputDialog } from 'components/atoms/dialogs/input-dialog';

type Props = {
  id: string;
  name: string;
  disabled: boolean;
};

export const UpdateStaffButton = (props: Props) => {
  const useFormReturn = useForm<Staff>();
  const { handleSubmit, reset: resetForm, clearErrors } = useFormReturn;
  const { updateStaff, isLoading, error, resetState } = useUpdateStaff();
  const [on, toggle] = useToggle(false);

  const cancelHandler = useCallback(() => {
    resetForm();
    resetState();
    toggle();
  }, [resetForm, resetState, toggle]);

  const submitHandler = handleSubmit(
    useCallback(
      async (data: Staff) => {
        try {
          await updateStaff({ id: props.id, name: data.name, disabled: props.disabled });
          clearErrors();
          toggle();
        } catch (error) {}
      },
      [clearErrors, props.disabled, props.id, toggle, updateStaff],
    ),
  );

  const submitButtonLabel = '編集する';
  const label = `担当者を${submitButtonLabel}`;

  return (
    <>
      <Button onClick={toggle} variant='outlined' startIcon={<Edit fontSize='small' />}>
        {label}
      </Button>
      <InputDialog
        dialogTitle={label}
        submitButtonLabel={submitButtonLabel}
        startIcon={<Edit />}
        on={on}
        isLoading={isLoading}
        error={error}
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
      >
        <StaffNameTextField {...useFormReturn} disabled={isLoading} name={props.name} />
      </InputDialog>
    </>
  );
};
