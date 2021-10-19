import { Edit, Delete } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { Staff } from 'API';
import { useDeleteStaff } from 'hooks/staffs/use-delete-staff';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useToggle } from 'react-use';
import { InputStaffDialog } from './input-staff-dialog';
import { DeleteStaffDialog } from './delete-staff-dialog';

type Props = {
  id: string;
  name: string;
};

export const DeleteStaffButton = (props: Props) => {
  const { deleteStaff, isLoading, error, resetState } = useDeleteStaff();
  const [on, toggle] = useToggle(false);
  const submitHandler = useCallback(async () => {
    await deleteStaff(props.id);
    if (!error) {
      toggle();
    }
  }, []);
  const cancelHandler = useCallback(() => {
    resetState();
    toggle();
  }, []);
  const label = '削除';

  return (
    <>
      <Button onClick={toggle} variant='outlined' color='error' startIcon={<Delete />}>
        {label}
      </Button>
      <DeleteStaffDialog
        label={label}
        name={props.name}
        on={on}
        isLoading={isLoading}
        error={error}
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
      />
    </>
  );
};
