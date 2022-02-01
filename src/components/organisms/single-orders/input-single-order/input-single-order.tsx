import AddBoxIcon from '@mui/icons-material/AddBox';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, IconButton, MenuItem, TextField, Typography } from '@mui/material';
import { ErrorAlert } from 'components/atoms/alerts/error-alert';
import Form from 'components/atoms/form';
import { BaseSyntheticEvent, ReactElement, useState } from 'react';
import { Controller, UseFieldArrayReturn, UseFormReturn } from 'react-hook-form';
import { OrderFormParam } from 'stores/use-order-form-param';
import { useProductList } from 'stores/use-product-list';
import { useStaffList } from 'stores/use-staff-list';

type Props = {
  startIcon: ReactElement;
  submitHandler: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  cancelHandler: () => void;
  formReturn: UseFormReturn<OrderFormParam, object>;
  fieldArrayReturn: UseFieldArrayReturn;
  staffID?: string;
};

type ProductErrorField = {
  productID: { message: string };
  quantity: { message: string };
};

// 数字連番の配列を生成
const quantities = Array.from({ length: 20 }, (_, i) => i + 1);
const deliveryIntervals = [1, 2, 3, 4, 6];

export const addYearWithSelectedMonth = (nowYear: number, nowMonth: number, selectMonth: number) =>
  selectMonth <= nowMonth ? nowYear + 1 : nowYear;

export const InputSingleOrder = ({
  startIcon,
  submitHandler,
  cancelHandler,
  formReturn,
  fieldArrayReturn,
  staffID,
}: Props) => {
  const { data: productList } = useProductList();
  const { data: staffList } = useStaffList();
  // const { now } = useNowDate();
  const now = new Date(2021, 0, 1);
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
    <Form onSubmit={submitHandler}>
      <h2>注文を入力する</h2>
      {fieldArrayReturn.fields.map((item, index) => (
        <Box mt={2} mb={2} key={item.id} sx={{ display: 'flex' }}>
          <Controller
            name={`products.${index}.productID`}
            control={formReturn.control}
            defaultValue={''}
            rules={{ required: '商品を選択してください' }}
            render={({ field, formState: { errors } }) => (
              <TextField
                select
                fullWidth
                label='商品'
                error={Boolean(
                  errors.products &&
                    (errors.products as ProductErrorField[])[index] &&
                    'productID' in (errors.products as ProductErrorField[])[index],
                )}
                helperText={
                  errors.products &&
                  (errors.products as ProductErrorField[])[index] &&
                  'productID' in (errors.products as ProductErrorField[])[index] &&
                  (errors.products as ProductErrorField[])[index].productID.message
                }
                {...field}
              >
                {productList &&
                  productList.map((product) => (
                    <MenuItem key={product.id} value={product.id}>
                      {product.name}
                    </MenuItem>
                  ))}
              </TextField>
            )}
          />
          <Box mr={2} />
          <Controller
            name={`products.${index}.quantity`}
            control={formReturn.control}
            defaultValue={1}
            rules={{ required: '数量を選択してください' }}
            render={({ field, formState: { errors } }) => (
              <TextField
                select
                sx={{ width: 100 }}
                label='数量'
                error={Boolean(
                  errors.products &&
                    (errors.products as ProductErrorField[])[index] &&
                    'quantity' in (errors.products as ProductErrorField[])[index],
                )}
                helperText={
                  errors.products &&
                  (errors.products as ProductErrorField[])[index] &&
                  'quantity' in (errors.products as ProductErrorField[])[index] &&
                  (errors.products as ProductErrorField[])[index].quantity.message
                }
                {...field}
              >
                {quantities.map((quantity, index) => (
                  <MenuItem key={index} value={quantity}>
                    {quantity}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          {index !== 0 && (
            <IconButton onClick={() => fieldArrayReturn.remove(index)}>
              <DisabledByDefaultIcon />
            </IconButton>
          )}
          {/* <IconButton onClick={() => fieldArrayReturn.append([])}> */}
          <IconButton onClick={() => fieldArrayReturn.append({ productID: '' })}>
            <AddBoxIcon />
          </IconButton>
        </Box>
      ))}
      <Box mt={2} mb={2} sx={{ display: 'flex', alignContent: 'center', alignItems: 'center' }}>
        {/* <input
              type='text'
              value={deliveryStartYear}
              {...formReturn.register('deliveryStartYear', { valueAsNumber: true })}
            /> */}
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
        {/* <Typography color='text.secondary'>{deliveryStartYear}&nbsp;/&nbsp;</Typography> */}
        <Controller
          name='deliveryStartMonth'
          control={formReturn.control}
          defaultValue={nextMonth}
          rules={{ required: '配送開始月を選択してください' }}
          render={({ field: { onChange, ...rest }, formState: { errors } }) => (
            // render={({ field, formState: { errors } }) => (
            <TextField
              select
              onChange={handleChange}
              label='配送開始月'
              error={Boolean(errors.deliveryStartMonth)}
              helperText={errors.deliveryStartMonth && errors.deliveryStartMonth.message}
              sx={{ width: 100 }}
              {...rest}
              // {...field}
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
      <Box mt={2} mb={2}>
        <Controller
          name='staffID'
          control={formReturn.control}
          defaultValue={''}
          rules={{ required: '担当者を選択してください' }}
          render={({ field, formState: { errors } }) => (
            <TextField
              select
              fullWidth
              label='担当者'
              error={Boolean(errors.staffID)}
              helperText={errors.staffID && errors.staffID.message}
              {...field}
            >
              {staffList &&
                staffList.map((staff) => (
                  <MenuItem key={staff.id} value={staff.id}>
                    {staff.name}
                  </MenuItem>
                ))}
            </TextField>
          )}
        />
      </Box>
      <Button onClick={cancelHandler}>キャンセル</Button>
      <Button type='submit' variant='contained' startIcon={startIcon}>
        確認する
      </Button>
    </Form>
  );
};
