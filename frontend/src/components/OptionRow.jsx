import React from 'react';

export default function OptionRow({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-3 bg-white/80 backdrop-blur-sm
        rounded-xl px-4 py-3 text-left transition-all
        ${selected ? 'border-2 border-dashed border-blue-500' : 'border-2 border-transparent'}`}
    >
      <span className="w-2.5 h-2.5 bg-slate-500 flex-shrink-0" />
      <span className="text-slate-800 text-[15px]">{label}</span>
    </button>
  );
}