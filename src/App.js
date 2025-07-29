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
      </Routes>
    </Router>
  );
}

export default App;
