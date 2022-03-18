import { Add, Edit } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { InputDialog } from 'components/molecules/dialogs/input-dialog';
import { useClinicForm } from 'hooks/clinics/use-clinic-form';
import { ClinicForm } from './clinic-form';

export const UpsertClinicButton = () => {
  const {
    formReturn,
    submitButtonLabel,
    dialogTitle,
    on,
    toggle,
    data,
    isLoading,
    error,
    submitHandler,
    cancelHandler,
    handleOnChangePostalCode,
  } = useClinicForm();
  const startIcon = data ? <Edit /> : <Add />;
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
        <ClinicForm isLoading={isLoading} handleOnChangePostalCode={handleOnChangePostalCode} {...formReturn} />
      </InputDialog>
    </>
  );
};
