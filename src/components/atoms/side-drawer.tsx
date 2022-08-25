import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from '@mui/material';
import SvgIcon from '@mui/material/SvgIcon';
import Link from 'components/atoms/link';
import { HeaderItem } from 'components/molecules/header';
import { releaseVersion } from 'constants/release-version';
import { useRouter } from 'next/router';

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
                data-testid={item.path}
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
      <Box ml={2} mt={2} sx={{ fontSize: 12 }}>
        Version {releaseVersion}
      </Box>
    </Drawer>
  );
};
