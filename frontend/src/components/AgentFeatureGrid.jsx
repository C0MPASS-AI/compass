import React from 'react';

export default function AgentFeatureGrid({ features = [] }) {
  return (
    <section className="px-5 pt-6 pb-10">
      <div className="bg-compass-sand rounded-2xl min-h-[180px] flex items-center justify-center px-6">
        {features.length > 0 ? (
          <div className="w-full grid grid-cols-2 gap-4 py-6">
            {features.map((feature) => (
              <div key={feature.title} className="text-left">
                <p className="font-display text-base text-compass-ink">{feature.title}</p>
                <p className="font-body text-sm text-compass-ink/60 mt-1">{feature.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="font-display italic text-xl text-compass-ink/60">
            [Agent feature grid]
          </p>
        )}
      </div>
    </section>
  );
}