import { Done, Remove } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ErrorAlert } from 'components/atoms/alerts/error-alert';

type Props = {
  dialogTitle: string;
  name: string;
  on: boolean;
  isLoading: boolean;
  error: Error | null;
  disabled: boolean;
  submitHandler: () => void;
  cancelHandler: () => void;
};

export const ActivateDialog = (props: Props) => {
  const label = props.disabled ? '有効' : '無効';
  return (
    <Dialog open={props.on}>
      <DialogTitle>
        {props.dialogTitle}を{label}にする
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {props.disabled
            ? `有効にすると注文時にこちらの${props.dialogTitle}が選択できます。`
            : `無効にすると注文時にこちらの${props.dialogTitle}が選択できなくなります。`}
        </DialogContentText>
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
          startIcon={props.disabled ? <Done /> : <Remove />}
          color={props.disabled ? 'success' : 'error'}
          loading={props.isLoading}
          loadingPosition='start'
        >
          {label}にする
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
