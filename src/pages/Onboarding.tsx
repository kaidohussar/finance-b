import React, { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import './Pages.css';

const Onboarding: React.FC = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  return (
    <main className="page-content">
      <div className="page-header">
        <h1>
          <Trans
            i18nKey="onboarding.welcome"
            values={{ appName: 'FinanceB' }}
            components={{ strong: <strong /> }}
          />
        </h1>
      </div>

      <div className="content-section">
        <div className="section-header">
          <div className="setting-label">
            <Trans
              i18nKey="onboarding.step"
              values={{ current: currentStep, total: totalSteps }}
              components={{ strong: <strong /> }}
            />
          </div>
          <div className="setting-description">
            <Trans
              i18nKey="onboarding.progressMessage"
              values={{ percentage: Math.round((currentStep / totalSteps) * 100) }}
              components={{ strong: <strong /> }}
            />
          </div>
        </div>

        <div style={{ width: '100%', height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px', marginBottom: '2rem' }}>
          <div
            style={{
              width: `${(currentStep / totalSteps) * 100}%`,
              height: '100%',
              backgroundColor: '#3b82f6',
              borderRadius: '4px',
              transition: 'width 0.3s',
            }}
          />
        </div>

        <div className="settings-group">
          <div className={`setting-item ${currentStep >= 1 ? '' : ''}`} style={{ borderColor: currentStep === 1 ? '#3b82f6' : undefined }}>
            <div className="setting-info">
              <div className="setting-label">
                <Trans
                  i18nKey="onboarding.setupProfile"
                  values={{ userName: 'John' }}
                  components={{ strong: <strong /> }}
                />
              </div>
            </div>
            {currentStep === 1 && (
              <button className="btn btn-primary" onClick={() => setCurrentStep(2)}>
                {t('onboarding.complete')}
              </button>
            )}
            {currentStep > 1 && <span className="status-badge active">Done</span>}
          </div>

          <div className="setting-item" style={{ borderColor: currentStep === 2 ? '#3b82f6' : undefined }}>
            <div className="setting-info">
              <div className="setting-label">
                <Trans
                  i18nKey="onboarding.inviteTeam"
                  values={{ workspaceName: 'Acme Inc.' }}
                  components={{ em: <em /> }}
                />
              </div>
            </div>
            {currentStep === 2 && (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-primary" onClick={() => setCurrentStep(3)}>
                  {t('onboarding.complete')}
                </button>
                <button className="btn btn-secondary" onClick={() => setCurrentStep(3)}>
                  {t('onboarding.skip')}
                </button>
              </div>
            )}
            {currentStep > 2 && <span className="status-badge active">Done</span>}
          </div>

          <div className="setting-item" style={{ borderColor: currentStep === 3 ? '#3b82f6' : undefined }}>
            <div className="setting-info">
              <div className="setting-label">
                <Trans
                  i18nKey="onboarding.tutorial"
                  components={{ link: <a href="#tutorial" /> }}
                />
              </div>
            </div>
            {currentStep === 3 && (
              <button className="btn btn-primary" onClick={() => setCurrentStep(4)}>
                {t('onboarding.complete')}
              </button>
            )}
          </div>
        </div>
      </div>

      {currentStep > totalSteps && (
        <div className="content-section">
          <div className="info-box">
            <h3>
              <Trans
                i18nKey="onboarding.celebration"
                values={{ userName: 'John' }}
                components={{ strong: <strong /> }}
              />
            </h3>
          </div>
        </div>
      )}
    </main>
  );
};

export default Onboarding;
