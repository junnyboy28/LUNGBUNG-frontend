
import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-medical-blue/30 border-t-medical-blue animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-medical-blue animate-pulse-opacity" />
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-lg font-medium">Processing X-ray</h3>
        <p className="text-sm text-medical-gray">This may take a moment...</p>
      </div>
    </div>
  );
};

export default LoadingState;
