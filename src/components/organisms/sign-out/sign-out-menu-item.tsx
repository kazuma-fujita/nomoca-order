import { Delete } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { useCallback } from 'react';
import { useToggle } from 'react-use';
import { useSignOut } from 'stores/use-current-user';
import { SignOutDialog } from './sign-out-dialog';
import { MenuItem } from '@mui/material';

type Props = {
  handleClose: () => void;
};

export const SignOutMenuItem: React.FC<Props> = ({ handleClose, children }) => {
  const { signOut, isLoading, error, resetState } = useSignOut();
  const [on, toggle] = useToggle(false);

  const cancelHandler = useCallback(() => {
    resetState();
    toggle();
    handleClose();
  }, [handleClose, resetState, toggle]);

  const submitHandler = useCallback(async () => {
    await signOut();
    if (!error) {
      cancelHandler();
    }
  }, [cancelHandler, error, signOut]);

  const label = 'ログアウト';

  return (
    <>
      <MenuItem onClick={toggle} key='sign-out'>
        {children}
      </MenuItem>
      <SignOutDialog
        label={label}
        on={on}
        isLoading={isLoading}
        error={error}
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
      />
    </>
  );
};
