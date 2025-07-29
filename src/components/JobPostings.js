import { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Typography, Box
} from '@mui/material';
import API from '../Api';

const JobPostings = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    API.get('/api/hr/jobs')
      .then((res) => setJobs(res.data))
      .catch((err) => console.error("Failed to load jobs:", err));
  }, []);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Job Postings
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>Job Title</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Posted</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No job postings found.
                </TableCell>
              </TableRow>
            ) : (
              jobs.map((job, index) => (
                <TableRow key={index}>
                  <TableCell>{job.title}</TableCell>
                  <TableCell>{job.departmentName}</TableCell>
                  <TableCell>{job.locationName}</TableCell>
                  <TableCell>{job.status ? 'Active' : 'Closed'}</TableCell>
                  <TableCell>{new Date(job.postedDate).toLocaleDateString()}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default JobPostings;
