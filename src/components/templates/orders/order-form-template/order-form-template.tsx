import { Box } from '@mui/material';
import { OrderType } from 'API';
import { SingleOrderForm } from 'components/organisms/single-orders/single-order-form';
import { SubscriptionOrderForm } from 'components/organisms/subscription-orders/subscription-order-form';
import { useOrderFormParam } from 'stores/use-order-form-param';

export const OrderFormTemplate = () => {
  const { orderType } = useOrderFormParam();
  return (
    <>
      {/* <Typography variant='h5' textAlign='center'>
        注文を入力する
      </Typography> */}
      <Box mb={8} />
      {orderType === OrderType.singleOrder ? <SingleOrderForm /> : <SubscriptionOrderForm />}
    </>
  );
};
