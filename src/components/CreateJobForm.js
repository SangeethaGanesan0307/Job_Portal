import { useEffect, useState } from 'react';
import {
  Box, Button, TextField, MenuItem, Typography, FormControlLabel, Switch, Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import API from '../Api';

const CreateJobForm = () => {
  const [departments, setDepartments] = useState([]);
  const [locations, setLocations] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    departmentID: '',
    locationID: '',
    description: '',
    requirements: '',
    status: true,
    postedBy: '',
    postedDate: new Date().toISOString().slice(0, 10),
  });

  const navigate = useNavigate();

  useEffect(() => {
    API.get('/api/departments')
      .then(res => setDepartments(res.data))
      .catch(err => console.error("Error loading departments:", err));

    API.get('/api/locations')
      .then(res => setLocations(res.data))
      .catch(err => console.error("Error loading locations:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

const handleSubmit = () => {
  // Convert departmentID and locationID to integers
  const dataToSend = {
    ...formData,
    departmentID: parseInt(formData.departmentID),
    locationID: parseInt(formData.locationID)
  };

  API.post('/api/hr/post-job', dataToSend)
    .then(() => {
      alert("Job created successfully");
      navigate('/hr-dashboard'); // ✅ Redirect to dashboard after success
    })
    .catch((err) => {
      console.error("Error creating job:", err);
      alert("Failed to create job. Please check all required fields and try again.");
    });
};


  return (
    <Paper sx={{ p: 4, maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Create New Job
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Job Title" name="title" value={formData.title} onChange={handleChange} fullWidth required />
        <TextField
          select
          label="Department"
          name="departmentID"
          value={formData.departmentID}
          onChange={handleChange}
          fullWidth
          required
        >
          {departments.map((d) => (
            <MenuItem key={d.departmentID} value={d.departmentID}>{d.departmentName}</MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Location"
          name="locationID"
          value={formData.locationID}
          onChange={handleChange}
          fullWidth
          required
        >
          {locations.map((l) => (
            <MenuItem key={l.locationID} value={l.locationID}>{l.locationName}</MenuItem>
          ))}
        </TextField>

        <TextField
          label="Description"
          name="description"
          multiline
          rows={3}
          value={formData.description}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Requirements"
          name="requirements"
          multiline
          rows={3}
          value={formData.requirements}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Posted By"
          name="postedBy"
          value={formData.postedBy}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          type="date"
          label="Posted Date"
          name="postedDate"
          value={formData.postedDate}
          onChange={handleChange}
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
        />
        <FormControlLabel
          control={
            <Switch
              checked={formData.status}
              onChange={handleChange}
              name="status"
            />
          }
          label={formData.status ? "Active" : "Closed"}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="outlined" onClick={() => navigate('/hr-dashboard')}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default CreateJobForm;


