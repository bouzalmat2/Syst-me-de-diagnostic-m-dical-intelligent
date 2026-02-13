import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaHome,
  FaRobot,
  FaCalendarCheck,
  FaUsers,
  FaComments,
  FaSignOutAlt,
  FaUserMd,
  FaUserCircle,
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import './DoctorLayout.css';

const DoctorLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/doctor/dashboard', icon: FaHome, label: 'Dashboard' },
    { path: '/doctor/appointments', icon: FaCalendarCheck, label: 'Appointments' },
    { path: '/doctor/patients', icon: FaUsers, label: 'Patients' },
    { path: '/doctor/messages', icon: FaComments, label: 'Messages' },
    { path: '/doctor/chatbot', icon: FaRobot, label: 'AI Assistant' },
    { path: '/doctor/profile', icon: FaUserCircle, label: 'Profile' },
  ];

  return (
    <div className="doctor-layout">
      <header className="doctor-header">
        <div className="header-left">
          <div className="logo">
            <div className="logo-icon-doctor">
              <FaUserMd />
            </div>
            <span className="logo-text">MedicCare Pro</span>
          </div>
        </div>
        <div className="header-right">
          <div className="user-info-doctor">
            <FaUserMd className="user-icon" />
            <div className="user-details">
              <span className="user-name">Dr. {user?.name || 'Doctor'}</span>
              <span className="user-role">Medical Professional</span>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt />
          </button>
        </div>
      </header>

      <div className="doctor-content-wrapper">
        <nav className="doctor-sidebar">
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
                      {item.path === '/doctor/appointments' && (
                        <span className="notification-badge">5</span>
                      )}
                    </motion.div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <main className="doctor-main">{children}</main>
      </div>
    </div>
  );
};

export default DoctorLayout;
