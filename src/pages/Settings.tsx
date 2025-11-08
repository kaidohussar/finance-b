import React, { useState } from 'react';
import './Pages.css';

const Settings: React.FC = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <main className="page-content">
      <div className="page-header">
        <h1>Settings</h1>
        <p className="page-subtitle">Manage your account preferences and settings</p>
      </div>

      <div className="content-section">
        <h2>Profile Information</h2>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" className="form-input" defaultValue="John Doe" />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-input" defaultValue="john@example.com" />
        </div>
        <div className="form-group">
          <label>Company</label>
          <input type="text" className="form-input" defaultValue="Acme Inc." />
        </div>
        <button className="btn btn-primary">Save Changes</button>
      </div>

      <div className="content-section">
        <h2>Notifications</h2>
        <div className="settings-group">
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-label">Email Notifications</div>
              <div className="setting-description">Receive email updates about your account</div>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-label">Push Notifications</div>
              <div className="setting-description">Get push notifications on your device</div>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={pushNotifications}
                onChange={(e) => setPushNotifications(e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2>Appearance</h2>
        <div className="settings-group">
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-label">Dark Mode</div>
              <div className="setting-description">Enable dark theme for the interface</div>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>

      <div className="content-section danger-zone">
        <h2>Danger Zone</h2>
        <div className="danger-actions">
          <div className="danger-item">
            <div>
              <div className="danger-label">Reset Account</div>
              <div className="danger-description">Clear all data and reset to defaults</div>
            </div>
            <button className="btn btn-danger">Reset</button>
          </div>
          <div className="danger-item">
            <div>
              <div className="danger-label">Delete Account</div>
              <div className="danger-description">Permanently delete your account and all data</div>
            </div>
            <button className="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Settings;