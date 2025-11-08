import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import MainContent from './components/MainContent';
import Analytics from './pages/Analytics';
import Customers from './pages/Customers';
import Billing from './pages/Billing';
import Settings from './pages/Settings';
import Integrations from './pages/Integrations';
import Reports from './pages/Reports';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainContent />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="customers" element={<Customers />} />
            <Route path="billing" element={<Billing />} />
            <Route path="settings" element={<Settings />} />
            <Route path="integrations" element={<Integrations />} />
            <Route path="reports" element={<Reports />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
