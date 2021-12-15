import { MenuItem, TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { FormParams } from './subscription-order-search-form';

type Props = {
  control: Control<FormParams, object>;
};

const MinLength = 1;
const MaxLength = 2;

// 数字連番の配列を生成
const months = Array.from({ length: 12 }, (_, i) => i + 1);

export const DeliveryMonthSelectBox = ({ control }: Props) => (
  <Controller
    name='deliveryMonth'
    control={control}
    defaultValue={0}
    rules={{
      required: '発送月を選択してください',
      pattern: {
        value: /^[0-9]+$/i,
        message: '発送月は半角数字で入力してください',
      },
      minLength: { value: MinLength, message: `発送月は${MinLength}桁で入力してください` },
      maxLength: { value: MaxLength, message: `発送月は${MaxLength}桁で入力してください` },
    }}
    render={({ field, formState: { errors } }) => (
      <TextField
        select
        // fullWidth
        label='発送月'
        error={Boolean(errors.deliveryMonth)}
        helperText={errors.deliveryMonth && errors.deliveryMonth.message}
        {...field}
      >
        <MenuItem key={0} value={0}>
          全件
        </MenuItem>
        {months.map((month) => (
          <MenuItem key={month} value={month}>
            {month}月
          </MenuItem>
        ))}
      </TextField>
    )}
  />
);
