import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../Api';

const ViewJob = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    // API.get(`/api/Hr/view-job/${id}`)
    API.get(`/api/Hr/jobs/${id}`)
      .then((res) => {
        setJob(res.data);
      })
      .catch((err) => {
        console.error("Error fetching job:", err);
      });
  }, [id]);

  if (!job) return <p>Loading job details...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Job Details</h2>
      <p><strong>Title:</strong> {job.title}</p>
      <p><strong>Department:</strong> {job.departmentName || "N/A"}</p>
      <p><strong>Location:</strong> {job.locationName || "N/A"}</p>
      <p><strong>Description:</strong> {job.description}</p>
      <p><strong>Requirements:</strong> {job.requirements}</p>
      <p><strong>Status:</strong> {job.status ? "Active" : "Closed"}</p>
      <p><strong>Posted By:</strong> {job.postedBy}</p>
      <p><strong>Posted Date:</strong> {new Date(job.postedDate).toLocaleDateString()}</p>
    </div>
  );
};

export default ViewJob;
