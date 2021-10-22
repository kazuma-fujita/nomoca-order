import { Delete, Logout } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ErrorAlert } from 'components/atoms/error-alert';

type Props = {
  label: string;
  on: boolean;
  isLoading: boolean;
  error: Error | null;
  submitHandler: () => void;
  cancelHandler: () => void;
};

export const SignOutDialog = (props: Props) => {
  console.error(props.error);
  return (
    <Dialog open={props.on}>
      <DialogTitle>{props.label}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.label}します。よろしいですか？</DialogContentText>
        {props.error && <ErrorAlert>{props.error}</ErrorAlert>}
      </DialogContent>
      <DialogActions>
        <LoadingButton onClick={props.cancelHandler} loadingIndicator='Loading...' loading={props.isLoading}>
          キャンセル
        </LoadingButton>
        <LoadingButton
          onClick={props.submitHandler}
          variant='contained'
          color='error'
          loading={props.isLoading}
          loadingPosition='start'
          startIcon={<Logout />}
        >
          {props.label}する
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
