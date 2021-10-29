import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ErrorAlert } from 'components/atoms/error-alert';
import { ReactElement } from 'react';

type Props = {
  label: string;
  name: string;
  buttonIcon: ReactElement;
  buttonColor: 'success' | 'error';
  on: boolean;
  isLoading: boolean;
  error: Error | null;
  disabled: boolean;
  submitHandler: () => void;
  cancelHandler: () => void;
};

export const ActivateStaffDialog = (props: Props) => {
  return (
    <Dialog open={props.on}>
      <DialogTitle>担当者を{props.label}にする</DialogTitle>
      <DialogContent>
        <DialogContentText>こちらの担当者を{props.label}にします。よろしいですか？</DialogContentText>
        {props.error && <ErrorAlert>{props.error}</ErrorAlert>}
        <Box mt={2} mb={2}>
          <Typography>{props.name}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <LoadingButton onClick={props.cancelHandler} loadingIndicator='Loading...' loading={props.isLoading}>
          キャンセル
        </LoadingButton>
        <LoadingButton
          onClick={props.submitHandler}
          variant='contained'
          startIcon={props.buttonIcon}
          color={props.buttonColor}
          loading={props.isLoading}
          loadingPosition='start'
        >
          {props.label}する
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
