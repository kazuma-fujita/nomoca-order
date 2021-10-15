import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import EditIcon from '@mui/icons-material/Edit';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WifiProtectedSetupIcon from '@mui/icons-material/WifiProtectedSetup';
import { Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, styled } from '@mui/material';
import SvgIcon from '@mui/material/SvgIcon';
import Link from 'components/atoms/link';
// import Link from 'next/link';

type Props = {
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
  const listOrderItems = [
    { path: 'singleOrder', icon: ShoppingCartIcon, label: '注文' },
    { path: 'subscriptionOrder', icon: WifiProtectedSetupIcon, label: '定期便申し込み' },
  ];
  const listSettingItems = [
    { path: 'staff', icon: PeopleIcon, label: '担当者管理' },
    { path: 'editClinic', icon: EditIcon, label: '施設情報編集' },
    { path: 'term', icon: FormatAlignLeftIcon, label: '利用規約' },
  ];
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
      <List>
        {listOrderItems.map((item) => (
          <ListItem button key={item.path} component={Link} href={item.path}>
            <ListItemIcon>
              <SvgIcon component={item.icon} />
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {listSettingItems.map((item) => (
          <ListItem button key={item.path} component={Link} href={item.path}>
            <ListItemIcon>
              <SvgIcon component={item.icon} />
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
