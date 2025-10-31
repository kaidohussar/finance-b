import React from 'react';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  color = 'var(--primary-green)' 
}) => {
  return (
    <div className={`loading-spinner ${size}`}>
      <div 
        className="spinner" 
        style={{ borderTopColor: color }}
      ></div>
    </div>
  );
};

export default LoadingSpinner;