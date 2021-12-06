import { Add } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { useToggle } from 'react-use';
import { CreateStaffFormContainer } from './create-staff-form-container';

export const CreateStaffButton = () => {
  const [on, toggle] = useToggle(false);

  return (
    <>
      <Button onClick={toggle} variant='outlined' startIcon={<Add />}>
        担当者を追加する
      </Button>
      <CreateStaffFormContainer on={on} toggle={toggle} />
    </>
  );
};
