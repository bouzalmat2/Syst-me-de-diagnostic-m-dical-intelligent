import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaUsers,
  FaCalendarCheck,
  FaClipboardList,
  FaChartLine,
  FaArrowRight,
} from 'react-icons/fa';
import DoctorLayout from '../../components/Doctor/DoctorLayout';
import './DoctorPages.css';

const DoctorDashboard = () => {
  const stats = [
    { label: 'Today\'s Appointments', value: '8', icon: FaCalendarCheck, color: '#0066FF' },
    { label: 'Total Patients', value: '156', icon: FaUsers, color: '#10B981' },
    { label: 'Pending Requests', value: '5', icon: FaClipboardList, color: '#F59E0B' },
    { label: 'This Month', value: '94', icon: FaChartLine, color: '#FF3B3B' },
  ];

  const todayAppointments = [
    { id: 1, patient: 'John Smith', time: '9:00 AM', type: 'Checkup', status: 'confirmed' },
    { id: 2, patient: 'Emma Wilson', time: '10:30 AM', type: 'Follow-up', status: 'confirmed' },
    { id: 3, patient: 'Michael Brown', time: '2:00 PM', type: 'Consultation', status: 'pending' },
  ];

  return (
    <DoctorLayout>
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="page-header"
        >
          <h1 className="page-title">Doctor Dashboard</h1>
          <p className="page-subtitle">Manage your practice efficiently</p>
        </motion.div>

        <div className="stats-grid">
          {stats.map((stat, index) => (
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

        <div className="dashboard-grid-doctor">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="dashboard-section"
          >
            <div className="section-header">
              <h2 className="section-title">Today's Schedule</h2>
              <Link to="/doctor/appointments" className="section-link">
                View All <FaArrowRight />
              </Link>
            </div>
            <div className="appointments-list">
              {todayAppointments.map((apt) => (
                <div key={apt.id} className="doctor-appointment-card">
                  <div className="appointment-time-badge">{apt.time}</div>
                  <div className="appointment-patient-info">
                    <h4>{apt.patient}</h4>
                    <span className="appointment-type">{apt.type}</span>
                  </div>
                  <span className={`status-badge ${apt.status}`}>{apt.status}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="dashboard-section"
          >
            <h2 className="section-title">Quick Actions</h2>
            <div className="quick-actions-doctor">
              <Link to="/doctor/patients" className="action-card-doctor">
                <FaUsers />
                <span>Patient Records</span>
              </Link>
              <Link to="/doctor/chatbot" className="action-card-doctor">
                <FaChartLine />
                <span>AI Assistant</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </DoctorLayout>
  );
};

export default DoctorDashboard;
