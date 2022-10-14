import { Box, Grid } from '@mui/material';
import { DeliveryStatus } from 'API';
import { ErrorAlert } from 'components/atoms/alerts/error-alert';
import { SearchButton } from 'components/atoms/buttons/search-button';
import Form from 'components/atoms/form';
import { SearchPhoneNumberTextField } from 'components/molecules/text-fields/phone-number-text-field';
import { useSubscriptionOrderHistorySearchParam } from 'hooks/admins/subscription-order-histories/use-subscription-order-history-search-param';
import { useFetchSubscriptionOrderHistoryList } from 'hooks/subscription-order-histories/use-fetch-subscription-order-history-list';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

export type SubscriptionOrderHistorySearchParam = {
  deliveryStatus: DeliveryStatus;
  name: string;
  phoneNumber: string;
};

// type Props = {
//   setSelectedItems: React.Dispatch<React.SetStateAction<ExtendedOrder<SubscriptionOrderHistory>[]>>;
// };

// export const SingleOrderSearchForm = ({ setSelectedItems }: Props) => {
export const SubscriptionOrderHistorySearchForm = () => {
  const useFormReturn = useForm<SubscriptionOrderHistorySearchParam>();
  const { handleSubmit, control } = useFormReturn;
  const { setSearchState } = useSubscriptionOrderHistorySearchParam();
  const { isLoading, error } = useFetchSubscriptionOrderHistoryList();

  // 検索ボタンクリックハンドラー
  const submitHandler = handleSubmit(
    useCallback(
      (param: SubscriptionOrderHistorySearchParam) => {
        console.log('search param', param);
        // グローバルなcontextに検索条件保存。検索条件が更新されるとuseFetchSingleOrderList内でリスト再取得が走る
        setSearchState(param);
      },
      [setSearchState],
    ),
  );

  return (
    <Form id='search-form' onSubmit={submitHandler}>
      <Grid container direction='row' alignItems='center' spacing={4}>
        {/* <Grid item>
          <SearchDeliveryStatusSelectBox control={control} />
        </Grid> */}
        {/* <Grid item>
          <SearchClinicNameTextField {...useFormReturn} disabled={isLoading} />
        </Grid> */}
        <Grid item>
          <SearchPhoneNumberTextField {...useFormReturn} disabled={isLoading} />
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
