import SendIcon from '@mui/icons-material/Send';
import { LoadingButton } from '@mui/lab';
import { Box, Chip, Divider, Typography } from '@mui/material';
import { OrderType } from 'API';
import { ErrorAlert } from 'components/atoms/alerts/error-alert';
import { DeliveryTypeChip } from 'components/atoms/delivery-type-chip';
import { ReceiptTable } from 'components/molecules/receipt-table';
import { ClinicDetail } from 'components/organisms/clinics/clinic-detail';
import { addDeliveryFeeAndExpressObjectToProductList } from 'functions/orders/add-delivery-fee-and-express-object-to-product-list';
import { useFetchStaffList } from 'hooks/staffs/use-fetch-staff-list';
import { BaseSyntheticEvent, MouseEventHandler } from 'react';
import { useOrderFormParam } from 'stores/use-order-form-param';

type Props = {
  isLoading: boolean;
  error: Error | null;
  submitHandler: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  cancelHandler: MouseEventHandler<HTMLButtonElement> | undefined;
};

export const ConfirmOrder: React.FC<Props> = ({ isLoading, error, submitHandler, cancelHandler }) => {
  const { data: formParam, orderType } = useOrderFormParam();
  return (
    <>
      {error && (
        <Box mb={4}>
          <ErrorAlert>{error}</ErrorAlert>
        </Box>
      )}
      <Divider textAlign='left'>
        <Chip label='商品' />
      </Divider>
      <Box mb={8}>
        <ProductsLabel />
      </Box>
      {orderType === OrderType.singleOrder ? <DeliveryTypeLabel /> : <DeliveryStartMonthAndIntervalLabel />}
      <Box mb={8}>
        <Divider textAlign='left'>
          <Chip label='配送先' />
        </Divider>
        <Box mt={4} ml={4}>
          <ClinicDetail />
        </Box>
      </Box>
      <Divider textAlign='left'>
        <Chip label='発注担当者' />
      </Divider>
      <Box mt={2} mb={4} ml={4}>
        <StaffNameLabel />
      </Box>
      <Box mt={8} mb={8} width='auto' display='flex' justifyContent='center'>
        {/* URL直叩き対応の為、inputからの入力された値が無ければ(formParamが無ければ)各ボタンdisabled */}
        <LoadingButton loadingIndicator='Loading...' loading={isLoading} onClick={cancelHandler} disabled={!formParam}>
          修正する
        </LoadingButton>
        <Box ml={16} />
        <LoadingButton
          loading={isLoading}
          loadingPosition='start'
          onClick={submitHandler}
          variant='contained'
          startIcon={<SendIcon />}
          disabled={!formParam}
        >
          注文する
        </LoadingButton>
      </Box>
    </>
  );
};

const ProductsLabel = () => {
  const { data: formParam, orderType } = useOrderFormParam();
  if (!formParam || !formParam.products) return <ErrorAlert>Form Values and products data are not found.</ErrorAlert>;

  let products = formParam.products;
  if (orderType === OrderType.singleOrder && formParam.deliveryType) {
    // 通常注文の場合、速達料金、配送手数料を配列に追加
    products = addDeliveryFeeAndExpressObjectToProductList(formParam.products, formParam.deliveryType);
  }
  return <ReceiptTable products={products} />;
};

const StaffNameLabel = () => {
  const { data: formParam } = useOrderFormParam();
  const { data: staffList } = useFetchStaffList();
  if (!formParam || !staffList) return <ErrorAlert>Form Values and staff data are not found.</ErrorAlert>;
  const staff = staffList.find((staff) => staff.id === formParam.staffID);
  if (!staff) return <ErrorAlert>A staff name was not found on a staff list.</ErrorAlert>;
  return (
    <Typography variant='body2'>
      {staff.lastName}&nbsp;&nbsp;{staff.firstName}
    </Typography>
  );
};

const DeliveryStartMonthAndIntervalLabel = () => {
  const { data: formParam } = useOrderFormParam();
  return (
    <>
      <Divider textAlign='left'>
        <Chip label='配送開始月' />
      </Divider>
      <Box mt={2} mb={4} ml={4}>
        {formParam && formParam.deliveryStartYear && formParam.deliveryStartMonth ? (
          <Typography variant='body2'>
            {formParam.deliveryStartYear} / {formParam.deliveryStartMonth}月
          </Typography>
        ) : (
          <ErrorAlert>Form values, delivery start year and month are not found.</ErrorAlert>
        )}
      </Box>
      <Divider textAlign='left'>
        <Chip label='配送頻度' />
      </Divider>
      <Box mt={2} mb={4} ml={4}>
        {formParam && formParam.deliveryInterval ? (
          <Typography variant='body2'>{formParam.deliveryInterval}ヶ月</Typography>
        ) : (
          <ErrorAlert>Form values and delivery interval are not found.</ErrorAlert>
        )}
      </Box>
    </>
  );
};

const DeliveryTypeLabel = () => {
  const { data: formParam } = useOrderFormParam();
  return (
    <>
      <Divider textAlign='left'>
        <Chip label='配送方法' />
      </Divider>
      <Box mt={2} mb={8} ml={4}>
        {formParam && formParam.deliveryType ? (
          <DeliveryTypeChip deliveryType={formParam.deliveryType} />
        ) : (
          <ErrorAlert>Form values and a delivery type are not found.</ErrorAlert>
        )}
      </Box>
    </>
  );
};
