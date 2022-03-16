import { Add, Edit } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { Product, Staff } from 'API';
import { InputDialog } from 'components/atoms/dialogs/input-dialog';
import { DisabledCheckbox } from 'components/molecules/checkboxes/disabled-checkbox';
import { StaffNameTextField } from 'components/molecules/text-fields/staff-name-text-field';
import { useUpsertStaffButton } from 'hooks/staffs/use-upsert-staff-button';
import { UseFormReturn } from 'react-hook-form';

type Props = {
  staff?: Staff;
};

export const UpsertStaffButton = ({ staff }: Props) => {
  const { useFormReturn, submitButtonLabel, dialogTitle, on, toggle, isLoading, error, submitHandler, cancelHandler } =
    useUpsertStaffButton(staff);
  const startIcon = staff ? <Edit /> : <Add />;
  return (
    <>
      <Button onClick={toggle} variant='outlined' startIcon={startIcon}>
        {dialogTitle}
      </Button>
      <InputDialog
        dialogTitle={dialogTitle}
        submitButtonLabel={submitButtonLabel}
        startIcon={startIcon}
        on={on}
        isLoading={isLoading}
        error={error}
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
      >
        <>
          <StaffNameTextField {...useFormReturn} disabled={isLoading} />
          <DisabledCheckbox
            {...(useFormReturn as UseFormReturn<Staff | Product, object>)}
            helperTextLabel={'担当者'}
            isDisabled={staff ? staff.disabled : false}
            disabled={isLoading}
          />
        </>
      </InputDialog>
    </>
  );
};
