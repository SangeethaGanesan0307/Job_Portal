import { useEffect, useState } from 'react';
import { Grid, Paper, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import API from '../Api';

const StatsCards = () => {
  const [stats, setStats] = useState(null);
  const [activeJob, setActiveJob] = useState(null);
  const [pendingReviewCount, setPendingReviewCount] = useState(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch overall job/application stats
    API.get('/api/hr/job-stats')
      .then((res) => {
        setStats(res.data);
        setError(false);
      })
      .catch(() => {
        setError(true);
      });

    // Fetch one active job for display inside Active Jobs card
    API.get('/api/hr/active-jobs')
      .then((res) => {
        setActiveJob(res.data);
      })
      .catch(() => {
        setActiveJob(null);
      });

    // Fetch count of pending reviews based on the new pending-reviews API
    API.get('/api/hr/pending-reviews')
      .then((res) => {
        setPendingReviewCount(Array.isArray(res.data) ? res.data.length : 0);
      })
      .catch(() => {
        setPendingReviewCount(0);
      });
  }, []);

  const handleTotalApplicationsClick = () => {
    navigate('/applications');
  };

  const handleActiveJobsClick = () => {
    navigate('/active-jobs');
  };

  const handlePendingReviewClick = () => {
    navigate('/pending-reviews');
  };

  if (error) {
    return <Typography color="error" sx={{ m: 4 }}>Failed to load data.</Typography>;
  }

  if (!stats || pendingReviewCount === null) {
    return <CircularProgress sx={{ m: 4 }} />;
  }

  const cards = [
    {
      label: 'Active Jobs',
      value: stats.activeJobs,
      color: 'primary.main',
      onClick: handleActiveJobsClick,
    },
    {
      label: 'Total Applications',
      value: stats.totalApplications,
      color: 'success.main',
      onClick: handleTotalApplicationsClick,
    },
    {
      label: 'Pending Review',
      value: pendingReviewCount,
      color: 'warning.main',
      onClick: handlePendingReviewClick,
    },
    {
      label: 'Positions Filled',
      value: stats.positionsFilled,
      color: 'error.main',
    },
  ];

  return (
    <Grid container spacing={2} sx={{ my: 3 }}>
      {cards.map((c, i) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          key={i}
          onClick={c.onClick}
          style={{ cursor: c.onClick ? 'pointer' : 'default' }}
        >
          <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ color: c.color }}>
              {c.value}
            </Typography>
            <Typography>{c.label}</Typography>
            {/* Show active job title inside the Active Jobs card */}
            {c.label === 'Active Jobs' && activeJob && (
              <Typography sx={{ mt: 1, fontSize: '0.85rem', color: 'text.secondary' }}>
                {activeJob.title}
              </Typography>
            )}
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsCards;
