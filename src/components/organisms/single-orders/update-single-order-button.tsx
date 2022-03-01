import { Edit } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { NormalizedProduct } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { OrderFormParam, useOrderFormParam } from 'stores/use-order-form-param';
import { DeliveryType } from 'API';

type Props = {
  id: string;
  products: NormalizedProduct[];
  deliveryType: DeliveryType;
  staffID: string;
};

export const UpdateSingleOrderButton = ({ id, products, deliveryType, staffID }: Props) => {
  // 入力フォーム初期値
  const defaultValues: OrderFormParam = useMemo(
    () => ({
      id: id,
      products: products,
      deliveryType: deliveryType,
      deleteProducts: products,
      staffID: staffID,
    }),
    [id, products, deliveryType, staffID],
  );

  const router = useRouter();
  const { mutate } = useOrderFormParam();

  const onButtonClick = useCallback(() => {
    mutate(defaultValues, false);
    router.push('/single-order?screen=input', undefined, { shallow: true });
  }, [defaultValues, mutate, router]);

  return (
    <>
      <Button onClick={onButtonClick} variant='outlined' startIcon={<Edit fontSize='small' />} size='small'>
        変更する
      </Button>
    </>
  );
};
