import { Box, MenuItem, TextField, Typography } from '@mui/material';
import { OrderForm } from 'components/organisms/orders/order-form';
import { useOrderForm } from 'hooks/orders/use-order-form';
import { useState } from 'react';
import { Controller, UseFieldArrayReturn } from 'react-hook-form';
import { useNowDate } from 'stores/use-now-date';
import { useOrderFormParam } from 'stores/use-order-form-param';

// 配送頻度プルダウンの月配列
const deliveryIntervals = [1, 2, 3, 4, 6];

const addYearWithSelectedMonth = (nowYear: number, nowMonth: number, selectMonth: number) =>
  selectMonth <= nowMonth ? nowYear + 1 : nowYear;

export const SubscriptionOrderForm = () => {
  const { formReturn, fieldArrayReturn, submitHandler, cancelHandler } = useOrderForm();
  const { data } = useOrderFormParam();
  const { now } = useNowDate();
  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth();
  // 配送開始月SelectField初期値。翌月を設定
  const nextMonth = nowMonth + 1 === 13 ? 1 : nowMonth + 1;
  // 配送開始月SelectFieldプルダウン月配列
  const deliveryStartMonths = Array.from({ length: 6 }, (_, i) => {
    const month = i + nextMonth;
    return 12 < month ? month - 12 : month;
  });
  // 配送開始年TextField初期値。配送開始月初期値が翌年の場合、翌年の値を初期値に設定。また、確認画面戻りで既に値があれば初期値として設定
  const initialYear = (data && data.deliveryStartYear) ?? addYearWithSelectedMonth(nowYear, nowMonth, nextMonth);
  const [deliveryStartYear, setDeliveryStartYear] = useState(initialYear);
  formReturn.setValue('deliveryStartYear', deliveryStartYear);
  // 配送開始月プルダウン変更handler。プルダウンで翌年を選択した場合、翌年の値を配送開始年に設定
  const handleChangeDeliveryStartMonth = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setDeliveryStartYear(addYearWithSelectedMonth(nowYear, nowMonth, value));
    formReturn.setValue('deliveryStartMonth', value);
  };

  return (
    <OrderForm
      formReturn={formReturn}
      fieldArrayReturn={fieldArrayReturn as UseFieldArrayReturn}
      submitHandler={submitHandler}
      cancelHandler={cancelHandler}
      initialReceiptProducts={data?.products}
    >
      <Box mt={2} mb={2} sx={{ display: 'flex', alignContent: 'center', alignItems: 'center' }}>
        <TextField
          id='deliveryStartYear'
          variant='standard'
          disabled
          label=''
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
              onChange={handleChangeDeliveryStartMonth}
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
  );
};
