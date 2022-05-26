import { Box, CircularProgress, MenuItem, TextField } from '@mui/material';
import { ErrorAlert } from 'components/atoms/alerts/error-alert';
import { UpsertStaffButton } from 'components/organisms/staffs/upsert-staff-button';
import { Controller, UseFormReturn } from 'react-hook-form';
import { OrderFormParam } from 'stores/use-order-form-param';
import { useFetchStaffList } from 'hooks/staffs/use-fetch-staff-list';

const StaffSelectInput = ({ control }: UseFormReturn<OrderFormParam>) => {
  const { data: staffList, isLoading } = useFetchStaffList();
  return (
    <Controller
      name='staffID'
      control={control}
      defaultValue={''}
      rules={{ required: '発注担当者を選択してください' }}
      render={({ field, formState: { errors } }) => (
        <TextField
          select
          sx={{ width: 240 }}
          label='発注担当者'
          error={Boolean(errors.staffID)}
          helperText={errors.staffID && errors.staffID.message}
          disabled={isLoading}
          {...field}
        >
          {staffList &&
            staffList.map((staff) => (
              <MenuItem key={staff.id} value={staff.id}>
                {`${staff.lastName}  ${staff.firstName}`}
              </MenuItem>
            ))}
        </TextField>
      )}
    />
  );
};

export const StaffSelectBox = (props: UseFormReturn<OrderFormParam>) => {
  const { isLoading, error, isEmptyList } = useFetchStaffList();
  if (error) return <ErrorAlert>{error}</ErrorAlert>;
  if (isLoading) return <CircularProgress aria-label='Now loading' />;
  return (
    <>
      {!isEmptyList ? (
        <Box display='flex' alignItems='center'>
          <StaffSelectInput {...props} />
          <Box ml={4} />
          <UpsertStaffButton />
        </Box>
      ) : (
        <UpsertStaffButton />
      )}
    </>
  );
};
