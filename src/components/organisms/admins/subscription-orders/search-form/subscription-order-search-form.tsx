import { Grid } from '@mui/material';
import { SearchButton } from 'components/atoms/buttons/search-button';
import Form from 'components/atoms/form';
import { BaseSyntheticEvent } from 'react';
import { Control } from 'react-hook-form';
import { DeliveryMonthSelectBox } from './delivery-month-select-box';
import { FormParams } from './subscription-order-search-form-container';

export type Props = {
  isLoading: boolean;
  submitHandler: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  control: Control<FormParams, object>;
};

export const SubscriptionOrderSearchForm = ({ isLoading, submitHandler, control }: Props) => {
  return (
    <Form onSubmit={submitHandler}>
      <Grid container direction='row' alignItems='center' spacing={4}>
        <Grid item>
          <DeliveryMonthSelectBox control={control} />
        </Grid>
        <Grid item>
          <SearchButton isLoading={isLoading} />
        </Grid>
      </Grid>
    </Form>
  );
};
