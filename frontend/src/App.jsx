import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import TravelPreferencesForm from './pages/TravelPreferencesForm';
import SignUpModal from './components/SignUpModal';

function App() {
  const [screen, setScreen] = useState('landing'); // 'landing' | 'preferences'
  const [authOpen, setAuthOpen] = useState(false);

  const handleAuthSubmit = (mode, formData) => {
    // TODO: real auth call goes here later (authService.js)
    console.log('auth submitted:', mode, formData);
    setAuthOpen(false);
    setScreen('preferences');
  };

  return (
    <>
      {screen === 'landing' && (
        <LandingPage onGetStarted={() => setAuthOpen(true)} />
      )}

      {screen === 'preferences' && (
        <TravelPreferencesForm
          onBack={() => setScreen('landing')}
          onNext={(selected) => console.log('selected:', selected)}
        />
      )}

      <SignUpModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onSubmit={handleAuthSubmit}
      />
    </>
  );
}

export default App;