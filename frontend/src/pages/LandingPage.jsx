import React from 'react';
import Navbar from '../components/Navbar';
import InteractivePreviewPlaceholder from '../components/InteractivePreviewPlaceholder';
import AgentFeatureGrid from '../components/AgentFeatureGrid';
import Footer from '../components/Footer';

export default function LandingPage({ onGetStarted = () => {}, heroImageUrl }) {
  const bgImage = heroImageUrl || '/background1.jpg';

  return (
    <div className="relative min-h-screen font-body text-white flex flex-col bg-slate-900">
      {/* Background Image fixed behind everything */}
      <img
        src={bgImage}
        alt="Background"
        className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none"
      />

      {/* Main Content Overlay */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar variant="light" />

        {/* Hero Section */}
        <section className="min-h-[85vh] flex flex-col items-center justify-center text-center px-6 py-12">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight max-w-3xl drop-shadow-md">
            the travel, <br />
            orchestrator, <br />
            that plans, <br />
            books and, <br />
            continuously, <br />
            adjusts
          </h1>

          <button
            onClick={onGetStarted}
            className="mt-8 bg-white text-black font-body text-base font-semibold
              px-8 py-3.5 rounded-full hover:bg-gray-200 transition-colors shadow-lg"
          >
            Get Started
          </button>
        </section>

        {/* Main Content Area with gap between sections */}
        <main className="flex-1 flex flex-col gap-24 py-16 px-6 max-w-6xl mx-auto w-full">
          <InteractivePreviewPlaceholder />
          <AgentFeatureGrid />
        </main>

        {/* Footer */}
        <footer className="w-full bg-black/40 backdrop-blur-md py-6 mt-12">
          <div className="max-w-6xl mx-auto px-6">
            <Footer />
          </div>
        </footer>
      </div>
    </div>
  );
}