import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../Api';

const EditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State for departments and locations lists
  const [departments, setDepartments] = useState([]);
  const [locations, setLocations] = useState([]);

  // Job form state, store DepartmentID and LocationID
  const [job, setJob] = useState({
    title: '',
    departmentID: '',
    locationID: '',
    description: '',
    requirements: '',
    status: false,
    postedBy: '',
    postedDate: ''
  });

  // Loading and error states (optional)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch departments and locations once
  useEffect(() => {
    API.get('/api/hr/department')
      .then(res => setDepartments(res.data))
      .catch(err => console.error('Error loading departments:', err));

    API.get('/api/hr/location')
      .then(res => setLocations(res.data))
      .catch(err => console.error('Error loading locations:', err));
  }, []);

  // Fetch job to edit on mount and when id changes
  useEffect(() => {
    setLoading(true);
    API.get(`/api/hr/jobs/${id}`)
      .then((res) => {
        const data = res.data;

        // If your API returns names but not IDs, you must map them here:
        // Example mapping from name to ID - only if needed:
        // const matchedDept = departments.find(d => d.departmentName === data.departmentName);
        // const matchedLoc = locations.find(l => l.locationName === data.locationName);

        setJob({
          title: data.title || '',
          departmentID: data.departmentID ?? '', // expect ID here, fallback ''
          locationID: data.locationID ?? '',
          description: data.description || '',
          requirements: data.requirements || '',
          status: data.status ?? false,
          postedBy: data.postedBy || '',
          // Make sure postedDate is ISO date string for <input type="date">
          postedDate: data.postedDate ? data.postedDate.slice(0, 10) : ''
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching job:", err);
        setError('Failed to load job data.');
        setLoading(false);
      });
  }, [id]);

  // Handle input/select changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setJob(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Submit update form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: make sure departmentID and locationID are present and numbers
    if (!job.departmentID || !job.locationID) {
      alert("Please select valid Department and Location.");
      return;
    }

    // Prepare the payload with proper types
    const payload = {
      ...job,
      departmentID: Number(job.departmentID),
      locationID: Number(job.locationID),
      status: Boolean(job.status), // ensure boolean
      postedDate: job.postedDate // string in 'YYYY-MM-DD' format, should be fine
    };

    API.put(`/api/hr/edit-job/${id}`, payload)
      .then(() => {
        alert("Job updated successfully");
        // navigate("/jobs");
        navigate("/hr-dashboard");
      })
      .catch((err) => {
        console.error("Error updating job:", err);
        alert("Failed to update job. Please try again.");
      });
  };

  const handleCancel = () => {
    navigate("/jobs");
  };

  if (loading) {
    return <div>Loading job data...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Edit Job</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label><br />
          <input
            id="title"
            name="title"
            value={job.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="departmentID">Department:</label><br />
          <select
            id="departmentID"
            name="departmentID"
            value={job.departmentID}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            {departments.map((d) => (
              <option key={d.departmentID} value={d.departmentID}>
                {d.departmentName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="locationID">Location:</label><br />
          <select
            id="locationID"
            name="locationID"
            value={job.locationID}
            onChange={handleChange}
            required
          >
            <option value="">Select Location</option>
            {locations.map((l) => (
              <option key={l.locationID} value={l.locationID}>
                {l.locationName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="description">Description:</label><br />
          <textarea
            id="description"
            name="description"
            value={job.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="requirements">Requirements:</label><br />
          <textarea
            id="requirements"
            name="requirements"
            value={job.requirements}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="status">Status (Active):</label>
          <input
            id="status"
            type="checkbox"
            name="status"
            checked={job.status}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="postedBy">Posted By:</label><br />
          <input
            id="postedBy"
            name="postedBy"
            value={job.postedBy}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="postedDate">Posted Date:</label><br />
          <input
            id="postedDate"
            type="date"
            name="postedDate"
            value={job.postedDate}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Update Job</button>
        <button type="button" onClick={handleCancel} style={{ marginLeft: '1rem' }}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditForm;
