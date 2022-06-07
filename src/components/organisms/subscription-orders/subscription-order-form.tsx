import { Box, FormHelperText, MenuItem, TextField, Typography } from '@mui/material';
import { OrderForm } from 'components/organisms/orders/order-form';
import { useInputOrder } from 'hooks/orders/use-input-order';
import { useState } from 'react';
import { Controller, UseFieldArrayReturn } from 'react-hook-form';
import { useNowDate } from 'stores/use-now-date';
import { useOrderFormParam } from 'stores/use-order-form-param';

// 配送頻度プルダウンの月配列
const deliveryIntervals = [1, 2, 3, 4, 6];
// 配送開始月の上限。Nヶ月を指定
const deliveryStartMonthLimit = 6;

const addYearWithSelectedMonth = (nowYear: number, nowMonth: number, selectMonth: number) =>
  selectMonth <= nowMonth ? nowYear + 1 : nowYear;

export const SubscriptionOrderForm = () => {
  const { formReturn, fieldArrayReturn, submitHandler, cancelHandler } = useInputOrder();
  const { data } = useOrderFormParam();
  const { now } = useNowDate();
  // 現在年、月を取得。現在月はgetMonthの値に+1をして取得
  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth() + 1;
  // 配送開始月SelectField初期値。初期値として翌月を設定
  const nextMonth = nowMonth + 1 === 13 ? 1 : nowMonth + 1;
  // 配送開始月SelectFieldプルダウン月配列生成。翌月から〜lengthの数値で配送開始月の上限を設定
  const deliveryStartMonths = Array.from({ length: deliveryStartMonthLimit }, (_, i) => {
    const month = nextMonth + i;
    // 配送開始月プルダウンの年跨ぎを計算 e.g.) 10, 11, 12, 1, 2, 3月
    return month > 12 ? month - 12 : month;
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
      <Box mt={2} mb={2} ml={4} sx={{ display: 'flex', alignContent: 'center', alignItems: 'center' }}>
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
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      <Box mb={8} ml={4}>
        <FormHelperText>定期便の新規申し込み、または注文内容変更の配送開始月は翌月から承ります</FormHelperText>
      </Box>
    </OrderForm>
  );
};
