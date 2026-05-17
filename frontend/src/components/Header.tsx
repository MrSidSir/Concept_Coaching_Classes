'use client';

import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import SchoolIcon from '@mui/icons-material/School';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navigateToRegistration = () => {
    console.log('Navigate to Student Registration');
  };

  const navigateToAdmin = () => {
    console.log('Admin login/logout triggered');
  };

  const navigateToDashboard = () => {
    console.log('Navigate to Dashboard');
    handleMenuClose();
  };

  const navigateToProfile = () => {
    console.log('Navigate to Profile');
    handleMenuClose();
  };

  const navigateToSettings = () => {
    console.log('Navigate to Settings');
    handleMenuClose();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={navigateToRegistration}>
          <SchoolIcon />
        </IconButton>

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Concept Coaching
        </Typography>

        <IconButton color="inherit" onClick={navigateToAdmin}>
          <AccountCircleIcon />
        </IconButton>

        <IconButton color="inherit" onClick={handleMenuClick}>
          <MenuIcon />
        </IconButton>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={navigateToDashboard}>Dashboard</MenuItem>
          <MenuItem onClick={navigateToProfile}>Profile</MenuItem>
          <MenuItem onClick={navigateToSettings}>Settings</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
