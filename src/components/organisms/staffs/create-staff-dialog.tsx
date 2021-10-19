import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useToggle } from 'react-use';
import Form from '../../atoms/form';
import { useForm } from 'react-hook-form';
import { useCreateStaff } from 'hooks/staffs/use-create-staff';
import { Staff } from 'API';
import { StaffNameTextField } from 'components/atoms/staff-name-text-field';
import { Box } from '@mui/material';
import { ErrorAlert } from 'components/atoms/error-alert';
import { Add } from '@mui/icons-material';
import { useCallback } from 'react';

export const CreateStaffDialog = () => {
  // const { handleSubmit, watch, register, formState } = useForm<Staff>();
  const useFormReturn = useForm<Staff>({ defaultValues: { name: '' } });
  const { handleSubmit, reset: resetForm } = useFormReturn;
  const { createStaff, isLoading, error, resetState } = useCreateStaff();
  const [on, toggle] = useToggle(false);
  const submitHandler = useCallback(async (data: Staff) => {
    await createStaff(data.name);
    if (!error) {
      resetForm();
      toggle();
    }
  }, []);
  const cancelHandler = useCallback(() => {
    resetForm();
    resetState();
    toggle();
  }, []);

  return (
    <>
      <Button onClick={toggle} variant='outlined' startIcon={<Add />}>
        担当者を追加する
      </Button>
      <Dialog open={on}>
        <Form onSubmit={handleSubmit(submitHandler)}>
          <DialogTitle>担当者を追加する</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>担当者名を追加する</DialogContentText> */}
            {error && <ErrorAlert>{error}</ErrorAlert>}
            <Box mt={2} mb={2}>
              <StaffNameTextField {...useFormReturn} disabled={isLoading} />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={cancelHandler} disabled={isLoading}>
              キャンセル
            </Button>
            <Button type='submit' variant='contained' disabled={isLoading}>
              追加する
            </Button>
          </DialogActions>
        </Form>
      </Dialog>
    </>
  );
};
