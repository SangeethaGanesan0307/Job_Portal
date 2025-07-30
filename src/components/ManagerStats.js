import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

const ManagerStats = ({ stats }) => (
  <Grid container spacing={2} sx={{ mb: 2 }}>
    <Grid item xs={12} sm={4}>
      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h6">Team Size</Typography>
        <Typography>{stats.teamSize || 0}</Typography>
      </Paper>
    </Grid>
    <Grid item xs={12} sm={4}>
      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h6">Pending Approvals</Typography>
        <Typography>{stats.pendingApprovals || 0}</Typography>
      </Paper>
    </Grid>
    <Grid item xs={12} sm={4}>
      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h6">Total Applications</Typography>
        <Typography>{stats.totalApplications || 0}</Typography>
      </Paper>
    </Grid>
  </Grid>
);

export default ManagerStats;
