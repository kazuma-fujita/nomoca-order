import { Add, Edit } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { useUpsertOrderButton } from 'hooks/orders/use-input-order';
import { useFetchProductList } from 'hooks/products/use-fetch-product-list';
import { useFetchStaffList } from 'hooks/staffs/use-fetch-staff-list';
import { NormalizedProduct } from 'hooks/subscription-orders/use-fetch-subscription-order-list';

type Props = {
  id?: string;
  products?: NormalizedProduct[];
  staffID?: string;
};

export const UpsertOrderButton = ({ id, products, staffID }: Props) => {
  const { buttonLabel, onButtonClick } = useUpsertOrderButton(id, products, staffID);
  const { data: orderList } = useFetchProductList();
  const { data: staffList } = useFetchStaffList();
  const startIcon = id ? <Edit fontSize='small' /> : <Add />;
  const size = id ? 'small' : 'large';
  return (
    <Button
      onClick={onButtonClick}
      variant='outlined'
      startIcon={startIcon}
      size={size}
      disabled={!orderList || !staffList}
    >
      {buttonLabel}
    </Button>
  );
};
