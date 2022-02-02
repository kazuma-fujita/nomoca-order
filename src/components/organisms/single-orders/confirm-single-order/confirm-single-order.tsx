import SendIcon from '@mui/icons-material/Send';
import { LoadingButton } from '@mui/lab';
import { Chip, Divider } from '@mui/material';
import { ErrorAlert } from 'components/atoms/alerts/error-alert';
import Link from 'components/atoms/link';
import { FormScreenQuery } from 'constants/form-screen-query';
import { Path } from 'constants/path';
import { BaseSyntheticEvent } from 'react';
import { DisplayProduct } from './confirm-single-order-container';

type Props = {
  products: DisplayProduct[];
  staffName: string;
  isLoading: boolean;
  error: Error | null;
  submitHandler: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
};

export const ConfirmSingleOrder = ({ products, staffName, isLoading, error, submitHandler }: Props) => {
  return (
    <>
      {error && <ErrorAlert>{error}</ErrorAlert>}
      <Divider textAlign='left'>
        <Chip label='商品' />
      </Divider>
      {products.map((product) => (
        <div key={product.relationID}>
          <div>{product.name}</div>
          <div>{product.unitPrice}</div>
          <div>{product.quantity}</div>
          <div>{product.unitPrice * product.quantity!}</div>
        </div>
      ))}
      <Divider textAlign='left'>
        <Chip label='担当者' />
      </Divider>
      <div>{staffName}</div>
      <LoadingButton
        loadingIndicator='Loading...'
        loading={isLoading}
        component={Link}
        href={`${Path.singleOrder}?${FormScreenQuery.input}`}
        shallow
      >
        修正する
      </LoadingButton>
      <LoadingButton
        loading={isLoading}
        loadingPosition='start'
        onClick={submitHandler}
        variant='contained'
        startIcon={<SendIcon />}
      >
        注文する
      </LoadingButton>
    </>
  );
};
