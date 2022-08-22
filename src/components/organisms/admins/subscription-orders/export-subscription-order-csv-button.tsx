import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Button from '@mui/material/Button';
import { SubscriptionOrder } from 'API';
import { isShippingAllSubscriptionOrderThisMonth } from 'functions/orders/is-shipping-all-subscription-order-this-month';
import { ExtendedOrder } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { useCallback } from 'react';
import { useToggle } from 'react-use';
import { useNowDate } from 'stores/use-now-date';
import { ExportSubscriptionOrderCSVDialog } from './export-subscription-order-csv-dialog';

type Props = {
  orders: ExtendedOrder<SubscriptionOrder>[] | null;
  exportSubscriptionOrderCSVAndCreateOrderHistory: (orders: ExtendedOrder<SubscriptionOrder>[]) => Promise<void>;
  isLoading: boolean;
  resetState: () => void;
};

export const ExportSubscriptionOrderCSVButton = ({
  orders,
  exportSubscriptionOrderCSVAndCreateOrderHistory,
  isLoading,
  resetState,
}: Props) => {
  const [on, toggle] = useToggle(false);
  const { data: now } = useNowDate();

  const cancelHandler = useCallback(() => {
    resetState();
    toggle();
  }, [resetState, toggle]);

  const submitHandler = useCallback(async () => {
    if (!orders) return;
    try {
      await exportSubscriptionOrderCSVAndCreateOrderHistory(orders);
      cancelHandler();
    } catch (error) {}
  }, [orders, exportSubscriptionOrderCSVAndCreateOrderHistory, cancelHandler]);
  // 定期便注文リストがあり、当月定期便注文リストの配送日時が当月だったらボタンdisabled
  const isDisabledButton =
    !orders || orders.length === 0 || !now || isShippingAllSubscriptionOrderThisMonth(orders, now);
  return (
    <>
      <Button
        onClick={toggle}
        variant='contained'
        color='error'
        startIcon={<LocalShippingIcon />}
        disabled={isDisabledButton}
      >
        当月発送定期便をCSV出力して顧客に発送通知をする
      </Button>
      <ExportSubscriptionOrderCSVDialog
        on={on}
        isLoading={isLoading}
        isDisabledButton={isDisabledButton}
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
      />
    </>
  );
};
