import { Add } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { useToggle } from 'react-use';
import { CreateSingleOrderDialogContainer } from './create-single-order-dialog-container';

export const CreateSingleOrderButton = () => {
  const [on, toggle] = useToggle(false);

  const label = '申し込む';

  return (
    <>
      <Button onClick={toggle} variant='outlined' startIcon={<Add />}>
        定期便を{label}
      </Button>
      <CreateSingleOrderDialogContainer on={on} toggle={toggle} />
    </>
  );
};
