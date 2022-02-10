import { Add } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { FormScreenQuery } from 'constants/form-screen-query';
import { Path } from 'constants/path';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { OrderFormParam, useOrderFormParam } from 'stores/use-order-form-param';
import { DeliveryType } from 'API';

export const defaultValues = {
  products: [{ relationID: '', productID: '', name: '', unitPrice: 0, quantity: 1 }],
  staffID: '',
  DeliveryType: DeliveryType.regular,
};

export const CreateSingleOrderButton = () => {
  const router = useRouter();
  const { mutate } = useOrderFormParam();

  const onButtonClick = useCallback(() => {
    // It initializes all global cache data.
    mutate(defaultValues, false);
    router.push(`${Path.singleOrder}?${FormScreenQuery.input}`, undefined, { shallow: true });
  }, [mutate, router]);

  return (
    <Button onClick={onButtonClick} variant='outlined' startIcon={<Add />}>
      商品を注文する
    </Button>
  );
};
