import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import { useToggle } from 'react-use';
import WifiProtectedSetupIcon from '@mui/icons-material/WifiProtectedSetup';
import LockIcon from '@mui/icons-material/Lock';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export const SideDrawer = () => {
  const [on, toggle] = useToggle(true);
  const listOrderItems = [
    { path: 'singleOrder', icon: ShoppingCartIcon, label: '注文' },
    { path: 'subscriptionOrder', icon: WifiProtectedSetupIcon, label: '定期便申し込み' },
  ];
  const listSettingItems = [
    { path: 'staff', icon: PeopleIcon, label: '担当者管理' },
    { path: 'editClinic', icon: LocalHospitalIcon, label: '施設情報編集' },
    { path: 'changePassword', icon: LockIcon, label: 'パスワード変更' },
    { path: 'term', icon: FormatAlignLeftIcon, label: '利用規約' },
    { path: 'logout', icon: LogoutIcon, label: 'ログアウト' },
  ];
  return (
    <Drawer open={on} onClose={toggle}>
      <List>
        {listOrderItems.map((item) => (
          <ListItem button key={item.path}>
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
          <ListItem button key={item.path}>
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
