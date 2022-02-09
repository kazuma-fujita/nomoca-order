import SendIcon from '@mui/icons-material/Send';
import { LoadingButton } from '@mui/lab';
import { Box, Chip, Divider, Typography } from '@mui/material';
import { ErrorAlert } from 'components/atoms/alerts/error-alert';
import Link from 'components/atoms/link';
import { CenteringBodyContainer } from 'components/atoms/centering-body-container';
import { ReceiptTable } from 'components/molecules/receipt-table';
import { FormScreenQuery } from 'constants/form-screen-query';
import { Path } from 'constants/path';
import { NormalizedProduct } from 'hooks/orders/use-fetch-order-list';
import { BaseSyntheticEvent } from 'react';

type Props = {
  products: NormalizedProduct[];
  deliveryTypeLabel: string;
  staffName: string;
  isLoading: boolean;
  error: Error | null;
  submitHandler: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
};

export const ConfirmSingleOrder = ({
  products,
  deliveryTypeLabel,
  staffName,
  isLoading,
  error,
  submitHandler,
}: Props) => {
  return (
    <>
      {error && (
        <Box mb={4}>
          <ErrorAlert>{error}</ErrorAlert>
        </Box>
      )}
      <Divider textAlign='left'>
        <Chip label='商品' />
      </Divider>
      <Box mb={8}>
        <ReceiptTable products={products} />
      </Box>
      <Divider textAlign='left'>
        <Chip label='配送方法' />
      </Divider>
      <Box mt={2} mb={8} ml={4}>
        <Typography variant='body1'>{deliveryTypeLabel}</Typography>
      </Box>
      <Divider textAlign='left'>
        <Chip label='担当者' />
      </Divider>
      <Box mt={2} mb={4} ml={4}>
        <Typography variant='body1'>{staffName}</Typography>
      </Box>
      <Box mt={8} mb={8} width='auto' display='flex' justifyContent='center'>
        <LoadingButton
          loadingIndicator='Loading...'
          loading={isLoading}
          component={Link}
          href={`${Path.singleOrder}?${FormScreenQuery.input}`}
          shallow
        >
          修正する
        </LoadingButton>
        <Box ml={16} />
        <LoadingButton
          loading={isLoading}
          loadingPosition='start'
          onClick={submitHandler}
          variant='contained'
          startIcon={<SendIcon />}
        >
          注文する
        </LoadingButton>
      </Box>
    </>
  );
};
