import { Add } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { FormScreenQuery } from 'constants/form-screen-query';
import { Path } from 'constants/path';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { OrderFormParam, useOrderFormParam } from 'stores/use-order-form-param';
import { addYearWithSelectedMonth } from './input-single-order/input-single-order';

export const defaultValues = {
  products: [{ relationID: '', productID: '', name: '', unitPrice: 0, quantity: 1 }],
  staffID: '',
  deliveryStartMonth: 0,
  deliveryStartYear: 0,
  deliveryInterval: 1,
};

export const CreateSingleOrderButton = () => {
  const router = useRouter();
  const { mutate } = useOrderFormParam();
  const now = new Date(2021, 0, 1);
  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth() + 1;
  const nextMonth = nowMonth + 1 === 13 ? 1 : nowMonth + 1;

  const defaults: OrderFormParam = useMemo(
    () => ({
      ...defaultValues,
      deliveryStartYear: addYearWithSelectedMonth(nowYear, nowMonth, nextMonth),
      deliveryStartMonth: nextMonth,
    }),
    [nextMonth, nowMonth, nowYear],
  );

  const onButtonClick = useCallback(() => {
    // It clears all global cache data.
    mutate(defaults, false);
    router.push(`${Path.singleOrder}?${FormScreenQuery.input}`, undefined, { shallow: true });
  }, [defaults, mutate, router]);

  return (
    <Button onClick={onButtonClick} variant='outlined' startIcon={<Add />}>
      商品を注文する
    </Button>
  );
};
