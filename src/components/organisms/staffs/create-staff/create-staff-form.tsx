import { Add } from '@mui/icons-material';
import { Staff } from 'API';
import { InputDialog } from 'components/atoms/dialogs/input-dialog';
import { StaffNameTextField } from 'components/atoms/text-fields/staff-name-text-field';
import { BaseSyntheticEvent } from 'react';
import { UseFormReturn } from 'react-hook-form';

export type Props = {
  formReturn: UseFormReturn<Staff, object>;
  on: boolean;
  isLoading: boolean;
  error: Error | null;
  submitHandler: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  cancelHandler: () => void;
};

export const CreateStaffForm = ({ formReturn, on, isLoading, error, submitHandler, cancelHandler }: Props) => {
  const submitButtonLabel = '追加する';
  const label = `担当者を${submitButtonLabel}`;
  return (
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
      <StaffNameTextField {...formReturn} disabled={isLoading} />
    </InputDialog>
  );
};
