import React from 'react';

export default function ProgressBar({ percent = 50 }) {
  return (
    <div className="w-full h-2 bg-white/70 rounded-full overflow-hidden">
      <div
        className="h-full bg-green-500 rounded-full transition-all duration-300"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}