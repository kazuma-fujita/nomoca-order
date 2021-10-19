import { Add } from '@mui/icons-material';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Staff } from 'API';
import { ErrorAlert } from 'components/atoms/error-alert';
import { StaffNameTextField } from 'components/atoms/staff-name-text-field';
import { useCreateStaff } from 'hooks/staffs/use-create-staff';
import { BaseSyntheticEvent, useCallback } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { useToggle } from 'react-use';
import Form from 'components/atoms/form';

type Props = {
  label: string;
  on: boolean;
  isLoading: boolean;
  error: Error | null;
  submitHandler: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  cancelHandler: () => void;
  useFormReturn: UseFormReturn<Staff, object>;
};

export const InputStaffDialog = (props: Props) => {
  return (
    <Dialog open={props.on}>
      <Form onSubmit={props.submitHandler}>
        <DialogTitle>担当者を{props.label}する</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>担当者名を追加する</DialogContentText> */}
          {props.error && <ErrorAlert>{props.error}</ErrorAlert>}
          <Box mt={2} mb={2}>
            <StaffNameTextField {...props.useFormReturn} disabled={props.isLoading} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.cancelHandler} disabled={props.isLoading}>
            キャンセル
          </Button>
          <Button type='submit' variant='contained' disabled={props.isLoading}>
            {props.label}する
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
};
