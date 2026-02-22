import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import MainContent from './components/MainContent';
import Analytics from './pages/Analytics';
import Customers from './pages/Customers';
import Billing from './pages/Billing';
import Settings from './pages/Settings';
import Integrations from './pages/Integrations';
import Reports from './pages/Reports';
import Login from './pages/Login';
import { useAuth } from './hooks/useAuth';
import './App.css';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          {isAuthenticated ? (
            <Route path="/" element={<Layout />}>
              <Route index element={<MainContent />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="customers" element={<Customers />} />
              <Route path="billing" element={<Billing />} />
              <Route path="settings" element={<Settings />} />
              <Route path="integrations" element={<Integrations />} />
              <Route path="reports" element={<Reports />} />
            </Route>
          ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
