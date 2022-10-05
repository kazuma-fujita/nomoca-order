import { Delete } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
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

export const DeleteSubscriptionOrderDialog = (props: Props) => {
  return (
    <Dialog open={props.on}>
      <DialogTitle>定期便を{props.label}する</DialogTitle>
      <DialogContent>
        <DialogContentText>
          定期便を{props.label}します。宜しいですか？ <br />
          <br />
          ※ 定期便は配送予定月の中旬頃にお届けします。
          <br />
          配送予定月中旬頃の解約の場合、既に発送手配が完了している商品に関しては配送されます。
          <br />
        </DialogContentText>
        {props.error && <ErrorAlert>{props.error}</ErrorAlert>}
        {/* <Box mt={2} mb={2}>
          <Typography>{props.name}</Typography>
        </Box> */}
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
          startIcon={<Delete />}
        >
          {props.label}する
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
