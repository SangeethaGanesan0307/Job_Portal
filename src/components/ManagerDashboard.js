import  { useEffect, useState } from 'react';
import {
  getDashboardStats, getTeamDashboard, getPendingApprovals,
  approveApplication, getTeamApplications, getApprovalHistory
} from '../services/managerApi';

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

  useEffect(() => { fetchAllData(); }, []);

  const fetchAllData = async () => {
    const [statsRes, teamRes, pendingRes, appsRes] = await Promise.all([
      getDashboardStats(), getTeamDashboard(),
      getPendingApprovals(), getTeamApplications()
    ]);
    setStats(statsRes.data);
    setTeam(teamRes.data.teamMembers ?? []);
    setPendingApprovals(pendingRes.data);
    setTeamApplications(appsRes.data);
  };

  const handleApprove = async (approvalId, approved, comment) => {
    await approveApplication(approvalId, { Approved: approved, Comment: comment });
    fetchAllData();
  };

  const handleViewHistory = async (applicationId) => {
    const historyRes = await getApprovalHistory(applicationId);
    setApprovalHistory(historyRes.data);
    setShowHistoryModal(true);
  };

  return (
    <div>
      <h1>Manager Dashboard</h1>
      <ManagerStats stats={stats} />
      <TeamList team={team} />
      <PendingApprovals approvals={pendingApprovals} onApprove={handleApprove} />
      <TeamApplications applications={teamApplications} onViewHistory={handleViewHistory} />
      {showHistoryModal &&
        <ApprovalHistoryModal history={approvalHistory} onClose={() => setShowHistoryModal(false)} />
      }
    </div>
  );
};
export default ManagerDashboard;
