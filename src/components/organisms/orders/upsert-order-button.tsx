import { Edit, Add } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { useUpsertOrderButton } from 'hooks/orders/use-input-order';
import { NormalizedProduct } from 'hooks/subscription-orders/use-fetch-subscription-order-list';

type Props = {
  id?: string;
  products?: NormalizedProduct[];
  staffID?: string;
};

export const UpsertOrderButton = ({ id, products, staffID }: Props) => {
  const { buttonLabel, onButtonClick } = useUpsertOrderButton(id, products, staffID);
  const startIcon = id ? <Edit fontSize='small' /> : <Add />;
  const size = id ? 'small' : 'large';
  return (
    <Button onClick={onButtonClick} variant='outlined' startIcon={startIcon} size={size}>
      {buttonLabel}
    </Button>
  );
};
