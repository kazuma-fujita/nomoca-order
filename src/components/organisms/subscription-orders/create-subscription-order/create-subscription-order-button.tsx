import { Add } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { useToggle } from 'react-use';
import { CreateSubscriptionOrderDialogContainer } from './create-subscription-order-dialog-container';

export const CreateSubscriptionOrderButton = () => {
  const [on, toggle] = useToggle(false);

  const label = '申し込む';

  return (
    <>
      <Button onClick={toggle} variant='outlined' startIcon={<Add />}>
        定期便を{label}
      </Button>
      <CreateSubscriptionOrderDialogContainer on={on} toggle={toggle} />
    </>
  );
};
