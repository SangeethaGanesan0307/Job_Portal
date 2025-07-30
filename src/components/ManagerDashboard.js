import React, { useEffect, useState } from 'react';
import {
  getDashboardStats,
  getTeamDashboard,
  getPendingApprovals,
  approveApplication,
  getTeamApplications,
  getApprovalHistory,
} from '../services/managerApi';

import {
  Box,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';

import ManagerStats from '../components/ManagerStats';
import TeamList from '../components/TeamList';
import PendingApprovals from '../components/PendingApprovals';
import TeamApplications from '../components/TeamApplications';
import ApprovalHistoryModal from '../components/ApprovalHistoryModal';

const ManagerDashboard = () => {
  const [stats, setStats] = useState({});
  const [team, setTeam] = useState([]);
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [teamApplications, setTeamApplications] = useState([]);
  const [approvalHistory, setApprovalHistory] = useState(null);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionMessage, setActionMessage] = useState(null);

  useEffect(() => {
    fetchAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [statsRes, teamRes, pendingRes, appsRes] = await Promise.all([
        getDashboardStats(),
        getTeamDashboard(),
        getPendingApprovals(),
        getTeamApplications(),
      ]);
      setStats(statsRes.data || {});
      setTeam(teamRes.data?.teamMembers || []);
      setPendingApprovals(pendingRes.data || []);
      setTeamApplications(appsRes.data || []);
    } catch (err) {
      console.error('Failed to load manager dashboard data:', err);
      setError('Failed to load dashboard data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (approvalId, approved, comment) => {
    setError(null);
    try {
      await approveApplication(approvalId, { Approved: approved, Comment: comment });
      setActionMessage(`Application has been ${approved ? 'approved' : 'declined'}.`);
      await fetchAllData();
    } catch (err) {
      console.error('Failed to approve/decline application:', err);
      setError('Failed to update approval. Please try again.');
    }
  };

  const handleViewHistory = async (applicationId) => {
    setError(null);
    try {
      const historyRes = await getApprovalHistory(applicationId);
      setApprovalHistory(historyRes.data);
      setShowHistoryModal(true);
    } catch (err) {
      console.error('Failed to fetch approval history:', err);
      setError('Failed to load approval history.');
      setApprovalHistory(null);
      setShowHistoryModal(true);
    }
  };

  const closeHistoryModal = () => {
    setShowHistoryModal(false);
    setApprovalHistory(null);
  };

  const closeSnackbar = () => {
    setError(null);
    setActionMessage(null);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Manager Dashboard
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <ManagerStats stats={stats} />
          <TeamList team={team} />
          <PendingApprovals approvals={pendingApprovals} onApprove={handleApprove} />
          <TeamApplications applications={teamApplications} onViewHistory={handleViewHistory} />
          <ApprovalHistoryModal
            history={approvalHistory}
            open={showHistoryModal}
            onClose={closeHistoryModal}
          />
        </>
      )}

      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={closeSnackbar} sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      {/* Success Snackbar */}
      <Snackbar
        open={!!actionMessage}
        autoHideDuration={4000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={closeSnackbar} sx={{ width: '100%' }}>
          {actionMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ManagerDashboard;
