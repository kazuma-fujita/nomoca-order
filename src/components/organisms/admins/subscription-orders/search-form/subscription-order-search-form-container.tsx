import { SubscriptionOrder } from 'API';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { SubscriptionOrderSearchForm } from './subscription-order-search-form';

export type FormParams = {
  deliveryMonth: number;
};

export const SubscriptionOrderSearchFormContainer = () => {
  const { handleSubmit, reset: resetForm, control } = useForm<FormParams>();
  // const { createSubscriptionOrder, isLoading, error, resetState } = useCreateSubscriptionOrder();

  const submitHandler = handleSubmit(
    useCallback(async (data: SubscriptionOrder) => {
      console.log('submit handler data:', data);
      // // 関数内ではerrorの値がキャプチャされる為、ダイアログを閉じるエラーハンドリングは関数の戻り値を使用
      // const error = await createSubscriptionOrder(data.products, data.staffID);
      // if (!error) {
      //   cancelHandler();
      // }
    }, []),
  );

  return <SubscriptionOrderSearchForm isLoading={false} submitHandler={submitHandler} control={control} />;
};
