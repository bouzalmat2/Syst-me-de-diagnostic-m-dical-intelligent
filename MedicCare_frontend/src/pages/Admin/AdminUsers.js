import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaUserMd, FaShieldAlt, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import AdminLayout from '../../components/Admin/AdminLayout';
import { adminAPI } from '../../services/api';
import toast from 'react-hot-toast';
import './AdminPages.css';

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await adminAPI.getUsers();
      setUsers(res.data || []);
    } catch (err) {
      console.error('Error fetching users:', err);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const getRoleIcon = (role) => {
    switch ((role || '').toLowerCase()) {
      case 'doctor':
        return <FaUserMd />;
      case 'admin':
        return <FaShieldAlt />;
      default:
        return <FaUser />;
    }
  };

  const handleDelete = async (userId) => {
    try {
      await adminAPI.deleteUser(userId);
      setUsers(users.filter((u) => u.id !== userId));
      toast.success('User deleted successfully');
    } catch (err) {
      toast.error('Failed to delete user');
    }
  };

  const handleStatusToggle = (userId) => {
    toast.success('Status toggle not yet implemented');
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      (user.username || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.email || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || (user.role || '').toLowerCase() === roleFilter;
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
                      <span className="user-name">{user.username}</span>
                    </div>
                  </td>
                  <td className="email-cell">{user.email}</td>
                  <td>
                    <span className={`role-badge ${(user.role || '').toLowerCase()}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span className="status-toggle active">active</span>
                  </td>
                  <td className="date-cell">N/A</td>
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
