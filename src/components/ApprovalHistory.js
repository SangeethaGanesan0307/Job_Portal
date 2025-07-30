// src/components/ApprovalHistoryModal.js
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Box,
} from '@mui/material';

const ApprovalHistory = ({ history, open, onClose }) => (
  <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
    <DialogTitle>Approval History</DialogTitle>
    <DialogContent dividers>
      {!history || history.length === 0 ? (
        <Typography>No approval history available.</Typography>
      ) : (
        <Table aria-label="approval history table">
          <TableHead>
            <TableRow>
              <TableCell>Approver</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Comments</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((item, index) => (
              <TableRow key={`${item.approvalLevel}-${index}`}>
                <TableCell>{item.approverName}</TableCell>
                <TableCell>{item.approvalLevel}</TableCell>
                <TableCell>
                  <Box
                    component="span"
                    sx={{
                      color: item.status ? 'green' : 'red',
                      fontWeight: 'bold',
                    }}
                  >
                    {item.status ? 'Approved' : 'Rejected'}
                  </Box>
                </TableCell>
                <TableCell>{item.comments || '-'}</TableCell>
                <TableCell>
                  {new Date(item.date).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Close
      </Button>
    </DialogActions>
  </Dialog>
);

export default ApprovalHistory;
