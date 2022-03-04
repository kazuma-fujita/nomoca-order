import { Add } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { DeliveryType } from 'API';
import { FormScreenQuery } from 'constants/form-screen-query';
import { Path } from 'constants/path';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useOrderFormParam } from 'stores/use-order-form-param';

export const singleOrderFormDefaultValues = {
  products: [{ relationID: '', productID: '', name: '', unitPrice: 0, quantity: 1 }],
  staffID: '',
  DeliveryType: DeliveryType.regular,
};

export const CreateSingleOrderButton = () => {
  const router = useRouter();
  const { mutate } = useOrderFormParam();

  const onButtonClick = useCallback(() => {
    // It initializes all global cache data.
    mutate(singleOrderFormDefaultValues, false);
    router.push(`${Path.singleOrder}?${FormScreenQuery.input}`, undefined, { shallow: true });
  }, [mutate, router]);

  return (
    <Button onClick={onButtonClick} variant='outlined' startIcon={<Add />}>
      商品を注文する
    </Button>
  );
};
