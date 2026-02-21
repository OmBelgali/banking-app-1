import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Chatbot from './components/Chatbot/Chatbot';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('user'));

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    setIsAuthenticated(!!user);
  }, []);

  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="app-container">
        {/* Background Decorative Orbs */}
        <div className="glow-orb glow-orange" style={{ top: '-100px', left: '-100px' }}></div>
        <div className="glow-orb glow-pink" style={{ bottom: '-100px', right: '-100px' }}></div>

        <Routes>
          <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <div style={{ display: 'flex', width: '100%' }}>
                  <Sidebar />
                  <main className="main-content">
                    <Dashboard />
                    <Footer />
                  </main>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
