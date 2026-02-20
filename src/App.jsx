import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import './App.css';

function App() {
  return (
    <div className="app-container">
      {/* Background Decorative Orbs */}
      <div className="glow-orb glow-orange" style={{ top: '-100px', left: '-100px' }}></div>
      <div className="glow-orb glow-pink" style={{ bottom: '-100px', right: '-100px' }}></div>
      <div className="glow-orb glow-orange" style={{ top: '50%', left: '60%', width: '300px', height: '300px', opacity: 0.05 }}></div>

      <Sidebar />
      <main className="main-content">
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
