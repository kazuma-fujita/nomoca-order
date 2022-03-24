import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Button, Chip, Divider } from '@mui/material';
import Form from 'components/atoms/form';
import { ProductSelectBox } from 'components/molecules/select-boxes/product-select-box';
import { StaffSelectBox } from 'components/molecules/select-boxes/staff-select-box';
import { ClinicDetail } from 'components/organisms/clinics/clinic-detail';
import { NormalizedProduct } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { BaseSyntheticEvent } from 'react';
import { UseFieldArrayReturn, UseFormReturn } from 'react-hook-form';
import { OrderFormParam } from 'stores/use-order-form-param';

type Props = {
  submitHandler: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  cancelHandler: () => void;
  formReturn: UseFormReturn<OrderFormParam, object>;
  fieldArrayReturn: UseFieldArrayReturn;
  initialReceiptProducts?: NormalizedProduct[] | null;
};

export const OrderForm: React.FC<Props> = ({
  submitHandler,
  cancelHandler,
  formReturn,
  fieldArrayReturn,
  initialReceiptProducts,
  children,
}) => {
  return (
    <>
      <Form id='order-form' onSubmit={submitHandler}>
        <ProductSelectBox
          fieldArrayReturn={fieldArrayReturn}
          initialReceiptProducts={initialReceiptProducts}
          {...formReturn}
        />
        {children}
      </Form>
      <Box mb={8}>
        <ClinicDetail />
      </Box>
      <Box mt={8} mb={8}>
        <Divider textAlign='left'>
          <Chip label='発注担当者' />
        </Divider>
        <StaffSelectBox {...formReturn} />
      </Box>
      <Box mt={8} mb={8} width='auto' display='flex' justifyContent='center'>
        <Button onClick={cancelHandler}>キャンセル</Button>
        <Box mr={18} />
        <Button type='submit' variant='contained' startIcon={<ArrowForwardIosIcon />} form='order-form'>
          確認する
        </Button>
      </Box>
    </>
  );
};
