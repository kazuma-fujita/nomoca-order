import { Add } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Link from 'components/atoms/link';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { useOrderFormParam } from 'stores/use-order-form-param';
import { addYearWithSelectedMonth } from '../input-single-order/input-single-order';
import { OrderFormParam } from 'stores/use-order-form-param';

export const defaultValues = {
  products: [{ productID: '', quantity: 1 }],
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
    mutate(defaults, false);
    router.push('/single-order?screen=input', undefined, { shallow: true });
  }, [defaults, mutate, router]);
  return (
    <Button onClick={onButtonClick} variant='outlined' startIcon={<Add />}>
      商品を注文する
    </Button>
  );
};
