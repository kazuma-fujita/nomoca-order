import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Button, Chip, Divider } from '@mui/material';
import Form from 'components/atoms/form';
import { ProductSelectBox } from 'components/molecules/select-boxes/product-select-box';
import { StaffSelectBox } from 'components/molecules/select-boxes/staff-select-box';
import { BaseSyntheticEvent } from 'react';
import { UseFieldArrayReturn, UseFormReturn } from 'react-hook-form';
import { OrderFormParam } from 'stores/use-order-form-param';
import { ClinicDetailOrderFormInput } from '../clinics/clinic-detail-input';

type Props = {
  submitHandler: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  cancelHandler: () => void;
  formReturn: UseFormReturn<OrderFormParam, object>;
  fieldArrayReturn: UseFieldArrayReturn;
};

export const OrderForm: React.FC<Props> = ({
  submitHandler,
  cancelHandler,
  formReturn,
  fieldArrayReturn,
  children,
}) => {
  return (
    <>
      {/* 配送先と担当者の入力formがネストしている為、配送先と担当者を登録しようとすると注文画面のformも送信されてしまう。
			form二重送信を回避する為、formのid属性とsubmit buttonのform属性に同じidを設定する。かつ、submit buttonをformタグの外に出す */}
      <Form id='order-form' onSubmit={submitHandler}></Form>
      <ProductSelectBox fieldArrayReturn={fieldArrayReturn} {...formReturn} />
      {children}
      {/* 配送先と担当者componentsはそれぞれ入力formがあるので、注文画面のformタグの外に配置する */}
      <Box mb={8}>
        <Divider textAlign='left'>
          <Chip label='配送先' />
        </Divider>
        <Box mt={4} ml={4}>
          <ClinicDetailOrderFormInput {...formReturn} />
        </Box>
      </Box>
      <Box mt={8} mb={8}>
        <Divider textAlign='left'>
          <Chip label='発注担当者' />
        </Divider>
        <Box mt={4} ml={4}>
          <StaffSelectBox {...formReturn} />
        </Box>
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
