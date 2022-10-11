import { Box, Grid } from '@mui/material';
import { DeliveryStatus, Order } from 'API';
import { ErrorAlert } from 'components/atoms/alerts/error-alert';
import { SearchButton } from 'components/atoms/buttons/search-button';
import Form from 'components/atoms/form';
import { useSingleOrderSearchParam } from 'hooks/admins/single-orders/use-single-order-search-param';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useFetchSingleOrderList } from 'hooks/orders/use-fetch-single-order-list';
import { SearchDeliveryStatusSelectBox } from './search-delivery-status-select-box';
import { ExtendedOrder } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { SearchPhoneNumberTextField } from 'components/molecules/text-fields/phone-number-text-field';

export type SingleOrderSearchParam = {
  deliveryStatus: DeliveryStatus;
  name: string;
  phoneNumber: string;
};

type Props = {
  setSelectedItems: React.Dispatch<React.SetStateAction<ExtendedOrder<Order>[]>>;
};

export const SingleOrderSearchForm = ({ setSelectedItems }: Props) => {
  const useFormReturn = useForm<SingleOrderSearchParam>();
  const { handleSubmit, control } = useFormReturn;
  const { setSearchState } = useSingleOrderSearchParam();
  const { isLoading, error } = useFetchSingleOrderList();

  // 検索ボタンクリックハンドラー
  const submitHandler = handleSubmit(
    useCallback(
      (param: SingleOrderSearchParam) => {
        console.log('search param', param);
        // グローバルなcontextに検索条件保存。検索条件が更新されるとuseFetchSingleOrderList内でリスト再取得が走る
        setSearchState(param);
        // 選択済みのチェックボックスは全件クリア
        setSelectedItems([]);
      },
      [setSearchState, setSelectedItems],
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
