import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { DeliveryType } from 'API';
import { OrderForm } from 'components/organisms/orders/order-form';
import { NormalizedProduct } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { BaseSyntheticEvent, useState } from 'react';
import { Controller, UseFieldArrayReturn, UseFormReturn } from 'react-hook-form';
import { useNowDate } from 'stores/use-now-date';
import { OrderFormParam } from 'stores/use-order-form-param';

type Props = {
  submitHandler: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  cancelHandler: () => void;
  formReturn: UseFormReturn<OrderFormParam, object>;
  fieldArrayReturn: UseFieldArrayReturn;
  initialReceiptProducts?: NormalizedProduct[] | null;
};

const deliveryIntervals = [1, 2, 3, 4, 6];

export const addYearWithSelectedMonth = (nowYear: number, nowMonth: number, selectMonth: number) =>
  selectMonth <= nowMonth ? nowYear + 1 : nowYear;

export const SubscriptionOrderFormTemplate = ({
  submitHandler,
  cancelHandler,
  formReturn,
  fieldArrayReturn,
  initialReceiptProducts,
}: Props) => {
  const { now } = useNowDate();
  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth() + 1;
  const nextMonth = nowMonth + 1 === 13 ? 1 : nowMonth + 1;
  const deliveryStartMonths = Array.from({ length: 6 }, (_, i) => {
    const month = i + nextMonth;
    return 12 < month ? month - 12 : month;
  });

  const [deliveryStartYear, setDeliveryStartYear] = useState(addYearWithSelectedMonth(nowYear, nowMonth, nextMonth));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setDeliveryStartYear(addYearWithSelectedMonth(nowYear, nowMonth, value));
    formReturn.setValue('deliveryStartMonth', value);
  };

  return (
    <>
      <Typography variant='h5' textAlign='center'>
        定期便を入力する
      </Typography>
      <Box mb={8} />
      <OrderForm
        formReturn={formReturn}
        fieldArrayReturn={fieldArrayReturn as UseFieldArrayReturn}
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
        initialReceiptProducts={initialReceiptProducts}
      >
        <Box mt={2} mb={2} sx={{ display: 'flex', alignContent: 'center', alignItems: 'center' }}>
          <TextField
            id='deliveryStartYear'
            variant='standard'
            disabled
            label=''
            value={deliveryStartYear}
            sx={{ width: 40 }}
            {...formReturn.register('deliveryStartYear', { valueAsNumber: true })}
          />
          <Typography color='text.secondary'>&nbsp;/&nbsp;</Typography>
          <Controller
            name='deliveryStartMonth'
            control={formReturn.control}
            defaultValue={nextMonth}
            rules={{ required: '配送開始月を選択してください' }}
            render={({ field: { onChange, ...rest }, formState: { errors } }) => (
              <TextField
                select
                onChange={handleChange}
                label='配送開始月'
                error={Boolean(errors.deliveryStartMonth)}
                helperText={errors.deliveryStartMonth && errors.deliveryStartMonth.message}
                sx={{ width: 100 }}
                {...rest}
              >
                {deliveryStartMonths.map((month) => (
                  <MenuItem key={month} value={month}>
                    {month}月
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          <Box mr={2} />
          <Controller
            name='deliveryInterval'
            control={formReturn.control}
            defaultValue={1}
            rules={{ required: '配送頻度を選択してください' }}
            render={({ field, formState: { errors } }) => (
              <TextField
                select
                label='配送頻度'
                error={Boolean(errors.deliveryInterval)}
                helperText={errors.deliveryInterval && errors.deliveryInterval.message}
                sx={{ width: 100 }}
                {...field}
              >
                {deliveryIntervals.map((interval) => (
                  <MenuItem key={interval} value={interval}>
                    {interval}ヶ月
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Box>
      </OrderForm>
    </>
  );
};