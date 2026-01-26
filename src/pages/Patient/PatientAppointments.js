import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaCalendarPlus,
  FaUserMd,
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
} from 'react-icons/fa';
import PatientLayout from '../../components/Patient/PatientLayout';
import toast from 'react-hot-toast';
import './PatientPages.css';

const PatientAppointments = () => {
  const [showBooking, setShowBooking] = useState(false);
  const [formData, setFormData] = useState({
    doctor: '',
    date: '',
    time: '',
    reason: '',
  });

  const appointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      date: '2026-01-28',
      time: '10:00 AM',
      status: 'confirmed',
      reason: 'Regular checkup',
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      specialty: 'General Practice',
      date: '2026-02-05',
      time: '2:30 PM',
      status: 'pending',
      reason: 'Flu symptoms',
    },
    {
      id: 3,
      doctor: 'Dr. Emily Brown',
      specialty: 'Dermatology',
      date: '2026-01-20',
      time: '3:00 PM',
      status: 'completed',
      reason: 'Skin consultation',
    },
  ];

  const doctors = [
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiology' },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'General Practice' },
    { id: 3, name: 'Dr. Emily Brown', specialty: 'Dermatology' },
    { id: 4, name: 'Dr. James Wilson', specialty: 'Pediatrics' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Appointment request sent successfully!');
    setShowBooking(false);
    setFormData({ doctor: '', date: '', time: '', reason: '' });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <FaCheckCircle className="status-icon confirmed" />;
      case 'pending':
        return <FaHourglassHalf className="status-icon pending" />;
      case 'completed':
        return <FaCheckCircle className="status-icon completed" />;
      default:
        return <FaTimesCircle className="status-icon cancelled" />;
    }
  };

  return (
    <PatientLayout>
      <div className="page-container">
        <div className="page-header">
          <div>
            <h1 className="page-title">My Appointments</h1>
            <p className="page-subtitle">Manage your medical appointments</p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setShowBooking(!showBooking)}
          >
            <FaCalendarPlus />
            Book New Appointment
          </button>
        </div>

        {showBooking && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="booking-form-container"
          >
            <h2 className="form-title">Book New Appointment</h2>
            <form onSubmit={handleSubmit} className="booking-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="doctor">Select Doctor</label>
                  <select
                    id="doctor"
                    value={formData.doctor}
                    onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                    required
                  >
                    <option value="">Choose a doctor...</option>
                    {doctors.map((doc) => (
                      <option key={doc.id} value={doc.name}>
                        {doc.name} - {doc.specialty}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="date">Preferred Date</label>
                  <input
                    type="date"
                    id="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="time">Preferred Time</label>
                  <input
                    type="time"
                    id="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="reason">Reason for Visit</label>
                <textarea
                  id="reason"
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  placeholder="Describe your symptoms or reason for visit..."
                  rows="4"
                  required
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  Submit Request
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowBooking(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}

        <div className="appointments-grid">
          {appointments.map((appointment, index) => (
            <motion.div
              key={appointment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="appointment-card-full"
            >
              <div className="appointment-header">
                <div className="doctor-info">
                  <FaUserMd className="doctor-icon" />
                  <div>
                    <h3>{appointment.doctor}</h3>
                    <p className="specialty">{appointment.specialty}</p>
                  </div>
                </div>
                <div className="appointment-status-badge">
                  {getStatusIcon(appointment.status)}
                  <span>{appointment.status}</span>
                </div>
              </div>

              <div className="appointment-details">
                <div className="detail-item">
                  <FaCalendarAlt />
                  <span>{appointment.date}</span>
                </div>
                <div className="detail-item">
                  <FaClock />
                  <span>{appointment.time}</span>
                </div>
              </div>

              <div className="appointment-reason">
                <strong>Reason:</strong> {appointment.reason}
              </div>

              {appointment.status === 'pending' && (
                <div className="appointment-actions">
                  <button className="btn btn-danger btn-small">Cancel</button>
                  <button className="btn btn-secondary btn-small">Reschedule</button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </PatientLayout>
  );
};

export default PatientAppointments;
