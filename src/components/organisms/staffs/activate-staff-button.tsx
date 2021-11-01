import { Switch } from '@mui/material';
import { useUpdateStaff } from 'hooks/staffs/use-update-staff';
import { useCallback } from 'react';
import { useToggle } from 'react-use';
import { ActivateStaffDialog } from './activate-staff-dialog';

type Props = {
  id: string;
  name: string;
  disabled: boolean;
};

export const ActivateStaffButton = (props: Props) => {
  const { updateStaff, isLoading, error, resetState } = useUpdateStaff();
  const [on, toggle] = useToggle(false);
  const submitHandler = useCallback(async () => {
    await updateStaff({ id: props.id, disabled: !props.disabled });
    if (!error) {
      cancelHandler();
    }
  }, [props.disabled]);
  const cancelHandler = useCallback(() => {
    resetState();
    toggle();
  }, []);
  return (
    <>
      <Switch checked={!props.disabled} onClick={toggle} inputProps={{ 'aria-label': 'activate-switch' }} />
      <ActivateStaffDialog
        name={props.name}
        on={on}
        isLoading={isLoading}
        error={error}
        disabled={props.disabled}
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
      />
    </>
  );
};
