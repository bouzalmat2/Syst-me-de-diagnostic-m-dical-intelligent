import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaHome,
  FaRobot,
  FaCalendarAlt,
  FaHistory,
  FaSignOutAlt,
  FaUserCircle,
  FaHeartbeat,
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import FloatingChat from '../FloatingChat';
import './PatientLayout.css';

const PatientLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/patient/dashboard', icon: FaHome, label: 'Dashboard' },
    { path: '/patient/chatbot', icon: FaRobot, label: 'AI Assistant' },
    { path: '/patient/disease-prediction', icon: FaHeartbeat, label: 'Disease Prediction' },
    { path: '/patient/appointments', icon: FaCalendarAlt, label: 'Appointments' },
    { path: '/patient/history', icon: FaHistory, label: 'History' },
  ];

  const handleSendMessage = (message) => {
    console.log('Sending message:', message);
    // Implement actual message sending logic
  };

  return (
    <div className="patient-layout">
      <header className="patient-header">
        <div className="header-left">
          <div className="logo">
            <div className="logo-icon">
              <span className="pulse-circle"></span>
              <span className="pulse-circle delay-1"></span>
              <span className="pulse-circle delay-2"></span>
            </div>
            <span className="logo-text">MedicCare</span>
          </div>
        </div>
        <div className="header-right">
          <div className="user-info">
            <FaUserCircle className="user-icon" />
            <span className="user-name">{user?.name || 'Patient'}</span>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt />
          </button>
        </div>
      </header>

      <div className="patient-content-wrapper">
        <nav className="patient-sidebar">
          <ul className="nav-list">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link to={item.path} className={`nav-item ${isActive ? 'active' : ''}`}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="nav-item-content"
                    >
                      <item.icon className="nav-icon" />
                      <span className="nav-label">{item.label}</span>
                    </motion.div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <main className="patient-main">{children}</main>
      </div>

      <FloatingChat userRole="patient" onSendMessage={handleSendMessage} />
    </div>
  );
};

export default PatientLayout;
