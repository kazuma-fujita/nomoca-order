import { Box, Grid } from '@mui/material';
import { ErrorAlert } from 'components/atoms/alerts/error-alert';
import { SearchButton } from 'components/atoms/buttons/search-button';
import Form from 'components/atoms/form';
import { BaseSyntheticEvent } from 'react';
import { Control } from 'react-hook-form';
import { SearchDeliveryMonthSelectBox } from './search-delivery-month-select-box';
import { SubscriptionOrderSearchParams } from './subscription-order-search-form-container';

export type Props = {
  isLoading: boolean;
  error: Error | null;
  submitHandler: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  control: Control<SubscriptionOrderSearchParams, object>;
};

export const SubscriptionOrderSearchForm = ({ isLoading, error, submitHandler, control }: Props) => {
  return (
    <Form id='search-form' onSubmit={submitHandler}>
      <Grid container direction='row' alignItems='center' spacing={4}>
        <Grid item>{/* <SearchDeliveryYearSelectBox control={control} now={now} /> */}</Grid>
        <Grid item>
          <SearchDeliveryMonthSelectBox control={control} />
        </Grid>
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
