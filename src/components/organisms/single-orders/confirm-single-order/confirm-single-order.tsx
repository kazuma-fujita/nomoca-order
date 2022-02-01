import SendIcon from '@mui/icons-material/Send';
import { Button, Chip, Divider } from '@mui/material';
import Link from 'components/atoms/link';
import { Path } from 'constants/path';
import { FormScreenQuery } from 'constants/form-screen-query';
import { useRouter } from 'next/router';
import { useOrderFormParam } from 'stores/use-order-form-param';
import { useProductList } from 'stores/use-product-list';
import { useStaffList } from 'stores/use-staff-list';
import { useCallback } from 'react';
import { useCreateOrder } from 'hooks/orders/use-create-order';
import { LoadingButton } from '@mui/lab';
import { ErrorAlert } from 'components/atoms/alerts/error-alert';

type Props = {};

export const ConfirmSingleOrder = ({}: Props) => {
  const router = useRouter();
  const { data: orderFormParam } = useOrderFormParam();
  const { data: productList } = useProductList();
  const { data: staffList } = useStaffList();
  const { createOrder, isLoading, error } = useCreateOrder();

  const submitHandler = useCallback(async () => {
    try {
      await createOrder(orderFormParam!);
      router.push(`${Path.singleOrder}?${FormScreenQuery.complete}`, undefined, { shallow: true });
    } catch (error) {}
  }, [createOrder, orderFormParam, router]);

  if (!orderFormParam || !orderFormParam.products || !orderFormParam.staffID || !productList || !staffList) {
    router.push(Path.singleOrder);
    return <></>;
  }

  const products = productList.filter((product) =>
    orderFormParam.products!.some((item) => product.id === item.productID),
  );
  const staffs = staffList.filter((product) => product.id === orderFormParam.staffID);

  if (products.length !== productList.length || staffs.length !== 1) {
    router.push(Path.singleOrder);
    return <></>;
  }
  const productParams = orderFormParam.products.map((item, index) => ({
    ...item,
    name: products[index].name,
    unitPrice: products[index].unitPrice,
  }));

  return (
    <>
      {error && <ErrorAlert>{error}</ErrorAlert>}
      <Divider textAlign='left'>
        <Chip label='商品' />
      </Divider>
      {productParams.map((product) => (
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
      <div>{staffs[0].name}</div>
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
