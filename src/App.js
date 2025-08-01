import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import StatsCards from './components/StatsCards';
import JobTable from './components/JobTable';
import CreateJobForm from './components/CreateJobForm';
import ViewJob from './components/ViewJob';
import EditForm from './components/EditForm';
import LoginPage from './components/LoginPage';
import { Container } from '@mui/material';
import JobPostings from './components/JobPostings';
import Application from './components/Application'; // ✅ import the page
import ActiveJobsPage from './components/ActiveJobsPage';
import PendingReviews from './components/PendingReview';
import ManagerStats from './components/ManagerStats';
import PendingApprovals from './components/PendingApprovals';
import TeamApplications from './components/TeamApplications';
import ApprovalHistory from './components/ApprovalHistory'; // import the ApprovalHistory component
//import ManagerDashboard from './components/ManagerDashboard'; // import the ManagerDashboard component
import ManagerHeader from './components/ManagerHeader';



// 🔐 Auth Wrapper
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("jwt");
  return token ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route
          path="/hr-dashboard"
          element={
            <ProtectedRoute>
              <Header />
              <Container maxWidth="xl">
                <StatsCards />
                <JobTable />
              </Container>
            </ProtectedRoute>
          }
        />
        <Route
          path="/post-job"
          element={
            <ProtectedRoute>
              <Header />
              <Container maxWidth="md">
                <CreateJobForm />
              </Container>
            </ProtectedRoute>
          }
        />

        <Route
          path="/view-job/:id"
          element={
            <ProtectedRoute>
              <Header />
              <Container maxWidth="md">
                <ViewJob />
              </Container>
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-job/:id"
          element={
            <ProtectedRoute>
              <Header />
              <Container maxWidth="md">
                <EditForm />
              </Container>
            </ProtectedRoute>
          }
        />

        {/* <Route path="/job-postings" element={<JobPostings />} /> */}

        <Route
  path="/job-postings"
  element={
    <ProtectedRoute>
      <Header />
      <Container maxWidth="xl">
        <JobPostings />
      </Container>
    </ProtectedRoute>
  }
/>

        {/* ✅ Add Applications Route */}
        <Route
          path="/applications"
          element={
            <ProtectedRoute>
              <Header />
              <Container maxWidth="md">
                <Application/>
              </Container>
            </ProtectedRoute>
          }
        />

         <Route 
         path="/active-jobs" 
         element={
           <ProtectedRoute>
              <Header />
              <Container maxWidth="md">
         <ActiveJobsPage />
         </Container>
            </ProtectedRoute>
         } 
         />

         <Route 
         path="/pending-reviews" 
         element={
          <ProtectedRoute>
              <Header />
              <Container maxWidth="md">
         <PendingReviews />
         </Container>
            </ProtectedRoute>
         } 
         />

<Route
  path="/manager-dashboard"
  element={
    <ProtectedRoute>
      <ManagerHeader />
      <Container maxWidth="xl">
        <ManagerStats />
        <PendingApprovals />
        <TeamApplications />
        <ApprovalHistory />
        {/* <ManagerDashboard/>
     */}
      </Container>
    </ProtectedRoute>
  }
/>
{/* <Route path="/manager-dashboard" element={<ManagerDashboard />} /> */}

{/* <Route
  path="/manager-dashboard"
  element={
    <ProtectedRoute roles={['manager']}>
    
      <ManagerDashboard />
       <ManagerStats />
        <PendingApprovals />
        <TeamApplications />
        <ApprovalHistory />
    </ProtectedRoute>
  }
/> */}

      </Routes>
    </Router>
  );
}

export default App;


// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Header from './components/Header';
// import StatsCards from './components/StatsCards';
// import JobTable from './components/JobTable';
// import CreateJobForm from './components/CreateJobForm';
// import ViewJob from './components/ViewJob';
// import EditForm from './components/EditForm';
// import LoginPage from './components/LoginPage';
// import { Container } from '@mui/material';
// import JobPostings from './components/JobPostings';
// import Application from './components/Application';
// import ActiveJobsPage from './components/ActiveJobsPage';
// import PendingReviews from './components/PendingReview';
// import ManagerStats from './components/ManagerStats';
// import PendingApprovals from './components/PendingApprovals';
// import TeamApplications from './components/TeamApplications';
// import ApprovalHistory from './components/ApprovalHistory';

// // 🔐 Enhanced Auth Wrapper with Role Support
// const ProtectedRoute = ({ children, allowedRoles = [] }) => {
//   const token = localStorage.getItem("jwt");
//   const userRole = localStorage.getItem("userRole");
  
//   if (!token) {
//     return <Navigate to="/" />;
//   }
  
//   // If specific roles are required, check permission
//   if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
//     // Redirect to appropriate dashboard based on actual role
//     if (userRole === 'Manager') {
//       return <Navigate to="/manager-dashboard" />;
//     } else if (userRole === 'HR') {
//       return <Navigate to="/hr-dashboard" />;
//     }
//     return <Navigate to="/" />;
//   }
  
//   return children;
// };

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LoginPage />} />

//         {/* HR Routes - Only accessible by HR */}
//         <Route
//           path="/hr-dashboard"
//           element={
//             <ProtectedRoute allowedRoles={['HR']}>
//               <Header />
//               <Container maxWidth="xl">
//                 <StatsCards />
//                 <JobTable />
//               </Container>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/post-job"
//           element={
//             <ProtectedRoute allowedRoles={['HR']}>
//               <Header />
//               <Container maxWidth="md">
//                 <CreateJobForm />
//               </Container>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/view-job/:id"
//           element={
//             <ProtectedRoute>
//               <Header />
//               <Container maxWidth="md">
//                 <ViewJob />
//               </Container>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/edit-job/:id"
//           element={
//             <ProtectedRoute allowedRoles={['HR']}>
//               <Header />
//               <Container maxWidth="md">
//                 <EditForm />
//               </Container>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/job-postings"
//           element={
//             <ProtectedRoute>
//               <Header />
//               <Container maxWidth="xl">
//                 <JobPostings />
//               </Container>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/applications"
//           element={
//             <ProtectedRoute>
//               <Header />
//               <Container maxWidth="md">
//                 <Application/>
//               </Container>
//             </ProtectedRoute>
//           }
//         />

//         <Route 
//           path="/active-jobs" 
//           element={
//             <ProtectedRoute>
//               <Header />
//               <Container maxWidth="md">
//                 <ActiveJobsPage />
//               </Container>
//             </ProtectedRoute>
//           } 
//         />

//         <Route 
//           path="/pending-reviews" 
//           element={
//             <ProtectedRoute allowedRoles={['HR']}>
//               <Header />
//               <Container maxWidth="md">
//                 <PendingReviews />
//               </Container>
//             </ProtectedRoute>
//           } 
//         />

//         {/* Manager Routes - Only accessible by Manager */}
//         <Route
//           path="/manager-dashboard"
//           element={
//             <ProtectedRoute allowedRoles={['Manager']}>
//               <Header />
//               <Container maxWidth="xl">
//                 <ManagerStats />
//                 <PendingApprovals />
//                 <TeamApplications />
//                 <ApprovalHistory />
//               </Container>
//             </ProtectedRoute>
//           }
//         />

//         {/* Manager specific routes */}
//         <Route
//           path="/team-applications"
//           element={
//             <ProtectedRoute allowedRoles={['Manager']}>
//               <Header />
//               <Container maxWidth="xl">
//                 <TeamApplications />
//               </Container>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/pending-approvals"
//           element={
//             <ProtectedRoute allowedRoles={['Manager']}>
//               <Header />
//               <Container maxWidth="xl">
//                 <PendingApprovals />
//               </Container>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/approval-history"
//           element={
//             <ProtectedRoute allowedRoles={['Manager']}>
//               <Header />
//               <Container maxWidth="xl">
//                 <ApprovalHistory />
//               </Container>
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;