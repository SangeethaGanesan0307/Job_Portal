import { useEffect, useState } from 'react';
import { Typography, CircularProgress, List, ListItem, ListItemText } from '@mui/material';
import API from '../Api';

const PendingReviews = () => {
  const [pendingReviews, setPendingReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    API.get('/api/hr/pending-reviews')
      .then(res => {
        setPendingReviews(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) return <CircularProgress sx={{ m: 4 }} />;

  if (error) return <Typography color="error" sx={{ m: 4 }}>Failed to load pending reviews.</Typography>;

  if (pendingReviews.length === 0) return <Typography sx={{ m: 4 }}>No pending reviews found.</Typography>;

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 2 }}>Pending Application Reviews</Typography>
      <List>
        {pendingReviews.map((app) => (
          <ListItem key={app.applicationID} divider>
            <ListItemText
              primary={`${app.applicantName} (${app.email})`}
              secondary={`Job ID: ${app.jobID}, Applied: ${new Date(app.applicationDate).toLocaleDateString()}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default PendingReviews;
