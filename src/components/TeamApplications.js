// src/components/TeamApplications.js
import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';

const TeamApplications = ({ applications, onViewHistory }) => {
  return (
    <Box my={3}>
      <Typography variant="h6" gutterBottom>
        Team Application History
      </Typography>
      {applications.length === 0 ? (
        <Typography color="text.secondary">No applications found.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table size="small" aria-label="team applications table">
            <TableHead>
              <TableRow>
                <TableCell>Applicant</TableCell>
                <TableCell>Job Title</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Application Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app.applicationID}>
                  <TableCell>{app.applicantName}</TableCell>
                  <TableCell>{app.jobTitle}</TableCell>
                  <TableCell>
                    {app.status ? (
                      <Typography color="success.main" fontWeight="bold">
                        Approved
                      </Typography>
                    ) : (
                      <Typography color="warning.main" fontWeight="bold">
                        Pending
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(app.applicationDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => onViewHistory(app.applicationID)}
                    >
                      View History
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default TeamApplications;
