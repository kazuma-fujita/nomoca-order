import { MenuItem, TextField } from '@mui/material';
import { DeliveryStatus } from 'API';
import { Control, Controller } from 'react-hook-form';
import { SingleOrderSearchParam } from './single-order-search-form';

type Props = {
  control: Control<SingleOrderSearchParam, object>;
};

export const SearchDeliveryStatusSelectBox = ({ control }: Props) => (
  <Controller
    name='deliveryStatus'
    control={control}
    defaultValue={DeliveryStatus.ordered} // デフォルト未発送
    rules={{
      required: '配送状況を選択してください',
      pattern: {
        value: /^[none|ordered|delivered|canceled]+$/i,
        message: '配送状況を正しく入力してください',
      },
    }}
    render={({ field, formState: { errors } }) => (
      <TextField
        select
        label='配送状況'
        error={Boolean(errors.deliveryStatus)}
        helperText={errors.deliveryStatus && errors.deliveryStatus.message}
        {...field}
      >
        <MenuItem key={DeliveryStatus.none} value={DeliveryStatus.none}>
          全件
        </MenuItem>
        <MenuItem key={DeliveryStatus.ordered} value={DeliveryStatus.ordered}>
          未発送
        </MenuItem>
        <MenuItem key={DeliveryStatus.delivered} value={DeliveryStatus.delivered}>
          発送済
        </MenuItem>
        <MenuItem key={DeliveryStatus.canceled} value={DeliveryStatus.canceled}>
          注文キャンセル
        </MenuItem>
      </TextField>
    )}
  />
);
