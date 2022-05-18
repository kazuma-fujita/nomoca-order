import { Delete } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { useDeleteStaff } from 'hooks/staffs/use-delete-staff';
import { useCallback } from 'react';
import { useToggle } from 'react-use';
import { DeleteStaffDialog } from './delete-staff-dialog';

type Props = {
  id: string;
  name: string;
};

export const DeleteStaffButton = (props: Props) => {
  const { deleteStaff, isLoading, error, resetState } = useDeleteStaff();
  const [on, toggle] = useToggle(false);

  const cancelHandler = useCallback(() => {
    resetState();
    toggle();
  }, [resetState, toggle]);

  const submitHandler = useCallback(async () => {
    await deleteStaff(props.id);
    if (!error) {
      toggle();
    }
  }, [deleteStaff, error, props.id, toggle]);

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
