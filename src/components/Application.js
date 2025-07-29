import { useEffect, useState } from 'react';
import { Typography, Paper, Grid, CircularProgress } from '@mui/material';
import API from '../Api';

const ApplicationsPage = () => {
  const [applications, setApplications] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    API.get('/api/hr/applications')
      .then(res => {
        setApplications(res.data);
        setError(false);
      })
      .catch(err => {
        setError(true);
      });
  }, []);

  if (error) {
    return <Typography color="error" sx={{ m: 4 }}>Failed to load applications.</Typography>;
  }

  if (!applications) {
    return <CircularProgress sx={{ m: 4 }} />;
  }

  return (
    <Paper elevation={2} sx={{ mt: 4, p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>All Applications</Typography>
      {applications.length === 0 ? (
        <Typography>No applications found.</Typography>
      ) : (
        <Grid container spacing={2}>
          {applications.map((app, index) => (
            <Grid item xs={12} key={index}>
              <Paper sx={{ p: 2 }}>
                <Typography><strong>Name:</strong> {app.applicantName}</Typography>
                <Typography><strong>Email:</strong> {app.email}</Typography>
                {/* <Typography><strong>Applied On:</strong> {new Date(app.appliedDate).toLocaleDateString()}</Typography> */}
                <Typography>
                  <strong>Applied On: </strong>
                  {new Date(app.applicationDate).toLocaleDateString()}
                </Typography>
                <Typography><strong>Status:</strong> {app.status ? 'Reviewed' : 'Pending'}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Paper>
  );
};

export default ApplicationsPage;
