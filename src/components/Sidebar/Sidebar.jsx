import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, BarChart2, CreditCard, User, Settings, LogOut, Wallet } from 'lucide-react';
import axios from 'axios';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = sessionStorage.getItem('user') || 'Alex';

  const menuItems = [
    { icon: <Home size={20} />, label: 'Dashboard', desc: 'Main control center', path: '/' },
    { icon: <BarChart2 size={20} />, label: 'Analytics', desc: 'Insights and trends', path: '/analytics' },
    { icon: <CreditCard size={20} />, label: 'Cards', desc: 'Manage your cards', path: '/cards' },
    { icon: <Wallet size={20} />, label: 'Assets', desc: 'View your portfolio', path: '/assets' },
  ];

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout', {}, { withCredentials: true });
    } catch (err) {
      console.error('Logout failed:', err);
    }
    sessionStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <div className="sidebar glass-card">
      <div className="sidebar-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <motion.div
          className="logo-icon glow-orange"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <span>Kodbank</span>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <motion.div
              key={index}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
              whileHover={{ x: 5, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`nav-icon ${isActive ? 'active' : ''}`}>{item.icon}</div>
              <div className="nav-text">
                <span className="nav-label">{item.label}</span>
                <span className="nav-desc">{item.desc}</span>
              </div>
              {isActive && <motion.div layoutId="active-pill" className="active-pill" />}
            </motion.div>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar">
            {username[0].toUpperCase()}
            <div className="online-indicator" />
          </div>
          <div className="user-info">
            <span className="user-name">{username}</span>
            <span className="user-status">Premium Member</span>
          </div>
        </div>

        <motion.div className="nav-item" whileHover={{ x: 5 }}>
          <span className="nav-icon"><Settings size={20} /></span>
          <span className="nav-label">Settings</span>
        </motion.div>

        <motion.div className="nav-item logout" onClick={handleLogout} whileHover={{ x: 5 }}>
          <span className="nav-icon"><LogOut size={20} /></span>
          <span className="nav-label">Logout</span>
        </motion.div>
      </div>
    </div>
  );
};

export default Sidebar;
