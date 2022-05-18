import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LoadingButton from '@mui/lab/LoadingButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ErrorAlert } from 'components/atoms/alerts/error-alert';

type Props = {
  on: boolean;
  isLoading: boolean;
  error: Error | null;
  submitHandler: () => void;
  cancelHandler: () => void;
};

export const ExportSingleOrderCSVDialog = (props: Props) => {
  return (
    <Dialog open={props.on}>
      <DialogTitle>CSVを出力する前に必ず以下を確認してください</DialogTitle>
      <DialogContent>
        <DialogContentText>
          発送済みにすると顧客に発送通知メールが送信されます。 <br />
          顧客は注文キャンセルができなくなります。 <br />
          一度発送済みにすると未発送の状態には戻せません。 <br />
          <br />
          発送済みにしてよろしいですか？
        </DialogContentText>
        {props.error && <ErrorAlert>{props.error}</ErrorAlert>}
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
          startIcon={<LocalShippingIcon />}
        >
          発送済みにする
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
