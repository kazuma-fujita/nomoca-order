import { Box, Grid } from '@mui/material';
import { DeliveryStatus } from 'API';
import { ErrorAlert } from 'components/atoms/alerts/error-alert';
import { SearchButton } from 'components/atoms/buttons/search-button';
import Form from 'components/atoms/form';
// import { SearchClinicNameTextField } from 'components/molecules/text-fields/clinic-name-text-field';
// import { SearchPhoneNumberTextField } from 'components/molecules/text-fields/phone-number-text-field';
import { useSingleOrderSearchParam } from 'hooks/admins/single-orders/use-single-order-search-param';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useSWRConfig } from 'swr';
import { useFetchOrderList } from 'hooks/orders/use-fetch-order-list';
import { SearchDeliveryStatusSelectBox } from './search-delivery-status-select-box';

export type SingleOrderSearchParam = {
  deliveryStatus: DeliveryStatus;
  name: string;
  phoneNumber: string;
};

export const SingleOrderSearchForm = () => {
  const useFormReturn = useForm<SingleOrderSearchParam>();
  const { handleSubmit, control } = useFormReturn;
  const { setSearchState } = useSingleOrderSearchParam();
  const { mutate } = useSWRConfig();
  const { swrKey, isLoading, error } = useFetchOrderList();

  const submitHandler = handleSubmit(
    useCallback(
      (param: SingleOrderSearchParam) => {
        // グローバルなcontextに検索条件保存
        setSearchState(param);
        // 保存した検索条件を元に再検索実行
        mutate(swrKey);
      },
      [mutate, setSearchState, swrKey],
    ),
  );
  return (
    <Form id='search-form' onSubmit={submitHandler}>
      <Grid container direction='row' alignItems='center' spacing={4}>
        <Grid item>
          <SearchDeliveryStatusSelectBox control={control} />
        </Grid>
        {/* <Grid item>
          <SearchClinicNameTextField {...useFormReturn} disabled={isLoading} />
        </Grid>
        <Grid item>
          <SearchPhoneNumberTextField {...useFormReturn} disabled={isLoading} />
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
