import { Edit } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { useUpdateOrderButton } from 'hooks/orders/use-order-form';
import { NormalizedProduct } from 'hooks/subscription-orders/use-fetch-subscription-order-list';

export type UpdateOrderProps = {
  id: string;
  products: NormalizedProduct[];
  staffID: string;
};

export const UpdateSubscriptionOrderButton = ({ id, products, staffID }: UpdateOrderProps) => {
  const { buttonLabel, onButtonClick } = useUpdateOrderButton({ id: id, products: products, staffID: staffID });
  return (
    <Button onClick={onButtonClick} variant='outlined' startIcon={<Edit fontSize='small' />} size='small'>
      {buttonLabel}
    </Button>
  );
};
