// import React from 'react';
// import { Grid, Paper, Typography } from '@mui/material';


// const ManagerStats = ({ stats }) => (
//   <Grid container spacing={2} sx={{ mb: 2 }}>
//     <Grid item xs={12} sm={4}>
//       <Paper elevation={2} sx={{ p: 2 }}>
//         <Typography variant="h6">Team Size</Typography>
//         <Typography>{stats.teamSize || 0}</Typography>
//       </Paper>
//     </Grid>
//     <Grid item xs={12} sm={4}>
//       <Paper elevation={2} sx={{ p: 2 }}>
//         <Typography variant="h6">Pending Approvals</Typography>
//         <Typography>{stats.pendingApprovals || 0}</Typography>
//       </Paper>
//     </Grid>
//     <Grid item xs={12} sm={4}>
//       <Paper elevation={2} sx={{ p: 2 }}>
//         <Typography variant="h6">Total Applications</Typography>
//         <Typography>{stats.totalApplications || 0}</Typography>
//       </Paper>
//     </Grid>
//   </Grid>
// );

// export default ManagerStats;

// import { useState, useEffect } from 'react';
// import { Typography, Paper, Grid, Box, CircularProgress } from '@mui/material';
// import API from '../Api';

// const ManagerStats = () => {
//   const [stats, setStats] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const res = await API.get('/Manager/dashboard-stats');
//         setStats(res.data);
//       } catch (e) {
//         setError('Failed to load stats');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchStats();
//   }, []);

//   if (loading)
//     return <Box display="flex" justifyContent="center"><CircularProgress /></Box>;
//   if (error)
//     return <Typography color="error">{error}</Typography>;

//   return (
//     <Grid container spacing={2} sx={{ mb: 2 }}>
//       <Grid item xs={12} sm={4}>
//         <Paper sx={{ p: 2 }}>
//           <Typography variant="h6">Team Size</Typography>
//           <Typography>{stats.teamSize || 0}</Typography>
//         </Paper>
//       </Grid>
//       <Grid item xs={12} sm={4}>
//         <Paper sx={{ p: 2 }}>
//           <Typography variant="h6">Pending Approvals</Typography>
//           <Typography>{stats.pendingApprovals || 0}</Typography>
//         </Paper>
//       </Grid>
//       <Grid item xs={12} sm={4}>
//         <Paper sx={{ p: 2 }}>
//           <Typography variant="h6">Total Applications</Typography>
//           <Typography>{stats.totalApplications || 0}</Typography>
//         </Paper>
//       </Grid>
//     </Grid>
//   );
// };

// export default ManagerStats;

import { useState, useEffect } from 'react';
import { Typography, Paper, Grid, Box, CircularProgress } from '@mui/material';
import API from '../Api';

const ManagerStats = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Updated API endpoint with /api prefix
        const res = await API.get('/api/Manager/dashboard-stats');
        setStats(res.data);
      } catch (e) {
        setError('Failed to load stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading)
    return <Box display="flex" justifyContent="center"><CircularProgress /></Box>;
  if (error)
    return <Typography color="error">{error}</Typography>;

  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      <Grid item xs={12} sm={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Team Size</Typography>
          <Typography>{stats.teamSize || 0}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Pending Approvals</Typography>
          <Typography>{stats.pendingApprovals || 0}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Total Applications</Typography>
          <Typography>{stats.totalApplications || 0}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ManagerStats;