import React from 'react';
import { useTranslation } from 'react-i18next';
import LoadingSpinner from './LoadingSpinner';
import './FullScreenLoader.css';

interface FullScreenLoaderProps {
  message?: string;
}

const FullScreenLoader: React.FC<FullScreenLoaderProps> = ({ message }) => {
  const { t } = useTranslation();
  const displayMessage = message || t('common.loading');

  return (
    <div className="fullscreen-loader">
      <div className="loader-content">
        <LoadingSpinner size="large" />
        <p className="loader-message">{displayMessage}</p>
      </div>
    </div>
  );
};

export default FullScreenLoader;