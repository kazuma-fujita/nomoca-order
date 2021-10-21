import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import SvgIcon from '@mui/material/SvgIcon';
import { HeaderItem } from 'components/molecules/header';
import React, { useState } from 'react';

type Props = {
  menuItems: HeaderItem[][];
};

export const ProfileMenu = (props: Props) => {
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
        {props.menuItems.map((items, index) => (
          <div key={index}>
            {items.map((item) => (
              <MenuItem onClick={handleClose} key={item.path}>
                <ListItemIcon>
                  <SvgIcon component={item.icon} fontSize='small' />
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </MenuItem>
            ))}
            {index === 0 && <Divider />}
          </div>
        ))}
      </Menu>
    </>
  );
};
