import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Pages.css';
import { useApi } from '../hooks/useApi';
import { getSettings, updateSettings } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';

const Settings: React.FC = () => {
  const { t } = useTranslation();
  const { data, loading, error } = useApi(getSettings);

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState(true);
  const [activityLog, setActivityLog] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!data) return;
    const { toggles } = data;
    setEmailNotifications(toggles.emailNotifications);
    setPushNotifications(toggles.pushNotifications);
    setDarkMode(toggles.darkMode);
    setTwoFactor(toggles.twoFactor);
    setSessionTimeout(toggles.sessionTimeout);
    setActivityLog(toggles.activityLog);
    setAutoBackup(toggles.autoBackup);
    setHighContrast(toggles.highContrast);
    setLargeText(toggles.largeText);
    setReduceMotion(toggles.reduceMotion);
  }, [data]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateSettings({
        toggles: {
          emailNotifications,
          pushNotifications,
          darkMode,
          twoFactor,
          sessionTimeout,
          activityLog,
          autoBackup,
          highContrast,
          largeText,
          reduceMotion,
        },
      });
      setToast(t('common.saved', 'Saved'));
      window.setTimeout(() => setToast(null), 2800);
    } finally {
      setSaving(false);
    }
  };

  if (loading || error || !data) {
    return (
      <main className="page-content">
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
          {loading ? <LoadingSpinner /> : <span>{t('common.error', 'Failed to load')}</span>}
        </div>
      </main>
    );
  }

  return (
    <main className="page-content">
      <div className="page-header">
        <h1>{t('pages.settings.title')}</h1>
        <p className="page-subtitle">{t('pages.settings.subtitle')}</p>
      </div>

      <div className="content-section">
        <h2>{t('pages.settings.profile.title')}</h2>
        <div className="form-group">
          <label>{t('pages.settings.profile.fullName')}</label>
          <input type="text" className="form-input" defaultValue={data.profile.fullName} />
        </div>
        <div className="form-group">
          <label>{t('pages.settings.profile.email')}</label>
          <input type="email" className="form-input" defaultValue={data.profile.email} />
        </div>
        <div className="form-group">
          <label>{t('pages.settings.profile.company')}</label>
          <input type="text" className="form-input" defaultValue={data.profile.company} />
        </div>
        <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
          {saving ? t('common.saving', 'Saving...') : t('pages.settings.profile.saveChanges')}
        </button>
      </div>

      <div className="content-section">
        <h2>{t('pages.settings.notifications.title')}</h2>
        <div className="settings-group">
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-label">{t('pages.settings.notifications.email.label')}</div>
              <div className="setting-description">{t('pages.settings.notifications.email.description')}</div>
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
              <div className="setting-label">{t('pages.settings.notifications.push.label')}</div>
              <div className="setting-description">{t('pages.settings.notifications.push.description')}</div>
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
        <h2>{t('pages.settings.appearance.title')}</h2>
        <div className="settings-group">
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-label">{t('pages.settings.appearance.darkMode.label')}</div>
              <div className="setting-description">{t('pages.settings.appearance.darkMode.description')}</div>
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

      <div className="content-section">
        <h2>{t('pages.settings.language.title')}</h2>
        <div className="settings-group">
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-label">{t('pages.settings.language.title')}</div>
              <div className="setting-description">{t('pages.settings.language.locale')}</div>
            </div>
          </div>
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-label">{t('pages.settings.language.title')}</div>
              <div className="setting-description">{t('pages.settings.language.timezone')}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2>{t('pages.settings.privacy.title')}</h2>
        <div className="settings-group">
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-label">{t('pages.settings.privacy.twoFactor.label')}</div>
              <div className="setting-description">{t('pages.settings.privacy.twoFactor.description')}</div>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={twoFactor}
                onChange={(e) => setTwoFactor(e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-label">{t('pages.settings.privacy.sessionTimeout.label')}</div>
              <div className="setting-description">{t('pages.settings.privacy.sessionTimeout.description')}</div>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={sessionTimeout}
                onChange={(e) => setSessionTimeout(e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-label">{t('pages.settings.privacy.activityLog.label')}</div>
              <div className="setting-description">{t('pages.settings.privacy.activityLog.description')}</div>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={activityLog}
                onChange={(e) => setActivityLog(e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2>{t('pages.settings.dataStorage.title')}</h2>
        <div className="settings-group">
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-label">{t('pages.settings.dataStorage.autoBackup.label')}</div>
              <div className="setting-description">{t('pages.settings.dataStorage.autoBackup.description')}</div>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={autoBackup}
                onChange={(e) => setAutoBackup(e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-label">{t('pages.settings.dataStorage.dataExport.label')}</div>
              <div className="setting-description">{t('pages.settings.dataStorage.dataExport.description')}</div>
            </div>
            <button className="btn btn-secondary">{t('pages.settings.dataStorage.dataExport.button')}</button>
          </div>
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-label">{t('pages.settings.dataStorage.clearCache.label')}</div>
              <div className="setting-description">{t('pages.settings.dataStorage.clearCache.description')}</div>
            </div>
            <button className="btn btn-secondary">{t('pages.settings.dataStorage.clearCache.button')}</button>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2>{t('pages.settings.accessibility.title')}</h2>
        <div className="settings-group">
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-label">{t('pages.settings.accessibility.highContrast.label')}</div>
              <div className="setting-description">{t('pages.settings.accessibility.highContrast.description')}</div>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={highContrast}
                onChange={(e) => setHighContrast(e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-label">{t('pages.settings.accessibility.fontSize.label')}</div>
              <div className="setting-description">{t('pages.settings.accessibility.fontSize.description')}</div>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={largeText}
                onChange={(e) => setLargeText(e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-label">{t('pages.settings.accessibility.reduceMotion.label')}</div>
              <div className="setting-description">{t('pages.settings.accessibility.reduceMotion.description')}</div>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={reduceMotion}
                onChange={(e) => setReduceMotion(e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>

      <div className="content-section danger-zone">
        <h2>{t('pages.settings.dangerZone.title')}</h2>
        <div className="danger-actions">
          <div className="danger-item">
            <div>
              <div className="danger-label">{t('pages.settings.dangerZone.resetAccount.label')}</div>
              <div className="danger-description">{t('pages.settings.dangerZone.resetAccount.description')}</div>
            </div>
            <button className="btn btn-danger">{t('pages.settings.dangerZone.resetAccount.button')}</button>
          </div>
          <div className="danger-item">
            <div>
              <div className="danger-label">{t('pages.settings.dangerZone.deleteAccount.label')}</div>
              <div className="danger-description">{t('pages.settings.dangerZone.deleteAccount.description')}</div>
            </div>
            <button className="btn btn-danger">{t('pages.settings.dangerZone.deleteAccount.button')}</button>
          </div>
        </div>
      </div>

      {toast && <div className="success-toast">{toast}</div>}
    </main>
  );
};

export default Settings;