import { MenuItem, TextField } from '@mui/material';
import { Controller, UseFormReturn } from 'react-hook-form';
import { OrderFormParam } from 'stores/use-order-form-param';
import { useStaffList } from 'stores/use-staff-list';

type Props = UseFormReturn<OrderFormParam> & {
  disabled: boolean;
  helperTextLabel: string;
  isDisabled?: boolean;
};

export const StaffSelectBox = ({ control, disabled, helperTextLabel, isDisabled }: Props) => {
  const { data: staffList } = useStaffList();
  return (
    <Controller
      name='staffID'
      control={control}
      defaultValue={''}
      rules={{ required: '発注担当者を選択してください' }}
      render={({ field, formState: { errors } }) => (
        <TextField
          select
          fullWidth
          label='発注担当者'
          error={Boolean(errors.staffID)}
          helperText={errors.staffID && errors.staffID.message}
          {...field}
        >
          {staffList &&
            staffList.map((staff) => (
              <MenuItem key={staff.id} value={staff.id}>
                {`${staff.lastName} ${staff.firstName}`}
              </MenuItem>
            ))}
        </TextField>
      )}
    />
  );
};
