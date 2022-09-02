import { Box, Chip, Divider, FormHelperText, MenuItem, TextField, Typography } from '@mui/material';
import { OrderInputForm } from 'components/organisms/orders/order-input-form';
import { useInputOrder } from 'hooks/orders/use-input-order';
import { useState } from 'react';
import { Controller, UseFieldArrayReturn, UseFormReturn } from 'react-hook-form';
import { useNowDate } from 'stores/use-now-date';
import { useOrderFormParam, OrderFormParam } from 'stores/use-order-form-param';

export const SubscriptionOrderForm = () => {
  const { formReturn, fieldArrayReturn, submitHandler, cancelHandler } = useInputOrder();
  return (
    <OrderInputForm
      formReturn={formReturn}
      fieldArrayReturn={fieldArrayReturn as UseFieldArrayReturn}
      submitHandler={submitHandler}
      cancelHandler={cancelHandler}
    >
      <Box mt={8}>
        <Divider textAlign='left'>
          <Chip label='配送開始月・頻度' />
        </Divider>
      </Box>
      <Box mt={6} mb={2} ml={4} sx={{ display: 'flex', alignContent: 'center', alignItems: 'center' }}>
        <DeliveryStartYearMonthSelectBox {...formReturn} />
        <Box mr={2} />
        <DeliveryIntervalSelectBox {...formReturn} />
      </Box>
      <Box mb={8} ml={4}>
        <FormHelperText>定期便の新規申し込み、または注文内容変更の配送開始月は翌月から承ります</FormHelperText>
      </Box>
    </OrderInputForm>
  );
};

// DEBUG MODE 当月の定期便を作成可能。CI/本番環境ではfalseを設定 (JSON.parseは文字列のtrue/falseをbooleanに変換可能)
// CI環境ではprocess.envを設定していな為、環境変数値が取れなかったら文字列のfalseを返却
const canCreateSubscriptionOrderForTheCurrentMonth = JSON.parse(
  (process.env.NEXT_PUBLIC_CAN_CREATE_SUBSCRIPTION_ORDER_FOR_THE_CURRENT_MONTH_FOR_DEBUGGING as string) ?? 'false',
);

const DeliveryStartYearMonthSelectBox = ({ register, setValue, control }: UseFormReturn<OrderFormParam>) => {
  const { data } = useOrderFormParam();
  const { data: now } = useNowDate();
  // サーバ時刻が取得できない場合クライアント時刻を設定
  const currentDate = now ?? new Date();
  // 現在年、月を取得。現在月はgetMonthの値に+1をして取得
  const nowYear = currentDate.getFullYear();
  const nowMonth = currentDate.getMonth() + 1;

  console.log('canCreateSubscriptionOrderForTheCurrentMonth', canCreateSubscriptionOrderForTheCurrentMonth);

  // 配送開始月SelectField初期値。初期値として翌月を設定
  let nextMonth = nowMonth + 1 === 13 ? 1 : nowMonth + 1;

  ////////////////////////////////////// DEBUG MODE
  // 当月の定期便を作成できるように配送開始月を当月として設定
  if (canCreateSubscriptionOrderForTheCurrentMonth) {
    nextMonth = nowMonth;
  }
  ////////////////////////////////////// DEBUG MODE

  // 配送開始月の上限。デフォルト6ヶ月を指定
  const deliveryStartMonthLimit = 6;
  // 配送開始月SelectFieldプルダウン月配列生成。翌月から〜lengthの数値で配送開始月の上限を設定
  const deliveryStartMonths = Array.from({ length: deliveryStartMonthLimit }, (_, i) => {
    const month = nextMonth + i;
    // 配送開始月プルダウンの年跨ぎを計算 e.g.) 10, 11, 12, 1, 2, 3月
    return month > 12 ? month - 12 : month;
  });

  // 選択した配送開始月より現在月の方が大きければ翌年を返却。e.g.) 選択月 2月 現在年月 2022/12月 の場合、2023年を返却
  const addYearWithSelectedMonth = (nowYear: number, nowMonth: number, selectMonth: number) =>
    selectMonth <= nowMonth ? nowYear + 1 : nowYear;
  // 配送開始年TextField初期値。配送開始月初期値が翌年の場合、翌年の値を初期値に設定。また、確認画面戻りで既に値があれば初期値として設定
  let initialYear = (data && data.deliveryStartYear) ?? addYearWithSelectedMonth(nowYear, nowMonth, nextMonth);

  ////////////////////////////////////// DEBUG MODE
  // 当月の定期便を作成できるように配送開始年を当年に設定
  if (canCreateSubscriptionOrderForTheCurrentMonth) {
    initialYear = nowYear;
  }
  ////////////////////////////////////// DEBUG MODE

  const [deliveryStartYear, setDeliveryStartYear] = useState(initialYear);
  setValue('deliveryStartYear', deliveryStartYear);
  // 配送開始月プルダウン変更handler。プルダウンで翌年を選択した場合、翌年の値を配送開始年に設定
  const handleChangeDeliveryStartMonth = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setDeliveryStartYear(addYearWithSelectedMonth(nowYear, nowMonth, value));
    setValue('deliveryStartMonth', value);
  };

  return (
    <>
      <TextField
        variant='standard'
        disabled
        label=''
        sx={{ width: 40 }}
        {...register('deliveryStartYear', { valueAsNumber: true })}
      />
      <Typography color='text.secondary'>&nbsp;/&nbsp;</Typography>
      <Controller
        name='deliveryStartMonth'
        control={control}
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
    </>
  );
};

const DeliveryIntervalSelectBox = ({ control }: UseFormReturn<OrderFormParam>) => {
  // 配送頻度プルダウンの月配列
  const deliveryIntervals = [1, 2, 3, 4, 6];
  return (
    <Controller
      name='deliveryInterval'
      control={control}
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
  );
};
