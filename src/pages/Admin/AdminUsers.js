import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaUserMd, FaShieldAlt, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import AdminLayout from '../../components/Admin/AdminLayout';
import toast from 'react-hot-toast';
import './AdminPages.css';

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john@email.com',
      role: 'patient',
      status: 'active',
      joinedDate: '2025-12-15',
    },
    {
      id: 2,
      name: 'Dr. Sarah Johnson',
      email: 'sarah@email.com',
      role: 'doctor',
      status: 'active',
      joinedDate: '2025-11-20',
    },
    {
      id: 3,
      name: 'Emma Wilson',
      email: 'emma@email.com',
      role: 'patient',
      status: 'active',
      joinedDate: '2026-01-05',
    },
    {
      id: 4,
      name: 'Dr. Michael Chen',
      email: 'michael@email.com',
      role: 'doctor',
      status: 'active',
      joinedDate: '2025-10-10',
    },
    {
      id: 5,
      name: 'Admin User',
      email: 'admin@email.com',
      role: 'admin',
      status: 'active',
      joinedDate: '2025-09-01',
    },
  ]);

  const getRoleIcon = (role) => {
    switch (role) {
      case 'doctor':
        return <FaUserMd />;
      case 'admin':
        return <FaShieldAlt />;
      default:
        return <FaUser />;
    }
  };

  const handleDelete = (userId) => {
    setUsers(users.filter((u) => u.id !== userId));
    toast.success('User deleted successfully');
  };

  const handleStatusToggle = (userId) => {
    setUsers(
      users.map((u) =>
        u.id === userId
          ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' }
          : u
      )
    );
    toast.success('User status updated');
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <AdminLayout>
      <div className="admin-page-container">
        <div className="page-header">
          <div>
            <h1 className="admin-page-title">User Management</h1>
            <p className="admin-page-subtitle">Manage platform users and permissions</p>
          </div>
        </div>

        <div className="admin-controls">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="role-filters">
            {['all', 'patient', 'doctor', 'admin'].map((role) => (
              <button
                key={role}
                className={`role-filter-btn ${roleFilter === role ? 'active' : ''}`}
                onClick={() => setRoleFilter(role)}
              >
                {role === 'all' ? 'All Users' : role.charAt(0).toUpperCase() + role.slice(1) + 's'}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="admin-table-container"
        >
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <td>
                    <div className="user-cell">
                      <div className="user-avatar">{getRoleIcon(user.role)}</div>
                      <span className="user-name">{user.name}</span>
                    </div>
                  </td>
                  <td className="email-cell">{user.email}</td>
                  <td>
                    <span className={`role-badge ${user.role}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <button
                      className={`status-toggle ${user.status}`}
                      onClick={() => handleStatusToggle(user.id)}
                    >
                      {user.status}
                    </button>
                  </td>
                  <td className="date-cell">{user.joinedDate}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn edit" title="Edit">
                        <FaEdit />
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => handleDelete(user.id)}
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
