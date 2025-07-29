import { useEffect, useState } from 'react';
import { Typography, CircularProgress, Grid, Paper } from '@mui/material';
import API from '../Api';

const ActiveJobsPage = () => {
  const [activeJobs, setActiveJobs] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    API.get('/api/hr/active-jobs')  
      .then(res => {
        setActiveJobs(res.data);
        setError(false);
      })
      .catch(() => setError(true));
  }, []);

  if (error) return <Typography color="error" sx={{ m: 4 }}>Failed to load active jobs.</Typography>;
  if (!activeJobs) return <CircularProgress sx={{ m: 4 }} />;

  if (activeJobs.length === 0) return <Typography sx={{ m: 4 }}>No active jobs found.</Typography>;

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      {activeJobs.map(job => (
        <Grid item xs={12} key={job.jobID}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">{job.title}</Typography>
            <Typography>{job.departmentName} - {job.locationName}</Typography>
            <Typography sx={{ mt: 1 }}>{job.description}</Typography>
            <Typography sx={{ fontStyle: 'italic', mt: 1 }}>Posted By: {job.postedBy}, Date: {new Date(job.postedDate).toLocaleDateString()}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default ActiveJobsPage;
