// // src/components/TeamList.js
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
// } from '@mui/material';

// const TeamList = ({ team }) => (
//   <Box my={3}>
//     <Typography variant="h6" gutterBottom>
//       Team Members
//     </Typography>
//     <TableContainer component={Paper}>
//       <Table size="small" aria-label="team members table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Name</TableCell>
//             <TableCell>Email</TableCell>
//             <TableCell>Department</TableCell>
//             <TableCell>Join Date</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {team.map((member) => (
//             <TableRow key={member.userID}>
//               <TableCell>{member.name}</TableCell>
//               <TableCell>{member.email}</TableCell>
//               <TableCell>{member.departmentName}</TableCell>
//               <TableCell>
//                 {new Date(member.joinDate).toLocaleDateString()}
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   </Box>
// );

// export default TeamList;

import { useState, useEffect } from 'react';
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
  CircularProgress,
} from '@mui/material';
import API from '../Api';

const TeamList = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await API.get('/Manager/team-dashboard');
        setTeam(res.data.teamMembers || []);
      } catch {
        setError('Failed to load team');
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

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
      <Typography variant="h6" gutterBottom>Team Members</Typography>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="team members table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Join Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {team.map(member => (
              <TableRow key={member.userID}>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.departmentName}</TableCell>
                <TableCell>{new Date(member.joinDate).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TeamList;

