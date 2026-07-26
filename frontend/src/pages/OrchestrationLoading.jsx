import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useTripAgentStatus } from '../hooks/useTripAgentStatus';

const AGENT_MESSAGES = [
  'Coordinator Agent initialized. Processing user destination: Tokyo.',
  'Planner Agent generating base day-by-day structural layout.',
  'Live Conditions Agent scanning regional weather radar and local transit statuses.',
  'Food Discovery Agent cross-referencing local database with tags: [Halal, Vegetarian].',
  'Route Optimization Agent calculating geographic proximity clusters to minimize transit time.',
];

export default function OrchestrationLoading({ onBack, onViewItinerary }) {
  const { visibleMessages, isComplete } = useTripAgentStatus(AGENT_MESSAGES);

  return (
    <div className="h-screen flex flex-col">
      {/* Top half: photo section, logo centered within it */}
      <div
        className="relative h-1/2 bg-cover bg-center flex flex-col items-center justify-center px-5"
        style={{ backgroundImage: 'url(/background3.jpg)' }}
      >
        <button
          onClick={onBack}
          aria-label="Go back"
          className="absolute top-6 left-5 text-white"
        >
          <ArrowLeft size={22} />
        </button>

        <div className="w-32 h-32 rounded-full bg-slate-200/90 flex items-center justify-center text-center px-2">
          <span className="text-slate-500 text-sm">Placeholder logo</span>
        </div>

        <h1 className="text-white font-bold text-sm tracking-wide mt-6 text-center uppercase">
          Orchestration in Progress
        </h1>
      </div>

      {/* Bottom half: status feed + CTA */}
      <div className="h-1/2 bg-white rounded-t-3xl px-6 pt-3 pb-8 flex flex-col">
        <div className="w-16 h-1.5 bg-slate-300 rounded-full mx-auto mb-6 flex-shrink-0" />

        <div className="flex-1 flex flex-col gap-5 overflow-y-auto">
          {visibleMessages.map((message, i) => (
            <p key={i} className="text-slate-800 text-[15px] leading-relaxed">
              {message}
            </p>
          ))}
        </div>

        {isComplete && (
          <button
            onClick={onViewItinerary}
            className="mt-6 w-full bg-blue-600 text-white font-medium rounded-full py-3.5
              hover:bg-blue-700 transition-colors flex-shrink-0"
          >
            View My Itinerary
          </button>
        )}
      </div>
    </div>
  );
}