import LandingPage from './pages/LandingPage';

function App() {
  return <LandingPage onGetStarted={() => alert('Get Started clicked!')} />;
}

export default App;