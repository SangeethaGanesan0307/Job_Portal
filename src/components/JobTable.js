import { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Button, Typography, Box
} from '@mui/material';
import API from '../Api';
import { useNavigate } from 'react-router-dom';

const JobTable = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // API.get('/api/hr/view-jobs')
    API.get('/api/hr/jobs') 
      .then((res) => setJobs(res.data))
      .catch((err) => console.error("Failed to load jobs:", err));
  }, []);

  const handleView = (id) => {
    // navigate(`/view-job/${id}`);
    navigate(`/view-job/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/edit-job/${id}`);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Job Postings</Typography>
        <Button variant="contained" color="success" onClick={() => navigate('/post-job')}>
          + Create New Job
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>Job Title</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Posted</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No jobs found.
                </TableCell>
              </TableRow>
            ) : (
              jobs.map((job, index) => (
                <TableRow key={index}>
                  <TableCell>{job.title}</TableCell>
                  {/* <TableCell>{job.department?.departmentName}</TableCell>
                  <TableCell>{job.location?.locationName}</TableCell> */}
                      <TableCell>{job.departmentName}</TableCell>
                      <TableCell>{job.locationName}</TableCell>     
                  <TableCell>{job.status ? 'Active' : 'Closed'}</TableCell>
                  <TableCell>{new Date(job.postedDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button size="small" onClick={() => handleView(job.jobID)}>View</Button>
                    <Button size="small" onClick={() => handleEdit(job.jobID)}>Edit</Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default JobTable;
