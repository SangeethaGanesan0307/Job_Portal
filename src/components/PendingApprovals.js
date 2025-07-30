// src/components/PendingApprovals.js
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
} from '@mui/material';

const PendingApprovals = ({ approvals, onApprove }) => {
  const [comments, setComments] = useState({});

  return (
    <Box my={3}>
      <Typography variant="h6" gutterBottom>
        Pending Approvals
      </Typography>
      {approvals.length === 0 && (
        <Typography color="text.secondary">No pending approvals.</Typography>
      )}

      {approvals.map((item) => (
        <Paper key={item.approvalID} sx={{ p: 2, my: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={10}>
              <Typography>
                <strong>{item.applicantName}</strong> applied for{' '}
                <strong>{item.jobTitle}</strong>
              </Typography>
              <Typography>
                Date: {new Date(item.applicationDate).toLocaleDateString()}
              </Typography>
              <TextField
                label="Comments"
                multiline
                minRows={2}
                fullWidth
                value={comments[item.approvalID] || ''}
                onChange={(e) =>
                  setComments((prev) => ({
                    ...prev,
                    [item.approvalID]: e.target.value,
                  }))
                }
                sx={{ mt: 1 }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={2}
              container
              direction="column"
              spacing={1}
            >
              <Grid item>
                <Button
                  color="success"
                  variant="contained"
                  fullWidth
                  sx={{ mb: 1 }}
                  onClick={() =>
                    onApprove(
                      item.approvalID,
                      true,
                      comments[item.approvalID] || ''
                    )
                  }
                >
                  Approve
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color="error"
                  variant="outlined"
                  fullWidth
                  onClick={() =>
                    onApprove(
                      item.approvalID,
                      false,
                      comments[item.approvalID] || ''
                    )
                  }
                >
                  Decline
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Box>
  );
};

export default PendingApprovals;
