import { Add, Edit } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { Product, Staff } from 'API';
import { InputDialog } from 'components/molecules/dialogs/input-dialog';
import { DisabledCheckbox } from 'components/molecules/checkboxes/disabled-checkbox';
import { FirstNameTextField } from 'components/molecules/text-fields/first-name-text-field';
import { LastNameTextField } from 'components/molecules/text-fields/last-name-text-field';
import { useUpsertStaffForm } from 'hooks/staffs/use-upsert-staff-form';
import { UseFormReturn } from 'react-hook-form';
import { Box } from '@mui/material';
import { useCallback } from 'react';

type Props = {
  staff?: Staff;
};

export const UpsertStaffButton = ({ staff }: Props) => {
  const { useFormReturn, submitButtonLabel, dialogTitle, on, toggle, isLoading, error, submitHandler, cancelHandler } =
    useUpsertStaffForm(staff);

  const buttonIcon = staff ? <Edit /> : <Add />;
  const onButtonClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      toggle();
      // buttonのフォーカスを外す
      e.currentTarget.blur();
    },
    [toggle],
  );

  return (
    <>
      <Button onClick={onButtonClick} variant='outlined' startIcon={buttonIcon}>
        {dialogTitle}
      </Button>
      <InputDialog
        dialogTitle={dialogTitle}
        submitButtonLabel={submitButtonLabel}
        startIcon={buttonIcon}
        on={on}
        formId='staff-form'
        isLoading={isLoading}
        error={error}
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
      >
        <>
          <Box display='flex'>
            <LastNameTextField {...useFormReturn} disabled={isLoading} />
            <Box component='span' ml={2} />
            <FirstNameTextField {...useFormReturn} disabled={isLoading} />
          </Box>
          {staff && (
            <DisabledCheckbox
              {...(useFormReturn as UseFormReturn<Staff | Product, object>)}
              helperTextLabel={'発注担当者'}
              isDisabled={staff ? staff.disabled : false}
              disabled={isLoading}
            />
          )}
        </>
      </InputDialog>
    </>
  );
};
