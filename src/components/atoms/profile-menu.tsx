import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Divider, IconButton, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import SvgIcon from '@mui/material/SvgIcon';
import { HeaderItem } from 'components/molecules/header';
import { Path } from 'constants/path';
import React, { useState } from 'react';
import { SignOutMenuItem } from 'components/organisms/sign-out/sign-out-menu-item';
import Link from 'components/atoms/link';
import { useRouter } from 'next/router';

type Props = {
  menuItems: HeaderItem[][];
};

export const ProfileMenu = (props: Props) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        size='large'
        aria-label='account of current user'
        aria-controls='menu-appbar'
        aria-haspopup='true'
        onClick={handleMenu}
        color='inherit'
      >
        <AccountCircleIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        // onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {props.menuItems.map((items, index) => (
          <div key={index}>
            {items.map((item) =>
              item.path === Path.SignOut ? (
                <SignOutMenuItem handleClose={handleClose} key={item.path}>
                  <ListItemIcon>
                    <SvgIcon component={item.icon} fontSize='small' />
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </SignOutMenuItem>
              ) : (
                <MenuItem key={item.path} component={Link} href={item.path}>
                  <ListItemIcon>
                    <SvgIcon component={item.icon} fontSize='small' />
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </MenuItem>
              )
            )}
            {index === 0 && <Divider />}
          </div>
        ))}
      </Menu>
    </>
  );
};
