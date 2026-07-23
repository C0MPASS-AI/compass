import React from 'react';

export default function InteractivePreviewPlaceholder() {
  return (
    <section className="px-5 -mt-10 relative z-10">
      <div className="bg-compass-cream rounded-2xl shadow-sm min-h-[72px] flex items-center justify-center">
        <p className="font-display italic text-compass-ink/50 text-[15px]">
          [Interactive Preview]
        </p>
      </div>
    </section>
  );
}