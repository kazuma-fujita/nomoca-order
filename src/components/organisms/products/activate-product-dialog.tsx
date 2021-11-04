import { Done, Remove } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ErrorAlert } from 'components/atoms/error-alert';

type Props = {
  // label: string;
  // buttonIcon: ReactElement;
  // buttonColor: 'success' | 'error';
  name: string;
  on: boolean;
  isLoading: boolean;
  error: Error | null;
  disabled: boolean;
  submitHandler: () => void;
  cancelHandler: () => void;
};

export const ActivateProductDialog = (props: Props) => {
  const label = props.disabled ? '有効' : '無効';
  return (
    <Dialog open={props.on}>
      <DialogTitle>担当者を{label}にする</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {props.disabled
            ? '有効にすると注文時にこちらの担当者が選択できます。'
            : '無効にすると注文時にこちらの担当者が選択できなくなります。'}
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
