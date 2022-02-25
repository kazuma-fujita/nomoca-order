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

export const ExportSubscriptionOrderCSVDialog = (props: Props) => {
  return (
    <Dialog open={props.on}>
      <DialogTitle>CSVを出力する前に必ず以下を確認してください</DialogTitle>
      <DialogContent>
        <DialogContentText>
          CSVを出力すると発送履歴の作成、顧客へ発送通知メールを送信します。 <br />
          当月発送分のCSVは一度のみ出力可能です。 <br />
          翌月までCSVの再出力はできません。出力したCSVは大切に保管してください。 <br />
          <br />
          当月発送分をCSV出力して顧客に発送通知をしてよろしいですか？
        </DialogContentText>
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
          startIcon={<LocalShippingIcon />}
        >
          CSVを出力して顧客に発送通知をする
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
