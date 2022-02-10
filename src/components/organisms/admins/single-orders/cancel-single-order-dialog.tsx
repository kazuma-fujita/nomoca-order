import { Delete } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ErrorAlert } from 'components/atoms/alerts/error-alert';

type Props = {
  label: string;
  on: boolean;
  isLoading: boolean;
  error: Error | null;
  submitHandler: () => void;
  cancelHandler: () => void;
};

export const CancelSingleOrderDialog = (props: Props) => {
  return (
    <Dialog open={props.on}>
      <DialogTitle>注文を{props.label}する</DialogTitle>
      <DialogContent>
        <DialogContentText>こちらの注文を{props.label}します。よろしいですか？</DialogContentText>
        {props.error && <ErrorAlert>{props.error}</ErrorAlert>}
        {/* <Box mt={2} mb={2}>
          <Typography>{props.name}</Typography>
        </Box> */}
      </DialogContent>
      <DialogActions>
        <LoadingButton onClick={props.cancelHandler} loadingIndicator='Loading...' loading={props.isLoading}>
          閉じる
        </LoadingButton>
        <LoadingButton
          onClick={props.submitHandler}
          variant='contained'
          color='error'
          loading={props.isLoading}
          loadingPosition='start'
          startIcon={<Delete />}
        >
          {props.label}する
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
