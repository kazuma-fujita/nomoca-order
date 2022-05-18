import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { SubscriptionOrderSearchForm } from './subscription-order-search-form';
import { useSearchSubscriptionOrders } from 'hooks/admins/subscription-orders/use-search-subscription-orders';
import { useNowDate } from 'stores/use-now-date';

export type SubscriptionOrderSearchParams = {
  searchDeliveryYear: number;
  searchDeliveryMonth: number;
};

export const SubscriptionOrderSearchFormContainer = () => {
  const { handleSubmit, control } = useForm<SubscriptionOrderSearchParams>();
  const { search, isLoading, error, resetState } = useSearchSubscriptionOrders();
  const { now } = useNowDate();

  const submitHandler = handleSubmit(
    useCallback(
      async (data: SubscriptionOrderSearchParams) => {
        try {
          await search(data.searchDeliveryYear, data.searchDeliveryMonth, now.getFullYear(), now.getMonth() + 1);
          resetState();
        } catch (error) {}
      },
      [resetState, search, now],
    ),
  );

  return (
    <SubscriptionOrderSearchForm isLoading={isLoading} error={error} submitHandler={submitHandler} control={control} />
  );
};
