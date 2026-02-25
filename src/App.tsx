import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import MainContent from './components/MainContent';
import Analytics from './pages/Analytics';
import Customers from './pages/Customers';
import Billing from './pages/Billing';
import Settings from './pages/Settings';
import Integrations from './pages/Integrations';
import Reports from './pages/Reports';
import Account from './pages/Account';
import Calendar from './pages/Calendar';
import Files from './pages/Files';
import Inbox from './pages/Inbox';
import Notifications from './pages/Notifications';
import Onboarding from './pages/Onboarding';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';
import Team from './pages/Team';
import Login from './pages/Login';
import Landing from './pages/Landing';
import ForgotPassword from './pages/ForgotPassword';
import { useAuth } from './hooks/useAuth';
import './App.css';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/landing" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {isAuthenticated ? (
            <Route path="/" element={<Layout />}>
              <Route index element={<MainContent />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="customers" element={<Customers />} />
              <Route path="billing" element={<Billing />} />
              <Route path="settings" element={<Settings />} />
              <Route path="integrations" element={<Integrations />} />
              <Route path="reports" element={<Reports />} />
              <Route path="account" element={<Account />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="files" element={<Files />} />
              <Route path="inbox" element={<Inbox />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="onboarding" element={<Onboarding />} />
              <Route path="projects" element={<Projects />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="team" element={<Team />} />
            </Route>
          ) : (
            <Route path="*" element={<Navigate to="/landing" replace />} />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
