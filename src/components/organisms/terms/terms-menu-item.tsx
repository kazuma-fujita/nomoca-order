import { MenuItem } from '@mui/material';
import { useToggle } from 'react-use';
import { TermsDialog } from './terms-dialog';

export const TermsMenuItem: React.FC = ({ children }) => {
  const [on, toggle] = useToggle(false);

  return (
    <>
      <MenuItem onClick={toggle} key='terms'>
        {children}
      </MenuItem>
      <TermsDialog on={on} toggle={toggle} />
    </>
  );
};
