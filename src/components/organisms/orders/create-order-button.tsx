import { Add } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { useCreateOrderButton } from 'hooks/orders/use-upsert-order-form';

export const CreateOrderButton = () => {
  const { buttonLabel, onButtonClick } = useCreateOrderButton();
  return (
    <Button onClick={onButtonClick} variant='outlined' startIcon={<Add />}>
      {buttonLabel}
    </Button>
  );
};
