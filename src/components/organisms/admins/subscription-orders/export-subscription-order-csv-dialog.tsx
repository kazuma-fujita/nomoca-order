import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LoadingButton from '@mui/lab/LoadingButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { isShippingAllSubscriptionOrderThisMonth } from 'functions/orders/is-shipping-all-subscription-order-this-month';
import { useFetchSubscriptionOrderList } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { useNowDate } from 'stores/use-now-date';

type Props = {
  on: boolean;
  isLoading: boolean;
  submitHandler: () => void;
  cancelHandler: () => void;
};

export const ExportSubscriptionOrderCSVDialog = ({ on, isLoading, submitHandler, cancelHandler }: Props) => {
  const { data: orders } = useFetchSubscriptionOrderList();
  const { data: now } = useNowDate();
  return (
    <Dialog open={on}>
      <DialogTitle>CSVを出力する前に必ず以下を確認してください</DialogTitle>
      <DialogContent>
        <DialogContentText>
          CSVを出力すると発送履歴の作成、顧客へ発送通知メールを送信します。 <br />
          当月発送分のCSVは一度のみ出力可能です。 <br />
          翌月までCSVの再出力はできません。出力したCSVは大切に保管してください。 <br />
          <br />
          当月発送分をCSV出力して顧客に発送通知をしてよろしいですか？
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
          disabled={!orders || orders.length === 0 || !now || isShippingAllSubscriptionOrderThisMonth(orders, now)}
        >
          CSVを出力して顧客に発送通知をする
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
