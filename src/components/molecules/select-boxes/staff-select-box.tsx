import { Box, CircularProgress, MenuItem, TextField } from '@mui/material';
import { ErrorAlert } from 'components/atoms/alerts/error-alert';
import { UpsertStaffButton } from 'components/organisms/staffs/upsert-staff-button';
import { Controller, UseFormReturn } from 'react-hook-form';
import { OrderFormParam, useOrderFormParam } from 'stores/use-order-form-param';
import { useFetchStaffList } from 'hooks/staffs/use-fetch-staff-list';
import { useEffect } from 'react';

const StaffSelectInput = ({ setValue, control }: UseFormReturn<OrderFormParam>) => {
  const { data: staffList, isLoading } = useFetchStaffList();
  const { data: defaultValues } = useOrderFormParam();
  useEffect(() => {
    // 定期便更新時はdefaultValuesのstaffIDを最優先にしてプルダウン設定
    // 定期便・通常注文新規作成時にStaffデータがあれば先頭の値をプルダウン設定
    // Staffデータが無い状態で入力画面上でStaffデータを作成した場合、新規作成staffIDを動的にプルダウン設定
    const activeList = staffList && staffList.filter((staff) => !staff.disabled);
    const staffID =
      defaultValues && defaultValues.staffID
        ? defaultValues.staffID
        : activeList && activeList.length > 0
        ? activeList[0].id
        : null;

    if (staffID) {
      // 動的にstaffIDをプルダウン設定
      setValue('staffID', staffID);
    }
  }, [staffList, setValue, defaultValues]);

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
            staffList
              .filter((staff) => !staff.disabled)
              .map((staff) => (
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
  const { isLoading, error } = useFetchStaffList();
  if (isLoading) return <CircularProgress aria-label='Now loading' />;
  if (error) return <ErrorAlert>{error}</ErrorAlert>;
  return (
    <Box display='flex' alignItems='center'>
      <StaffSelectInput {...props} />
      <Box ml={4} />
      <UpsertStaffButton />
    </Box>
  );
};
