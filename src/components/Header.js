import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Tabs, Tab } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
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
          HR Dashboard - Job Management
        </Typography>
      </Box>

      {/* Navigation bar */}
      <AppBar position="static" sx={{ bgcolor: '#2c3e50' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Tabs textColor="inherit" value={false}>
            <Tab label="Dashboard" sx={{ color: '#fff' }} onClick={() => handleTabClick('/hr-dashboard')} />
            <Tab label="Job Postings" sx={{ color: '#fff' }} onClick={() => handleTabClick('/job-postings')} />
            <Tab label="Applications" sx={{ color: '#fff' }} onClick={() => handleTabClick('/applications')} />
            <Tab label="Reports" sx={{ color: '#fff' }} onClick={() => handleTabClick('/reports')} />
            <Tab label="Settings" sx={{ color: '#fff' }} onClick={() => handleTabClick('/settings')} />
          </Tabs>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ mr: 2, color: '#fff' }}>HR Admin</Typography>
            <Button variant="contained" color="inherit" size="small" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
