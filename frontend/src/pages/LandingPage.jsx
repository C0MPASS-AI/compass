import React from 'react';
import Navbar from '../components/Navbar';
import InteractivePreviewPlaceholder from '../components/InteractivePreviewPlaceholder';
import AgentFeatureGrid from '../components/AgentFeatureGrid';
import Footer from '../components/Footer';

export default function LandingPage({ onGetStarted = () => {}, heroImageUrl }) {
  return (
    <div className="min-h-screen bg-white font-body">
      <section className="relative">
        <div
          className="relative h-[560px] w-full bg-cover bg-center"
          style={{
            backgroundImage: heroImageUrl
              ? `url(${heroImageUrl})`
              : 'linear-gradient(160deg, #1F6F78 0%, #2C4B5E 45%, #1A2E3B 100%)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/30" />

          <Navbar variant="light" />

          <div className="relative z-10 h-full flex flex-col justify-center px-6 pt-10">
            <h1 className="font-display text-white text-[34px] leading-[1.2] max-w-[260px]">
              The travel orchestrator that plans, books, and continuously
              adjusts&hellip;
            </h1>

            <button
              onClick={onGetStarted}
              className="mt-6 self-start bg-compass-ink text-white font-body text-sm
                px-6 py-3 rounded-pill hover:bg-black transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      <InteractivePreviewPlaceholder />
      <AgentFeatureGrid />
      <Footer />
    </div>
  );
}