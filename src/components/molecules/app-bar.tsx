import MenuIcon from '@mui/icons-material/Menu';
import { AppBar as MuiAppBar, IconButton, Toolbar, Typography, Box } from '@mui/material';
import { ProfileMenu } from 'components/atoms/profile-menu';
import { HeaderItem } from 'components/molecules/header';

type Props = {
  screenName: string;
  menuItems: HeaderItem[][];
  email: string | null;
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
          {props.screenName}
        </Typography>
        <Box sx={{ display: { md: 'flex' } }}>
          <Typography variant='h6'>Nomoca Order</Typography>
        </Box>
        <ProfileMenu menuItems={props.menuItems} email={props.email} />
      </Toolbar>
    </MuiAppBar>
  );
};
