import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import EditIcon from '@mui/icons-material/Edit';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WifiProtectedSetupIcon from '@mui/icons-material/WifiProtectedSetup';
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
  ListItemButton,
} from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import SvgIcon, { SvgIconTypeMap } from '@mui/material/SvgIcon';
import Link from 'components/atoms/link';
import { HeaderItem } from 'components/molecules/header';
import { useRouter } from 'next/router';
import { useCurrentUser } from '../../stores/use-current-user';

type Props = {
  drawerItems: HeaderItem[][];
  on: boolean;
  toggle: (nextValue?: any) => void;
};

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export const SideDrawer = (props: Props) => {
  const { currentUser, error } = useCurrentUser();
  console.log('SideDrawer user:', currentUser);
  console.log('SideDrawer error:', error);
  const router = useRouter();
  return (
    <Drawer
      open={props.on}
      onClose={props.toggle}
      sx={{
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
      }}
    >
      <DrawerHeader>
        <IconButton onClick={props.toggle}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      {props.drawerItems.map((items, index) => (
        <div key={index}>
          <List>
            {items.map((item) => (
              <ListItemButton
                selected={`/${item.path}` === router.pathname}
                key={item.path}
                component={Link}
                href={item.path}
              >
                <ListItemIcon>
                  <SvgIcon component={item.icon} />
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
          <Divider />
        </div>
      ))}
    </Drawer>
  );
};
