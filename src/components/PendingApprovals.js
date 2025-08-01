// // src/components/PendingApprovals.js
// import React, { useState } from 'react';
// import {
//   Box,
//   Typography,
//   Paper,
//   Grid,
//   TextField,
//   Button,
// } from '@mui/material';

// const PendingApprovals = ({ approvals, onApprove }) => {
//   const [comments, setComments] = useState({});

//   return (
//     <Box my={3}>
//       <Typography variant="h6" gutterBottom>
//         Pending Approvals
//       </Typography>
//       {approvals.length === 0 && (
//         <Typography color="text.secondary">No pending approvals.</Typography>
//       )}

//       {approvals.map((item) => (
//         <Paper key={item.approvalID} sx={{ p: 2, my: 2 }}>
//           <Grid container spacing={2}>
//             <Grid item xs={12} md={10}>
//               <Typography>
//                 <strong>{item.applicantName}</strong> applied for{' '}
//                 <strong>{item.jobTitle}</strong>
//               </Typography>
//               <Typography>
//                 Date: {new Date(item.applicationDate).toLocaleDateString()}
//               </Typography>
//               <TextField
//                 label="Comments"
//                 multiline
//                 minRows={2}
//                 fullWidth
//                 value={comments[item.approvalID] || ''}
//                 onChange={(e) =>
//                   setComments((prev) => ({
//                     ...prev,
//                     [item.approvalID]: e.target.value,
//                   }))
//                 }
//                 sx={{ mt: 1 }}
//               />
//             </Grid>
//             <Grid
//               item
//               xs={12}
//               md={2}
//               container
//               direction="column"
//               spacing={1}
//             >
//               <Grid item>
//                 <Button
//                   color="success"
//                   variant="contained"
//                   fullWidth
//                   sx={{ mb: 1 }}
//                   onClick={() =>
//                     onApprove(
//                       item.approvalID,
//                       true,
//                       comments[item.approvalID] || ''
//                     )
//                   }
//                 >
//                   Approve
//                 </Button>
//               </Grid>
//               <Grid item>
//                 <Button
//                   color="error"
//                   variant="outlined"
//                   fullWidth
//                   onClick={() =>
//                     onApprove(
//                       item.approvalID,
//                       false,
//                       comments[item.approvalID] || ''
//                     )
//                   }
//                 >
//                   Decline
//                 </Button>
//               </Grid>
//             </Grid>
//           </Grid>
//         </Paper>
//       ))}
//     </Box>
//   );
// };

// export default PendingApprovals;

// import { useState, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   Paper,
//   Grid,
//   TextField,
//   Button,
//   CircularProgress,
// } from '@mui/material';
// import API from '../Api';

// const PendingApprovals = () => {
//   const [approvals, setApprovals] = useState([]);
//   const [comments, setComments] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [actionMessage, setActionMessage] = useState(null);

//   const fetchApprovals = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await API.get('/Manager/pending-approvals');
//       setApprovals(res.data);
//     } catch {
//       setError('Failed to load pending approvals');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchApprovals();
//   }, []);

//   const handleCommentChange = (id, val) => {
//     setComments(prev => ({ ...prev, [id]: val }));
//   };

//   const handleApprove = async (id, approved) => {
//     setError(null);
//     setActionMessage(null);
//     try {
//       await API.put(`/Manager/approve/${id}`, { Approved: approved, Comment: comments[id] || '' });
//       setActionMessage(`Application ${approved ? 'approved' : 'declined'}.`);
//       fetchApprovals();
//     } catch {
//       setError('Failed to update approval');
//     }
//   };

//   if (loading)
//     return (
//       <Box my={3} display="flex" justifyContent="center">
//         <CircularProgress />
//       </Box>
//     );
//   if (error)
//     return <Typography color="error">{error}</Typography>;

//   return (
//     <Box my={3}>
//       <Typography variant="h6" gutterBottom>Pending Approvals</Typography>
//       {approvals.length === 0 && <Typography color="text.secondary">No pending approvals.</Typography>}
//       {approvals.map(item => (
//         <Paper key={item.approvalID} sx={{ p: 2, my: 2 }}>
//           <Grid container spacing={2}>
//             <Grid item xs={12} md={10}>
//               <Typography><strong>{item.applicantName}</strong> applied for <strong>{item.jobTitle}</strong></Typography>
//               <Typography>Date: {new Date(item.applicationDate).toLocaleDateString()}</Typography>
//               <TextField
//                 label="Comments"
//                 multiline
//                 minRows={2}
//                 fullWidth
//                 value={comments[item.approvalID] || ''}
//                 onChange={e => handleCommentChange(item.approvalID, e.target.value)}
//                 sx={{ mt: 1 }}
//               />
//             </Grid>
//             <Grid item xs={12} md={2} container direction="column" spacing={1}>
//               <Grid item>
//                 <Button color="success" variant="contained" fullWidth sx={{ mb: 1 }} onClick={() => handleApprove(item.approvalID, true)}>Approve</Button>
//               </Grid>
//               <Grid item>
//                 <Button color="error" variant="outlined" fullWidth onClick={() => handleApprove(item.approvalID, false)}>Decline</Button>
//               </Grid>
//             </Grid>
//           </Grid>
//         </Paper>
//       ))}
//       {actionMessage && <Typography color="primary" sx={{ mt: 2 }}>{actionMessage}</Typography>}
//     </Box>
//   );
// };

// export default PendingApprovals;


import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';
import API from '../Api';

const PendingApprovals = () => {
  const [approvals, setApprovals] = useState([]);
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionMessage, setActionMessage] = useState(null);

  const fetchApprovals = async () => {
    setLoading(true);
    setError(null);
    try {
      // Updated API endpoint with /api prefix
      const res = await API.get('/api/Manager/pending-approvals');
      setApprovals(res.data);
    } catch {
      setError('Failed to load pending approvals');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovals();
  }, []);

  const handleCommentChange = (id, val) => {
    setComments(prev => ({ ...prev, [id]: val }));
  };

  const handleApprove = async (id, approved) => {
    setError(null);
    setActionMessage(null);
    try {
      // Updated API endpoint with /api prefix
      await API.put(`/api/Manager/approve/${id}`, { 
        Approved: approved, 
        Comment: comments[id] || '' 
      });
      setActionMessage(`Application ${approved ? 'approved' : 'declined'}.`);
      fetchApprovals();
    } catch {
      setError('Failed to update approval');
    }
  };

  if (loading)
    return (
      <Box my={3} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  if (error)
    return <Typography color="error">{error}</Typography>;

  return (
    <Box my={3}>
      <Typography variant="h6" gutterBottom>Pending Approvals</Typography>
      {approvals.length === 0 && <Typography color="text.secondary">No pending approvals.</Typography>}
      {approvals.map(item => (
        <Paper key={item.approvalID} sx={{ p: 2, my: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={10}>
              <Typography><strong>{item.applicantName}</strong> applied for <strong>{item.jobTitle}</strong></Typography>
              <Typography>Date: {new Date(item.applicationDate).toLocaleDateString()}</Typography>
              <TextField
                label="Comments"
                multiline
                minRows={2}
                fullWidth
                value={comments[item.approvalID] || ''}
                onChange={e => handleCommentChange(item.approvalID, e.target.value)}
                sx={{ mt: 1 }}
              />
            </Grid>
            <Grid item xs={12} md={2} container direction="column" spacing={1}>
              <Grid item>
                <Button color="success" variant="contained" fullWidth sx={{ mb: 1 }} onClick={() => handleApprove(item.approvalID, true)}>Approve</Button>
              </Grid>
              <Grid item>
                <Button color="error" variant="outlined" fullWidth onClick={() => handleApprove(item.approvalID, false)}>Decline</Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      ))}
      {actionMessage && <Typography color="primary" sx={{ mt: 2 }}>{actionMessage}</Typography>}
    </Box>
  );
};

export default PendingApprovals;