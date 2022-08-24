import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LoadingButton from '@mui/lab/LoadingButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type Props = {
  on: boolean;
  isLoading: boolean;
  isDisabledButton: boolean;
  submitHandler: () => void;
  cancelHandler: () => void;
};

export const ExportSingleOrderCSVDialog = ({
  on,
  isLoading,
  isDisabledButton,
  submitHandler,
  cancelHandler,
}: Props) => {
  return (
    <Dialog open={on}>
      <DialogTitle>CSVを出力する前に必ず以下を確認してください</DialogTitle>
      <DialogContent>
        <DialogContentText>
          発送済みにすると顧客に発送通知メールが送信されます。 <br />
          顧客は注文キャンセルができなくなります。 <br />
          一度発送済みにすると未発送の状態には戻せません。 <br />
          <br />
          発送済みにしてよろしいですか？
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <LoadingButton onClick={cancelHandler} loadingIndicator='Loading...' loading={isLoading}>
          閉じる
        </LoadingButton>
        <LoadingButton
          onClick={submitHandler}
          variant='contained'
          color='error'
          loading={isLoading}
          loadingPosition='start'
          startIcon={<LocalShippingIcon />}
          disabled={isDisabledButton}
        >
          発送済みにする
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
