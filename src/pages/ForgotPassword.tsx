import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import LanguageSelector from '../components/LanguageSelector';
import './ForgotPassword.css';

const ForgotPassword: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-lang">
        <LanguageSelector />
      </div>
      <div className="forgot-password-card">
        {!submitted ? (
          <>
            <div className="forgot-password-icon">🔑</div>
            <h1>{t('forgotPassword.title')}</h1>
            <p>{t('forgotPassword.subtitle')}</p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">{t('forgotPassword.emailLabel')}</label>
                <input
                  id="email"
                  type="email"
                  className="form-input"
                  placeholder={t('forgotPassword.emailPlaceholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{ width: '100%' }}
              >
                {loading
                  ? t('forgotPassword.sending')
                  : t('forgotPassword.submit')}
              </button>
            </form>

            <div className="forgot-password-footer">
              <Link to="/login">{t('forgotPassword.backToLogin')}</Link>
            </div>
          </>
        ) : (
          <div className="success-state">
            <div className="success-icon">✉️</div>
            <h1>{t('forgotPassword.success.title')}</h1>
            <p>
              <Trans
                i18nKey="forgotPassword.success.message"
                values={{ email }}
                components={{ strong: <strong /> }}
              />
            </p>
            <p className="success-hint">{t('forgotPassword.success.hint')}</p>
            <Link to="/login" className="btn btn-primary" style={{ display: 'inline-block', marginTop: '16px' }}>
              {t('forgotPassword.success.backToLogin')}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
