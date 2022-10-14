import { Box, Grid } from '@mui/material';
import { ErrorAlert } from 'components/atoms/alerts/error-alert';
import { SearchButton } from 'components/atoms/buttons/search-button';
import Form from 'components/atoms/form';
import { SearchPhoneNumberTextField } from 'components/molecules/text-fields/phone-number-text-field';
import { SearchParam, useSearchParam } from 'hooks/admins/use-search-param';
import { useFetchSubscriptionOrderHistoryList } from 'hooks/subscription-order-histories/use-fetch-subscription-order-history-list';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

export const SubscriptionOrderHistorySearchForm = () => {
  const useFormReturn = useForm<SearchParam>({ reValidateMode: 'onBlur' });
  const { handleSubmit } = useFormReturn;
  const { setSearchState } = useSearchParam();
  const { isLoading, error } = useFetchSubscriptionOrderHistoryList();

  // 検索ボタンクリックハンドラー
  const submitHandler = handleSubmit(
    useCallback(
      (param: SearchParam) => {
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
