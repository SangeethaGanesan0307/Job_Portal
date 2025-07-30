// src/components/TeamList.js
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
} from '@mui/material';

const TeamList = ({ team }) => (
  <Box my={3}>
    <Typography variant="h6" gutterBottom>
      Team Members
    </Typography>
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
          {team.map((member) => (
            <TableRow key={member.userID}>
              <TableCell>{member.name}</TableCell>
              <TableCell>{member.email}</TableCell>
              <TableCell>{member.departmentName}</TableCell>
              <TableCell>
                {new Date(member.joinDate).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
);

export default TeamList;
