import { Add } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
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
import DialogContentText from '@mui/material/DialogContentText';

type Props = {
  label: string;
  name: string;
  on: boolean;
  isLoading: boolean;
  error: Error | null;
  submitHandler: () => void;
  cancelHandler: () => void;
};

export const DeleteStaffDialog = (props: Props) => {
  return (
    <Dialog open={props.on}>
      <DialogTitle>担当者を{props.label}する</DialogTitle>
      <DialogContent>
        <DialogContentText>こちらの担当者を{props.label}します。よろしいですか？</DialogContentText>
        {props.error && <ErrorAlert>{props.error}</ErrorAlert>}
        <Box mt={2} mb={2}>
          <Typography>{props.name}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.cancelHandler} disabled={props.isLoading}>
          キャンセル
        </Button>
        <Button onClick={props.submitHandler} variant='contained' color='error' disabled={props.isLoading}>
          {props.label}する
        </Button>
      </DialogActions>
    </Dialog>
  );
};
