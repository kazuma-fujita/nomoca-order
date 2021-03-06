import { Box, Typography } from '@mui/material';
import { ErrorAlert } from 'components/atoms/alerts/error-alert';
import { useFetchClinic } from 'hooks/clinics/use-fetch-clinic';
import { useEffect } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { OrderFormParam } from 'stores/use-order-form-param';
import { ClinicDetail } from './clinic-detail';
import { UpsertClinicButton } from './upsert-clinic-button';

export const ClinicDetailOrderFormInput = ({ setValue, control }: UseFormReturn<OrderFormParam>) => {
  const { data } = useFetchClinic();
  useEffect(() => {
    if (data) {
      setValue('clinicID', data.id);
    }
  }, [data, setValue]);
  return (
    <>
      <ClinicDetailInput />
      <br />
      <Controller
        name='clinicID'
        control={control}
        defaultValue={''}
        rules={{ required: '配送先を作成してください' }}
        render={({ formState: { errors } }) => (
          <>
            <Typography variant='caption' color='error'>
              {errors.clinicID && errors.clinicID.message}
            </Typography>
          </>
        )}
      />
    </>
  );
};

export const ClinicDetailInput = () => {
  // const { data, isLoading, error } = useFetchClinic();
  const { data, error } = useFetchClinic();
  // if (isLoading) return <CircularProgress aria-label='Now loading' />;
  if (error) return <ErrorAlert>{error}</ErrorAlert>;
  return (
    <>
      {data ? (
        <Box display='flex' alignItems='center'>
          <ClinicDetail />
          <Box ml={4} />
          <UpsertClinicButton />
        </Box>
      ) : (
        <UpsertClinicButton />
      )}
    </>
  );
};
