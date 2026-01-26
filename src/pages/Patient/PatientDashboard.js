import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaCalendarAlt,
  FaRobot,
  FaHistory,
  FaHeartbeat,
  FaArrowRight,
} from 'react-icons/fa';
import PatientLayout from '../../components/Patient/PatientLayout';
import './PatientPages.css';

const PatientDashboard = () => {
  const upcomingAppointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      date: '2026-01-28',
      time: '10:00 AM',
      status: 'confirmed',
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      specialty: 'General Practice',
      date: '2026-02-05',
      time: '2:30 PM',
      status: 'pending',
    },
  ];

  const quickStats = [
    { label: 'Appointments', value: '12', icon: FaCalendarAlt, color: '#0066FF' },
    { label: 'Health Score', value: '85%', icon: FaHeartbeat, color: '#10B981' },
    { label: 'Records', value: '24', icon: FaHistory, color: '#F59E0B' },
  ];

  return (
    <PatientLayout>
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="page-header"
        >
          <h1 className="page-title">Welcome to Your Health Dashboard</h1>
          <p className="page-subtitle">Manage your health journey all in one place</p>
        </motion.div>

        <div className="stats-grid">
          {quickStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="stat-card"
            >
              <div className="stat-icon" style={{ background: `${stat.color}20` }}>
                <stat.icon style={{ color: stat.color }} />
              </div>
              <div className="stat-info">
                <h3 className="stat-value">{stat.value}</h3>
                <p className="stat-label">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="dashboard-grid">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="dashboard-section"
          >
            <div className="section-header">
              <h2 className="section-title">Upcoming Appointments</h2>
              <Link to="/patient/appointments" className="section-link">
                View All <FaArrowRight />
              </Link>
            </div>
            <div className="appointments-list">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="appointment-card">
                  <div className="appointment-info">
                    <h3 className="appointment-doctor">{appointment.doctor}</h3>
                    <p className="appointment-specialty">{appointment.specialty}</p>
                    <div className="appointment-datetime">
                      <FaCalendarAlt />
                      <span>
                        {appointment.date} at {appointment.time}
                      </span>
                    </div>
                  </div>
                  <span className={`appointment-status ${appointment.status}`}>
                    {appointment.status}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="dashboard-section"
          >
            <h2 className="section-title">Quick Actions</h2>
            <div className="quick-actions-grid">
              <Link to="/patient/chatbot" className="action-card">
                <div className="action-icon">
                  <FaRobot />
                </div>
                <h3 className="action-title">AI Health Assistant</h3>
                <p className="action-description">
                  Get instant health advice from our AI
                </p>
              </Link>
              <Link to="/patient/appointments" className="action-card">
                <div className="action-icon">
                  <FaCalendarAlt />
                </div>
                <h3 className="action-title">Book Appointment</h3>
                <p className="action-description">Schedule with a doctor</p>
              </Link>
              <Link to="/patient/history" className="action-card">
                <div className="action-icon">
                  <FaHistory />
                </div>
                <h3 className="action-title">Medical History</h3>
                <p className="action-description">View your health records</p>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </PatientLayout>
  );
};

export default PatientDashboard;
