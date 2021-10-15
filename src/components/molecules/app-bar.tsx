import MenuIcon from '@mui/icons-material/Menu';
import { AppBar as MuiAppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { ProfileMenu } from 'components/atoms/profile-menu';

type Props = {
  on: boolean;
  toggle: (nextValue?: any) => void;
};

export const AppBar = (props: Props) => {
  return (
    <MuiAppBar>
      <Toolbar>
        <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }} onClick={props.toggle}>
          <MenuIcon />
        </IconButton>
        <Typography variant='h5' component='div' sx={{ flexGrow: 1 }}>
          Nomoca Order
        </Typography>
        <ProfileMenu />
      </Toolbar>
    </MuiAppBar>
  );
};
