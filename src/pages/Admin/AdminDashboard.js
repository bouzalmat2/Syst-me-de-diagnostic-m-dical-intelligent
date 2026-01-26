import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaUsers,
  FaUserMd,
  FaCalendarCheck,
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
} from 'react-icons/fa';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import AdminLayout from '../../components/Admin/AdminLayout';
import './AdminPages.css';

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Users', value: '1,247', change: '+12%', trend: 'up', icon: FaUsers },
    { label: 'Doctors', value: '156', change: '+5%', trend: 'up', icon: FaUserMd },
    { label: 'Patients', value: '1,091', change: '+15%', trend: 'up', icon: FaUsers },
    { label: 'Appointments', value: '2,341', change: '-3%', trend: 'down', icon: FaCalendarCheck },
  ];

  const userGrowthData = [
    { month: 'Jan', patients: 850, doctors: 120 },
    { month: 'Feb', patients: 920, doctors: 135 },
    { month: 'Mar', patients: 980, doctors: 142 },
    { month: 'Apr', patients: 1020, doctors: 148 },
    { month: 'May', patients: 1050, doctors: 152 },
    { month: 'Jun', patients: 1091, doctors: 156 },
  ];

  const appointmentData = [
    { name: 'Completed', value: 1854, color: '#10B981' },
    { name: 'Pending', value: 287, color: '#F59E0B' },
    { name: 'Cancelled', value: 200, color: '#FF3B3B' },
  ];

  const recentActivity = [
    { id: 1, user: 'Dr. Sarah Johnson', action: 'completed an appointment', time: '5 min ago' },
    { id: 2, user: 'John Smith', action: 'registered as patient', time: '12 min ago' },
    { id: 3, user: 'Dr. Michael Chen', action: 'updated patient records', time: '25 min ago' },
    { id: 4, user: 'Emma Wilson', action: 'booked an appointment', time: '1 hour ago' },
  ];

  return (
    <AdminLayout>
      <div className="admin-page-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="page-header"
        >
          <h1 className="admin-page-title">System Dashboard</h1>
          <p className="admin-page-subtitle">Monitor and manage your healthcare platform</p>
        </motion.div>

        <div className="admin-stats-grid">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="admin-stat-card"
            >
              <div className="admin-stat-header">
                <div className="admin-stat-icon">
                  <stat.icon />
                </div>
                <span className={`admin-stat-change ${stat.trend}`}>
                  {stat.trend === 'up' ? <FaArrowUp /> : <FaArrowDown />}
                  {stat.change}
                </span>
              </div>
              <h3 className="admin-stat-value">{stat.value}</h3>
              <p className="admin-stat-label">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="admin-dashboard-grid">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="admin-chart-card"
          >
            <h2 className="chart-title">User Growth</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{ background: '#1a1a2e', border: '1px solid #374151', borderRadius: '8px' }}
                />
                <Legend />
                <Line type="monotone" dataKey="patients" stroke="#0066FF" strokeWidth={2} />
                <Line type="monotone" dataKey="doctors" stroke="#FF3B3B" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="admin-chart-card"
          >
            <h2 className="chart-title">Appointment Status</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={appointmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {appointmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: '#1a1a2e', border: '1px solid #374151', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="admin-activity-card"
        >
          <h2 className="chart-title">Recent Activity</h2>
          <div className="activity-list">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-dot"></div>
                <div className="activity-content">
                  <p>
                    <strong>{activity.user}</strong> {activity.action}
                  </p>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
