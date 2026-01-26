import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaCheck,
  FaTimes,
  FaClock,
  FaUser,
  FaCalendarAlt,
  FaFilter,
} from 'react-icons/fa';
import DoctorLayout from '../../components/Doctor/DoctorLayout';
import toast from 'react-hot-toast';
import './DoctorPages.css';

const DoctorAppointments = () => {
  const [filter, setFilter] = useState('all');
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patient: 'John Smith',
      email: 'john@email.com',
      date: '2026-01-28',
      time: '9:00 AM',
      reason: 'Annual checkup',
      status: 'pending',
    },
    {
      id: 2,
      patient: 'Emma Wilson',
      email: 'emma@email.com',
      date: '2026-01-28',
      time: '10:30 AM',
      reason: 'Follow-up consultation',
      status: 'confirmed',
    },
    {
      id: 3,
      patient: 'Michael Brown',
      email: 'michael@email.com',
      date: '2026-01-29',
      time: '2:00 PM',
      reason: 'Flu symptoms',
      status: 'pending',
    },
    {
      id: 4,
      patient: 'Sarah Davis',
      email: 'sarah@email.com',
      date: '2026-01-27',
      time: '11:00 AM',
      reason: 'Skin consultation',
      status: 'completed',
    },
  ]);

  const handleAccept = (id) => {
    setAppointments(
      appointments.map((apt) =>
        apt.id === id ? { ...apt, status: 'confirmed' } : apt
      )
    );
    toast.success('Appointment confirmed!');
  };

  const handleDecline = (id) => {
    setAppointments(
      appointments.map((apt) =>
        apt.id === id ? { ...apt, status: 'cancelled' } : apt
      )
    );
    toast.error('Appointment declined.');
  };

  const handleDelay = (id) => {
    toast.success('Reschedule request sent to patient');
  };

  const filteredAppointments =
    filter === 'all'
      ? appointments
      : appointments.filter((apt) => apt.status === filter);

  return (
    <DoctorLayout>
      <div className="page-container">
        <div className="page-header">
          <div>
            <h1 className="page-title">Appointment Management</h1>
            <p className="page-subtitle">Review and manage patient appointments</p>
          </div>
        </div>

        <div className="filter-bar">
          <FaFilter className="filter-icon" />
          <div className="filter-buttons">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
              onClick={() => setFilter('pending')}
            >
              Pending
            </button>
            <button
              className={`filter-btn ${filter === 'confirmed' ? 'active' : ''}`}
              onClick={() => setFilter('confirmed')}
            >
              Confirmed
            </button>
            <button
              className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </div>
        </div>

        <div className="doctor-appointments-grid">
          {filteredAppointments.map((appointment, index) => (
            <motion.div
              key={appointment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="doctor-appointment-card-full"
            >
              <div className="appointment-patient-header">
                <div className="patient-avatar">
                  <FaUser />
                </div>
                <div className="patient-info-header">
                  <h3>{appointment.patient}</h3>
                  <p>{appointment.email}</p>
                </div>
                <span className={`status-pill ${appointment.status}`}>
                  {appointment.status}
                </span>
              </div>

              <div className="appointment-details-doctor">
                <div className="detail-row">
                  <FaCalendarAlt className="detail-icon" />
                  <span>{appointment.date}</span>
                </div>
                <div className="detail-row">
                  <FaClock className="detail-icon" />
                  <span>{appointment.time}</span>
                </div>
              </div>

              <div className="appointment-reason-doctor">
                <strong>Reason:</strong> {appointment.reason}
              </div>

              {appointment.status === 'pending' && (
                <div className="appointment-actions-doctor">
                  <button
                    className="btn-action accept"
                    onClick={() => handleAccept(appointment.id)}
                  >
                    <FaCheck /> Accept
                  </button>
                  <button
                    className="btn-action delay"
                    onClick={() => handleDelay(appointment.id)}
                  >
                    <FaClock /> Delay
                  </button>
                  <button
                    className="btn-action decline"
                    onClick={() => handleDecline(appointment.id)}
                  >
                    <FaTimes /> Decline
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </DoctorLayout>
  );
};

export default DoctorAppointments;
