import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, BarChart2, CreditCard, User, Settings, LogOut, Wallet, ShieldCheck } from 'lucide-react';
import axios from 'axios';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const username = sessionStorage.getItem('user') || 'Alex';

  const menuItems = [
    { icon: <Home size={20} />, label: 'Dashboard', desc: 'Main control center', active: true },
    { icon: <BarChart2 size={20} />, label: 'Analytics', desc: 'Insights and trends' },
    { icon: <CreditCard size={20} />, label: 'Cards', desc: 'Manage your cards' },
    { icon: <Wallet size={20} />, label: 'Assets', desc: 'View your portfolio' },
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
      <div className="sidebar-logo">
        <motion.div
          className="logo-icon glow-orange"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <span>Kodbank</span>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <motion.div
            key={index}
            className={`nav-item ${item.active ? 'active' : ''}`}
            whileHover={{ x: 5, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={`nav-icon ${item.active ? 'active' : ''}`}>{item.icon}</div>
            <div className="nav-text">
              <span className="nav-label">{item.label}</span>
              <span className="nav-desc">{item.desc}</span>
            </div>
            {item.active && <motion.div layoutId="active-pill" className="active-pill" />}
          </motion.div>
        ))}
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
