import CategoryIcon from '@mui/icons-material/Category';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
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
import Error from 'next/error';
import { useRouter } from 'next/router';
import { useToggle } from 'react-use';
import { useCurrentUser } from 'stores/use-current-user';

export type HeaderItem = {
  path: string;
  icon: OverridableComponent<SvgIconTypeMap<unknown, 'svg'>> & {
    muiName: string;
  };
  label: string;
};

export const Header = () => {
  const [on, toggle] = useToggle(false);
  const router = useRouter();
  const { isOperator } = useCurrentUser();
  const drawerItems: HeaderItem[][] = isOperator
    ? [
        [
          { path: Path.adminsSingleOrder, icon: ShoppingCartIcon, label: ScreenName.adminsSingleOrder },
          {
            path: Path.adminsSubscriptionOrder,
            icon: WifiProtectedSetupIcon,
            label: ScreenName.adminsSubscriptionOrder,
          },
        ],
        [
          { path: Path.singleOrderProduct, icon: CategoryIcon, label: ScreenName.singleOrderProduct },
          { path: Path.subscriptionOrderProduct, icon: CategoryIcon, label: ScreenName.subscriptionOrderProduct },
          { path: Path.term, icon: FormatAlignLeftIcon, label: ScreenName.term },
        ],
      ]
    : [
        [
          { path: Path.singleOrder, icon: ShoppingCartIcon, label: ScreenName.singleOrder },
          { path: Path.subscriptionOrder, icon: WifiProtectedSetupIcon, label: ScreenName.subscriptionOrder },
        ],
        [
          { path: Path.staff, icon: PeopleIcon, label: ScreenName.staff },
          { path: Path.clinic, icon: LocalShippingIcon, label: ScreenName.clinic },
          { path: Path.term, icon: FormatAlignLeftIcon, label: ScreenName.term },
        ],
      ];
  const menuItems: HeaderItem[][] = [
    // パスワード変更は要望があれば実装
    // [{ path: Path.changePassword, icon: LockIcon, label: ScreenName.changePassword }],
    [{ path: Path.signOut, icon: LogoutIcon, label: ScreenName.signOut }],
  ];
  // findItemsが無かった場合401画面へ遷移
  let findItems = drawerItems
    .map((items) => items.find((item) => item.path === router.pathname))
    .filter((item) => item);

  if (findItems.length === 0) {
    findItems = menuItems.map((items) => items.find((item) => item.path === router.pathname)).filter((item) => item);
  }
  if (findItems.length === 0) {
    // Nextの組み込み401 Unauthorizedページを表示
    return <Error statusCode={401} />;
  }
  const appBarLabel = findItems[0] ? findItems[0].label : 'unknown';
  return (
    <>
      <AppBar screenName={appBarLabel} menuItems={menuItems} on={on} toggle={toggle} />
      <SideDrawer drawerItems={drawerItems} on={on} toggle={toggle} />
    </>
  );
};
