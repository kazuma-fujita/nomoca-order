import { SideDrawer } from 'components/atoms/side-drawer';
import { AppBar } from 'components/molecules/app-bar';
import { useToggle } from 'react-use';

export const GlobalNavigation = () => {
  const [on, toggle] = useToggle(false);
  return (
    <>
      <AppBar on={on} toggle={toggle} />
      <SideDrawer on={on} toggle={toggle} />
    </>
  );
};
