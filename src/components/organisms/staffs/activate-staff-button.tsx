import { Done, Remove } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { useUpdateStaff } from 'hooks/staffs/use-update-staff';
import { useCallback } from 'react';
import { useToggle } from 'react-use';
import { ActivateStaffDialog } from './activate-staff-dialog';
import { Typography, Box } from '@mui/material';

type Props = {
  id: string;
  name: string;
  disabled: boolean;
};

export const ActivateStaffButton = (props: Props) => {
  const { updateStaff, isLoading, error, resetState } = useUpdateStaff();
  const [on, toggle] = useToggle(false);
  console.log('props.disabled:', props.disabled);
  const submitHandler = useCallback(async () => {
    await updateStaff({ id: props.id, disabled: !props.disabled });
    if (!error) {
      toggle();
    }
  }, []);
  const cancelHandler = useCallback(() => {
    resetState();
    toggle();
  }, []);
  const label = props.disabled ? '有効' : '無効';
  const buttonColor = props.disabled ? 'success' : 'error';
  const buttonIcon = props.disabled ? <Done /> : <Remove />;
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant='body2' color={props.disabled ? 'error' : 'success'}>
          {props.disabled ? '無効中' : '有効中'}
        </Typography>
        <Box ml={2} />
        <Button onClick={toggle} variant='outlined' color={buttonColor} startIcon={buttonIcon}>
          {label}にする
        </Button>
      </Box>
      <ActivateStaffDialog
        label={label}
        name={props.name}
        buttonIcon={buttonIcon}
        buttonColor={buttonColor}
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
