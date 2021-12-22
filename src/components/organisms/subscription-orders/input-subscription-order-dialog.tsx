import AddBoxIcon from '@mui/icons-material/AddBox';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { SubscriptionOrder } from 'API';
import { ErrorAlert } from 'components/atoms/alerts/error-alert';
import Form from 'components/atoms/form';
import { BaseSyntheticEvent, ReactElement, useState } from 'react';
import { Controller, UseFieldArrayReturn, UseFormReturn } from 'react-hook-form';
import { useNowDate } from 'stores/use-now-date';
import { useProductList } from 'stores/use-product-list';
import { useStaffList } from 'stores/use-staff-list';

type Props = {
  label: string;
  startIcon: ReactElement;
  on: boolean;
  isLoading: boolean;
  error: Error | null;
  submitHandler: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  cancelHandler: () => void;
  useFormReturn: UseFormReturn<SubscriptionOrder, object>;
  useFieldArrayReturn: UseFieldArrayReturn;
  staffID?: string;
};

type ProductErrorField = {
  productID: { message: string };
  quantity: { message: string };
};

// 数字連番の配列を生成
const quantities = Array.from({ length: 20 }, (_, i) => i + 1);
const deliveryIntervals = [1, 2, 3, 4, 6, 12];

const addYearWithSelectedMonth = (nowYear: number, nowMonth: number, selectMonth: number) =>
  selectMonth <= nowMonth ? nowYear + 1 : nowYear;

export const InputSubscriptionOrderDialog = (props: Props) => {
  const { data: productList } = useProductList();
  const { data: staffList } = useStaffList();
  const { now } = useNowDate();
  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth() + 1;
  const nextMonth = nowMonth + 1 === 13 ? 1 : nowMonth + 1;
  const deliveryStartMonths = Array.from({ length: 6 }, (_, i) => {
    const month = i + nextMonth;
    return 12 < month ? month - 12 : month;
  });

  const [deliveryStartYear, setDeliveryStartYear] = useState(addYearWithSelectedMonth(nowYear, nowMonth, nextMonth));
  const [deliveryStartMonthValue, setDeliveryStartMonthValue] = useState(nextMonth);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setDeliveryStartYear(addYearWithSelectedMonth(nowYear, nowMonth, value));
    setDeliveryStartMonthValue(value);
  };

  return (
    <Dialog open={props.on} fullWidth={true}>
      <Form onSubmit={props.submitHandler}>
        <DialogTitle>定期便を{props.label}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>説明を追加</DialogContentText> */}
          {props.error && <ErrorAlert>{props.error}</ErrorAlert>}
          {props.useFieldArrayReturn.fields.map((item, index) => (
            <Box mt={2} mb={2} key={item.id} sx={{ display: 'flex' }}>
              <Controller
                name={`products.items.${index}.productID`}
                control={props.useFormReturn.control}
                defaultValue={''}
                rules={{ required: '商品を選択してください' }}
                render={({ field, formState: { errors } }) => (
                  <TextField
                    select
                    fullWidth
                    label='商品'
                    error={Boolean(
                      errors.products &&
                        'items' in errors.products &&
                        (errors.products.items as ProductErrorField[])[index] &&
                        'productID' in (errors.products.items as ProductErrorField[])[index],
                    )}
                    helperText={
                      errors.products &&
                      'items' in errors.products &&
                      (errors.products.items as ProductErrorField[])[index] &&
                      'productID' in (errors.products.items as ProductErrorField[])[index] &&
                      (errors.products.items as ProductErrorField[])[index].productID.message
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
                name={`products.items.${index}.quantity`}
                control={props.useFormReturn.control}
                defaultValue={1}
                rules={{ required: '数量を選択してください' }}
                render={({ field, formState: { errors } }) => (
                  <TextField
                    select
                    sx={{ width: 100 }}
                    label='数量'
                    error={Boolean(
                      errors.products &&
                        'items' in errors.products &&
                        (errors.products.items as ProductErrorField[])[index] &&
                        'quantity' in (errors.products.items as ProductErrorField[])[index],
                    )}
                    helperText={
                      errors.products &&
                      'items' in errors.products &&
                      (errors.products.items as ProductErrorField[])[index] &&
                      'quantity' in (errors.products.items as ProductErrorField[])[index] &&
                      (errors.products.items as ProductErrorField[])[index].quantity.message
                    }
                    {...field}
                  >
                    {quantities &&
                      quantities.map((quantity, index) => (
                        <MenuItem key={index} value={quantity}>
                          {quantity}
                        </MenuItem>
                      ))}
                  </TextField>
                )}
              />
              {index !== 0 && (
                <IconButton onClick={() => props.useFieldArrayReturn.remove(index)}>
                  <DisabledByDefaultIcon />
                </IconButton>
              )}
              <IconButton onClick={() => props.useFieldArrayReturn.append({ productID: '' })}>
                <AddBoxIcon />
              </IconButton>
            </Box>
          ))}
          <Box mt={2} mb={2}>
            <Controller
              name='staffID'
              control={props.useFormReturn.control}
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
          <Box mt={2} mb={2} sx={{ display: 'flex', alignContent: 'center', alignItems: 'center' }}>
            <Typography color='text.secondary'>{deliveryStartYear}&nbsp;/&nbsp;</Typography>
            <Controller
              name='deliveryStartMonth'
              control={props.useFormReturn.control}
              defaultValue={nextMonth}
              rules={{ required: '配送開始月を選択してください' }}
              render={({ field: { onChange, value, ...rest }, formState: { errors } }) => (
                <TextField
                  select
                  onChange={handleChange}
                  value={deliveryStartMonthValue}
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
              control={props.useFormReturn.control}
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
        </DialogContent>
        <DialogActions>
          <LoadingButton onClick={props.cancelHandler} loadingIndicator='Loading...' loading={props.isLoading}>
            キャンセル
          </LoadingButton>
          <LoadingButton
            type='submit'
            variant='contained'
            loading={props.isLoading}
            loadingPosition='start'
            startIcon={props.startIcon}
          >
            {props.label}
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
};
