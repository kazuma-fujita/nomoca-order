import SendIcon from '@mui/icons-material/Send';
import { LoadingButton } from '@mui/lab';
import { Box, Chip, Divider, Typography } from '@mui/material';
import { ErrorAlert } from 'components/atoms/alerts/error-alert';
import { ReceiptTable } from 'components/molecules/receipt-table';
import { NormalizedProduct } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { BaseSyntheticEvent, MouseEventHandler } from 'react';

type Props = {
  products: NormalizedProduct[];
  staffName: string;
  isLoading: boolean;
  error: Error | null;
  submitHandler: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  cancelHandler: MouseEventHandler<HTMLButtonElement> | undefined;
};

export const ConfirmOrder: React.FC<Props> = ({
  products,
  staffName,
  isLoading,
  error,
  submitHandler,
  cancelHandler,
  children,
}) => {
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
      {children}
      <Divider textAlign='left'>
        <Chip label='担当者' />
      </Divider>
      <Box mt={2} mb={4} ml={4}>
        <Typography variant='body1'>{staffName}</Typography>
      </Box>
      <Box mt={8} mb={8} width='auto' display='flex' justifyContent='center'>
        <LoadingButton loadingIndicator='Loading...' loading={isLoading} onClick={cancelHandler}>
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
