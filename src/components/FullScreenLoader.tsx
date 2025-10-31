import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import './FullScreenLoader.css';

interface FullScreenLoaderProps {
  message?: string;
}

const FullScreenLoader: React.FC<FullScreenLoaderProps> = ({ 
  message = 'Loading...' 
}) => {
  return (
    <div className="fullscreen-loader">
      <div className="loader-content">
        <LoadingSpinner size="large" />
        <p className="loader-message">{message}</p>
      </div>
    </div>
  );
};

export default FullScreenLoader;