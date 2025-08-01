// src/components/TeamApplications.js
// import React from 'react';
// import {
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
// } from '@mui/material';

// const TeamApplications = ({ applications, onViewHistory }) => {
//   return (
//     <Box my={3}>
//       <Typography variant="h6" gutterBottom>
//         Team Application History
//       </Typography>
//       {applications.length === 0 ? (
//         <Typography color="text.secondary">No applications found.</Typography>
//       ) : (
//         <TableContainer component={Paper}>
//           <Table size="small" aria-label="team applications table">
//             <TableHead>
//               <TableRow>
//                 <TableCell>Applicant</TableCell>
//                 <TableCell>Job Title</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell>Application Date</TableCell>
//                 <TableCell>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {applications.map((app) => (
//                 <TableRow key={app.applicationID}>
//                   <TableCell>{app.applicantName}</TableCell>
//                   <TableCell>{app.jobTitle}</TableCell>
//                   <TableCell>
//                     {app.status ? (
//                       <Typography color="success.main" fontWeight="bold">
//                         Approved
//                       </Typography>
//                     ) : (
//                       <Typography color="warning.main" fontWeight="bold">
//                         Pending
//                       </Typography>
//                     )}
//                   </TableCell>
//                   <TableCell>
//                     {new Date(app.applicationDate).toLocaleDateString()}
//                   </TableCell>
//                   <TableCell>
//                     <Button
//                       variant="outlined"
//                       size="small"
//                       onClick={() => onViewHistory(app.applicationID)}
//                     >
//                       View History
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </Box>
//   );
// };

// export default TeamApplications;

// src/components/TeamApplications.js
// import  { useState, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   CircularProgress,
// } from '@mui/material';
// import API from '../Api';
// import ApprovalHistory from './ApprovalHistory';

// const TeamApplications = () => {
//   const [applications, setApplications] = useState([]);
//   const [approvalHistory, setApprovalHistory] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchApplications = async () => {
//       try {
//         const res = await API.get('/Manager/team-applications');
//         setApplications(res.data);
//       } catch {
//         setError('Failed to load team applications');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchApplications();
//   }, []);

//   const handleViewHistory = async (id) => {
//     try {
//       const res = await API.get(`/Manager/application-approvals/${id}`);
//       setApprovalHistory(res.data);
//       setModalOpen(true);
//     } catch {
//       setError('Failed to load approval history');
//     }
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//   };

//   if (loading)
//     return (
//       <Box my={3} display="flex" justifyContent="center">
//         <CircularProgress />
//       </Box>
//     );
//   if (error)
//     return (
//       <Box my={3}>
//         <Typography color="error">{error}</Typography>
//       </Box>
//     );

//   return (
//     <Box my={3}>
//       <Typography variant="h6" gutterBottom>Team Application History</Typography>
//       <TableContainer component={Paper}>
//         <Table size="small" aria-label="team applications table">
//           <TableHead>
//             <TableRow>
//               <TableCell>Applicant</TableCell>
//               <TableCell>Job Title</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Application Date</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {applications.map(app => (
//               <TableRow key={app.applicationID}>
//                 <TableCell>{app.applicantName}</TableCell>
//                 <TableCell>{app.jobTitle}</TableCell>
//                 <TableCell>{app.status ? 'Approved' : 'Pending'}</TableCell>
//                 <TableCell>{new Date(app.applicationDate).toLocaleDateString()}</TableCell>
//                 <TableCell>
//                   <Button size="small" onClick={() => handleViewHistory(app.applicationID)}>
//                     View History
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <ApprovalHistory history={approvalHistory} open={modalOpen} onClose={closeModal} />
//     </Box>
//   );
// };

// export default TeamApplications;

import  { useState, useEffect } from 'react';
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
  CircularProgress,
} from '@mui/material';
import API from '../Api';
import ApprovalHistory from './ApprovalHistory';

const TeamApplications = () => {
  const [applications, setApplications] = useState([]);
  const [approvalHistory, setApprovalHistory] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        // Updated API endpoint with /api prefix
        const res = await API.get('/api/Manager/team-applications');
        setApplications(res.data);
      } catch {
        setError('Failed to load team applications');
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const handleViewHistory = async (id) => {
    try {
      // Updated API endpoint with /api prefix
      const res = await API.get(`/api/Manager/application-approvals/${id}`);
      setApprovalHistory(res.data);
      setModalOpen(true);
    } catch {
      setError('Failed to load approval history');
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  if (loading)
    return (
      <Box my={3} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  if (error)
    return (
      <Box my={3}>
        <Typography color="error">{error}</Typography>
      </Box>
    );

  return (
    <Box my={3}>
      <Typography variant="h6" gutterBottom>Team Application History</Typography>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="team applications table">
          <TableHead>
            <TableRow>
              <TableCell>Employee</TableCell>
              <TableCell>Applied For</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Your Decision</TableCell>
              <TableCell>Final Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map(app => (
              <TableRow key={app.applicationID}>
                <TableCell>{app.applicantName}</TableCell>
                <TableCell>{app.jobTitle}</TableCell>
                <TableCell>{app.status ? 'Approved' : 'Pending'}</TableCell>
                <TableCell>{new Date(app.applicationDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button size="small" onClick={() => handleViewHistory(app.applicationID)}>
                    View History
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ApprovalHistory history={approvalHistory} open={modalOpen} onClose={closeModal} />
    </Box>
  );
};

export default TeamApplications;