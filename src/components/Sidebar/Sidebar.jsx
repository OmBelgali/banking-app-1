import React from 'react';
import { Home, BarChart2, CreditCard, User, Settings, LogOut, Wallet } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const menuItems = [
    { icon: <Home size={20} />, label: 'Dashboard', active: true },
    { icon: <BarChart2 size={20} />, label: 'Analytics' },
    { icon: <CreditCard size={20} />, label: 'Cards' },
    { icon: <Wallet size={20} />, label: 'Assets' },
    { icon: <User size={20} />, label: 'Profile' },
  ];

  return (
    <div className="sidebar glass-card">
      <div className="sidebar-logo">
        <div className="logo-icon glow-orange"></div>
        <span>Aether Bank</span>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <div key={index} className={`nav-item ${item.active ? 'active' : ''}`}>
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="nav-item">
          <span className="nav-icon"><Settings size={20} /></span>
          <span className="nav-label">Settings</span>
        </div>
        <div className="nav-item logout">
          <span className="nav-icon"><LogOut size={20} /></span>
          <span className="nav-label">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
