import { Add } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { FormScreenQuery } from 'constants/form-screen-query';
import { Path } from 'constants/path';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useOrderFormParam } from 'stores/use-order-form-param';

const defaultValues = {
  products: [{ relationID: '', productID: '', name: '', unitPrice: 0, quantity: 1 }],
  staffID: '',
};

export const CreateSubscriptionOrderButton = () => {
  const router = useRouter();
  const { mutate } = useOrderFormParam();

  const onButtonClick = useCallback(() => {
    // It initializes all global cache data.
    mutate(defaultValues, false);
    router.push(`${Path.subscriptionOrder}?${FormScreenQuery.input}`, undefined, { shallow: true });
  }, [mutate, router]);

  return (
    <Button onClick={onButtonClick} variant='outlined' startIcon={<Add />}>
      定期便を申し込む
    </Button>
  );
};
