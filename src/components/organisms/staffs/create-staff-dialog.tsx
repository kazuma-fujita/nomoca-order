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

export const CreateStaffDialog = () => {
  // const { handleSubmit, watch, register, formState } = useForm<Staff>();
  const useFormReturn = useForm<Staff>();
  const { handleSubmit } = useFormReturn;
  const { createStaff, isLoading, error } = useCreateStaff();
  const [on, toggle] = useToggle(false);

  return (
    <div>
      <Button onClick={toggle} variant='outlined' color='primary' startIcon={<Add />}>
        担当者を追加する
      </Button>
      <Dialog open={on} onClose={toggle}>
        <Form onSubmit={handleSubmit(createStaff)}>
          <DialogTitle>担当者を追加する</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>担当者名を追加する</DialogContentText> */}
            {/* <TextField
              required
              type='text'
              id='name'
              label='担当者名'
              autoComplete='off'
              margin='dense'
              fullWidth
              autoFocus
              inputRef={register}
            /> */}
            <Box mt={2} mb={2}>
              <StaffNameTextField {...useFormReturn} />
            </Box>
            {error && <ErrorAlert>{error}</ErrorAlert>}
          </DialogContent>
          <DialogActions>
            <Button onClick={toggle}>キャンセル</Button>
            <Button type='submit'>追加する</Button>
          </DialogActions>
        </Form>
      </Dialog>
    </div>
  );
};
