import { SubscriptionOrder } from 'API';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { SubscriptionOrderSearchForm } from './subscription-order-search-form';
import { useSearchSubscriptionOrders } from 'hooks/admins/subscription-orders/use-search-subscription-orders';

export type FormParams = {
  searchDeliveryYear: number;
  searchDeliveryMonth: number;
};

export const SubscriptionOrderSearchFormContainer = () => {
  const { handleSubmit, control } = useForm<FormParams>();
  const { search, isLoading, error, resetState } = useSearchSubscriptionOrders();

  const submitHandler = handleSubmit(
    useCallback(
      async (data: FormParams) => {
        try {
          await search(data.searchDeliveryMonth);
          resetState();
        } catch (error) {}
      },
      [resetState, search],
    ),
  );

  return (
    <SubscriptionOrderSearchForm isLoading={isLoading} error={error} submitHandler={submitHandler} control={control} />
  );
};
