import { Box, CircularProgress, MenuItem, TextField } from '@mui/material';
import { ErrorAlert } from 'components/atoms/alerts/error-alert';
import { UpsertStaffButton } from 'components/organisms/staffs/upsert-staff-button';
import { Controller, UseFormReturn } from 'react-hook-form';
import { OrderFormParam } from 'stores/use-order-form-param';
import { useStaffList } from 'stores/use-staff-list';

export const StaffSelectBox = ({ control }: UseFormReturn<OrderFormParam>) => {
  const { data: staffList, isLoading, error, isEmptyList } = useStaffList();
  return (
    <Box mt={4} ml={4}>
      {isLoading ||
        error ||
        (isEmptyList && (
          <>
            {isLoading && <CircularProgress aria-label='Now loading' />}
            {error && <ErrorAlert>{error}</ErrorAlert>}
            {isEmptyList && <UpsertStaffButton />}
          </>
        ))}
      {staffList && !isEmptyList && (
        <Box display='flex' alignItems='center'>
          <Controller
            name='staffID'
            control={control}
            defaultValue={''}
            rules={{ required: '発注担当者を選択してください' }}
            render={({ field, formState: { errors } }) => (
              <TextField
                select
                sx={{ width: 240 }}
                // fullWidth
                label='発注担当者'
                error={Boolean(errors.staffID)}
                helperText={errors.staffID && errors.staffID.message}
                disabled={isLoading}
                {...field}
              >
                {staffList.map((staff) => (
                  <MenuItem key={staff.id} value={staff.id}>
                    {`${staff.lastName}  ${staff.firstName}`}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          <Box ml={4} />
          <UpsertStaffButton />
        </Box>
      )}
    </Box>
  );
};
