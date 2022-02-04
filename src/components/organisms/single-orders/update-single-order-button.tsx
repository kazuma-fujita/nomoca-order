import { Edit } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { NormalizedProduct } from 'hooks/orders/use-fetch-order-list';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { OrderFormParam, useOrderFormParam } from 'stores/use-order-form-param';

type Props = {
  id: string;
  products: NormalizedProduct[];
  staffID: string;
};

export const UpdateSingleOrderButton = ({ id, products, staffID }: Props) => {
  // 入力フォーム初期値
  const defaultValues: OrderFormParam = useMemo(
    () => ({
      id: id,
      products: products,
      deleteProducts: products,
      staffID: staffID,
    }),
    [id, products, staffID],
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
