import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import './Login.css';

const Signup: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated, signup } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError(t('signup.errorPasswordMismatch'));
      return;
    }

    setLoading(true);
    const result = await signup(username, password);

    if (!result.success) {
      setError(t(result.error || 'signup.errorGeneric'));
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>{t('signup.title')}</h1>
        <p>{t('signup.subtitle')}</p>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">{t('signup.usernameLabel')}</label>
            <input
              id="username"
              type="text"
              className="form-input"
              placeholder={t('signup.usernamePlaceholder')}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">{t('signup.passwordLabel')}</label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder={t('signup.passwordPlaceholder')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password">{t('signup.confirmPasswordLabel')}</label>
            <input
              id="confirm-password"
              type="password"
              className="form-input"
              placeholder={t('signup.confirmPasswordPlaceholder')}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ width: '100%' }}
          >
            {loading ? t('signup.signingUp') : t('signup.signUp')}
          </button>
        </form>

        <div className="login-hint">
          {t('signup.haveAccount')} <Link to="/login">{t('signup.signIn')}</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
