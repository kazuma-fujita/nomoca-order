import { Box, Grid } from '@mui/material';
import { DeliveryStatus } from 'API';
import { ErrorAlert } from 'components/atoms/alerts/error-alert';
import { SearchButton } from 'components/atoms/buttons/search-button';
import Form from 'components/atoms/form';
import { useSearchSingleOrders } from 'hooks/admins/single-orders/use-search-single-orders';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { SearchDeliveryStatusSelectBox } from './search-delivery-status-select-box';

export type SingleOrderSearchParam = {
  deliveryStatus: DeliveryStatus;
  clinicName: string;
  phoneNumber: string;
};

export const SingleOrderSearchForm = () => {
  const { handleSubmit, control } = useForm<SingleOrderSearchParam>();
  const { search, isLoading, error, resetState } = useSearchSingleOrders();

  const submitHandler = handleSubmit(
    useCallback(
      async (param: SingleOrderSearchParam) => {
        try {
          await search(param);
          resetState();
        } catch (error) {}
      },
      [resetState, search],
    ),
  );
  return (
    <Form id='search-form' onSubmit={submitHandler}>
      <Grid container direction='row' alignItems='center' spacing={4}>
        <Grid item>
          <SearchDeliveryStatusSelectBox control={control} />
        </Grid>
        {/* <Grid item>
          <SearchDeliveryMonthSelectBox control={control} />
        </Grid> */}
        <Grid item>
          <SearchButton isLoading={isLoading} />
        </Grid>
      </Grid>
      {error && (
        <Box pt={4}>
          <ErrorAlert>{error}</ErrorAlert>
        </Box>
      )}
    </Form>
  );
};
