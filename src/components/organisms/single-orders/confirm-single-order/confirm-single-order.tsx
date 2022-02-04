import SendIcon from '@mui/icons-material/Send';
import { LoadingButton } from '@mui/lab';
import { Chip, Divider, Box, Typography } from '@mui/material';
import { ErrorAlert } from 'components/atoms/alerts/error-alert';
import Link from 'components/atoms/link';
import { ReceiptTable } from 'components/molecules/receipt-table';
import { FormScreenQuery } from 'constants/form-screen-query';
import { Path } from 'constants/path';
import { BaseSyntheticEvent } from 'react';
import { NormalizedProduct } from 'hooks/orders/use-fetch-order-list';

type Props = {
  products: NormalizedProduct[];
  staffName: string;
  isLoading: boolean;
  error: Error | null;
  submitHandler: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
};

export const ConfirmSingleOrder = ({ products, staffName, isLoading, error, submitHandler }: Props) => {
  return (
    <>
      {error && (
        <Box mb={4}>
          <ErrorAlert>{error}</ErrorAlert>
        </Box>
      )}
      <Box width='auto' display='flex' alignItems='center' justifyContent='center' flexDirection='column'>
        <Box width='70%'>
          <Divider textAlign='left'>
            <Chip label='商品' />
          </Divider>
          <Box mb={4}>
            <ReceiptTable products={products} />
          </Box>
          <Divider textAlign='left'>
            <Chip label='担当者' />
          </Divider>
          <Box mt={2} mb={4} ml={4}>
            <Typography>{staffName}</Typography>
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
        </Box>
      </Box>
    </>
  );
};
