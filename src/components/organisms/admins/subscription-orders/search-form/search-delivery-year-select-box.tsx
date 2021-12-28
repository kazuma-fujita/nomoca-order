import { MenuItem, TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { SubscriptionOrderSearchParams } from './subscription-order-search-form-container';

type Props = {
  control: Control<SubscriptionOrderSearchParams, object>;
  now: Date;
};

const MaxLength = 4;

export const SearchDeliveryYearSelectBox = ({ control, now }: Props) => {
  const nowYear = now.getFullYear();
  const nextYear = nowYear + 1;
  const years = [nowYear, nextYear];
  return (
    <Controller
      name='searchDeliveryYear'
      control={control}
      defaultValue={nowYear}
      rules={{
        required: '配送年を選択してください',
        pattern: {
          value: /^[0-9]+$/i,
          message: '配送年は半角数字で入力してください',
        },
        minLength: { value: MaxLength, message: `配送年は${MaxLength}桁で入力してください` },
        maxLength: { value: MaxLength, message: `配送年は${MaxLength}桁で入力してください` },
      }}
      render={({ field, formState: { errors } }) => (
        <TextField
          select
          // fullWidth
          label='配送年'
          error={Boolean(errors.searchDeliveryYear)}
          helperText={errors.searchDeliveryYear && errors.searchDeliveryYear.message}
          {...field}
        >
          {years.map((year) => (
            <MenuItem key={year} value={year}>
              {year}年
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};
