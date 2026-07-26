import React from 'react';

export default function ItineraryCard({ day, destination, blocks }) {
  return (
    <div className="mb-10">
      <h2 className="font-display italic font-bold text-xl text-slate-900 mb-4">
        Day {day}- {destination}
      </h2>

      <div className="flex gap-4">
        {/* Destination photo circle */}
        <div className="w-24 h-24 rounded-full bg-slate-300/70 flex-shrink-0 flex items-center justify-center text-center px-2">
          <span className="text-slate-600 text-sm">Destination pic</span>
        </div>

        {/* Timeline */}
        <div className="flex-1 border-l-2 border-slate-800 pl-4 flex flex-col gap-5">
          {blocks.map((block) => (
            <div key={block.time} className="relative">
              <span className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-800" />
              <p className="font-body font-semibold text-slate-800 text-[15px] mb-1">
                {block.time}
              </p>
              <p className="font-body text-slate-600 text-sm leading-relaxed">
                {block.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}