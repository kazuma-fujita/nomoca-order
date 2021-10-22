import EditIcon from '@mui/icons-material/Edit';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import LockIcon from '@mui/icons-material/Lock';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WifiProtectedSetupIcon from '@mui/icons-material/WifiProtectedSetup';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon/SvgIcon';
import { SideDrawer } from 'components/atoms/side-drawer';
import { AppBar } from 'components/molecules/app-bar';
import { Path } from 'constants/path';
import { ScreenName } from 'constants/screen-name';
import { useRouter } from 'next/router';
import { useToggle } from 'react-use';
import { useCurrentUser, useSignOut } from 'stores/use-current-user';

export type HeaderItem = {
  path: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
  };
  label: string;
};

export const Header = () => {
  const [on, toggle] = useToggle(false);
  const router = useRouter();
  const { currentUser, isOperator } = useCurrentUser();
  const { signOut } = useSignOut();
  console.log('Header user:', currentUser);
  console.log('Header isOperator:', isOperator);
  const drawerItems: HeaderItem[][] = isOperator
    ? [
        [
          { path: Path.SingleOrder, icon: ShoppingCartIcon, label: ScreenName.SingleOrder },
          { path: Path.SubscriptionOrder, icon: WifiProtectedSetupIcon, label: ScreenName.SubscriptionOrder },
        ],
        [{ path: Path.Term, icon: FormatAlignLeftIcon, label: ScreenName.Term }],
      ]
    : [
        [
          { path: Path.SingleOrder, icon: ShoppingCartIcon, label: ScreenName.SingleOrder },
          { path: Path.SubscriptionOrder, icon: WifiProtectedSetupIcon, label: ScreenName.SubscriptionOrder },
        ],
        [
          { path: Path.Staff, icon: PeopleIcon, label: ScreenName.Staff },
          { path: Path.Clinic, icon: EditIcon, label: ScreenName.Clinic },
          { path: Path.Term, icon: FormatAlignLeftIcon, label: ScreenName.Term },
        ],
      ];
  const menuItems: HeaderItem[][] = [
    [{ path: Path.ChangePassword, icon: LockIcon, label: ScreenName.ChangePassword }],
    [{ path: Path.SignOut, icon: LogoutIcon, label: ScreenName.SignOut }],
  ];
  // TODO: findItemsが無かった場合ローカルキャッシュを消してログイン画面へ遷移させること
  var findItems = drawerItems
    .map((items) => items.find((item) => `/${item.path}` === router.pathname))
    .filter((item) => item);
  if (findItems.length === 0) {
    findItems = menuItems
      .map((items) => items.find((item) => `/${item.path}` === router.pathname))
      .filter((item) => item);
  }
  // console.log('findItems:', findItems);
  // if (findItems === undefined || findItems.length === 0) {
  //   signOut();
  //   return <></>;
  // }
  // console.log('findItems:', findItems);
  const appBarLabel = findItems[0]!.label;
  return (
    <>
      <AppBar screenName={appBarLabel} menuItems={menuItems} on={on} toggle={toggle} />
      <SideDrawer drawerItems={drawerItems} on={on} toggle={toggle} />
    </>
  );
};
