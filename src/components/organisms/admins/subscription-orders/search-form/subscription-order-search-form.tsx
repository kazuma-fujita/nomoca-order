import { SearchButton } from 'components/atoms/buttons/search-button';
import Form from 'components/atoms/form';
import { BaseSyntheticEvent } from 'react';
import { Control } from 'react-hook-form';
import { DeliveryMonthSelectBox } from './delivery-month-select-box';

export type FormParams = {
  deliveryMonth: number;
};

type Props = {
  isLoading: boolean;
  submitHandler: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  control: Control<FormParams, object>;
};

export const SubscriptionOrderSearchForm = ({ isLoading, submitHandler, control }: Props) => {
  return (
    <Form onSubmit={submitHandler}>
      <DeliveryMonthSelectBox control={control} />
      <SearchButton isLoading={isLoading} />
    </Form>
  );
};
