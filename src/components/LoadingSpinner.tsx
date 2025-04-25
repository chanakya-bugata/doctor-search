import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading" data-testid="loading">
      <Loader2 className="spinner" size={32} />
      <span>Loading doctors...</span>
    </div>
  );
};

export default LoadingSpinner; 