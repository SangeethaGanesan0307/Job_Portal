import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Tabs, Tab } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ManagerHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    navigate('/');
  };

  const handleTabClick = (path) => {
    navigate(path);
  };

  return (
    <>
      {/* Title above navbar */}
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" fontWeight="bold">
         Manager - Team Application Review
        </Typography>
      </Box>

      {/* Navigation bar */}
      <AppBar position="static" sx={{ bgcolor: '#2c3e50' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Tabs textColor="inherit" value={false}>
            <Tab label="Dashboard" sx={{ color: '#fff' }} onClick={() => handleTabClick('/manager-dashboard')} />
            <Tab label="Team Applications" sx={{ color: '#fff' }} onClick={() => handleTabClick('/team-applications')} />
            <Tab label="Open Positions" sx={{ color: '#fff' }} onClick={() => handleTabClick('/open-positions')} />
            <Tab label="Team Development" sx={{ color: '#fff' }} onClick={() => handleTabClick('/team-development')} />
            {/* <Tab label="Settings" sx={{ color: '#fff' }} onClick={() => handleTabClick('/settings')} /> */}
          </Tabs>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ mr: 2, color: '#fff' }}>Manager</Typography>
            <Button variant="contained" color="inherit" size="small" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default ManagerHeader;
