import LoadingButton from '@mui/lab/LoadingButton';
import Form from 'components/atoms/form';
import { BaseSyntheticEvent, ReactElement } from 'react';
import { Control } from 'react-hook-form';
import { DeliveryMonthSelectBox } from './delivery-month-select-box';
import SearchIcon from '@mui/icons-material/Search';

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
      <LoadingButton
        type='submit'
        variant='contained'
        loading={isLoading}
        loadingPosition='start'
        startIcon={<SearchIcon />}
      >
        検索する
      </LoadingButton>
    </Form>
  );
};
