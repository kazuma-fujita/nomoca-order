import MenuIcon from '@mui/icons-material/Menu';
import { Menu, MenuItem, IconButton, Toolbar, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import LogoutIcon from '@mui/icons-material/Logout';
import SvgIcon from '@mui/material/SvgIcon';
import React from 'react';

export const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const listItems = [
  //   { path: 'changePassword', icon: LockIcon, label: 'パスワード変更' },
  //   { path: 'logout', icon: LogoutIcon, label: 'ログアウト' },
  // ];
  return (
    <div>
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
        id='menu-appbar'
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/* {listItems.map((item, index) => (
            <MenuItem onClick={handleClose} key={item.path}>
              <ListItemIcon>
                <SvgIcon component={item.icon} fontSize='small' />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </MenuItem>
        ))} */}
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <LockIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='パスワード変更' />
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <LogoutIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='ログアウト' />
        </MenuItem>
      </Menu>
    </div>
  );
};
