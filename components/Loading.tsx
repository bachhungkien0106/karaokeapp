import React from 'react';
import { Disc } from 'lucide-react';

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-6">
      <div className="relative">
        <div className="absolute inset-0 bg-pink-500 blur-xl opacity-20 rounded-full animate-pulse"></div>
        <Disc className="w-24 h-24 text-pink-500 animate-spin duration-[3000ms]" />
      </div>
      <h3 className="text-2xl font-bold text-white">Auditioning Songs...</h3>
      <p className="text-gray-400 max-w-xs">Our AI DJ is flipping through the songbook to match your vocal range and vibe.</p>
    </div>
  );
};

export default Loading;
