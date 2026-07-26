import React from 'react';
import { ArrowLeft } from 'lucide-react';
import ItineraryCard from '../components/ItineraryCard';
import { ITINERARY } from '../data/itineraryData';

export default function ItineraryPage({ onBack }) {
  return (
    <div className="min-h-screen bg-compass-cream">
      {/* Header */}
      <div
        className="relative bg-cover bg-center px-5 pt-6 pb-8 flex flex-col items-center"
        style={{ backgroundImage: 'url(/background4.jpg)' }}
      >
        <button
          onClick={onBack}
          aria-label="Go back"
          className="absolute top-6 left-5 text-white"
        >
          <ArrowLeft size={22} />
        </button>

        <p className="font-script text-white text-3xl">Travel</p>
        <h1 className="font-display font-bold text-white text-3xl tracking-wide -mt-1">
          ITINERARY
        </h1>
      </div>

      {/* Days */}
      <div className="px-5 pt-8 pb-10">
        {ITINERARY.map((dayData) => (
          <ItineraryCard
            key={dayData.day}
            day={dayData.day}
            destination={dayData.destination}
            blocks={dayData.blocks}
          />
        ))}
      </div>
    </div>
  );
}