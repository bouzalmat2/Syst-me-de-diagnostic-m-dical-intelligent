import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaUser, FaHeartbeat, FaUserMd, FaUserShield } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'patient',
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters!');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call - replace with actual API
      setTimeout(() => {
        const newUser = {
          id: Date.now(),
          name: formData.name,
          email: formData.email,
          role: formData.role,
          token: 'mock-jwt-token',
        };

        login(newUser);
        toast.success(`Account created successfully! Welcome ${newUser.name}!`);
        navigate(`/${newUser.role}/dashboard`);
        setLoading(false);
      }, 1500);

      /* Actual API call
      const response = await authAPI.register(formData);
      login(response.data);
      toast.success('Registration successful!');
      navigate(`/${response.data.role}/dashboard`);
      */
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
      setLoading(false);
    }
  };

  const roleOptions = [
    { value: 'patient', label: 'Patient', icon: FaUser },
    { value: 'doctor', label: 'Doctor', icon: FaUserMd },
    { value: 'admin', label: 'Admin', icon: FaUserShield },
  ];

  return (
    <div className="auth-page">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="auth-container register-container"
      >
        <div className="auth-header">
          <div className="auth-logo">
            <FaHeartbeat />
          </div>
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join MedicCare today</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <div className="input-with-icon">
              <FaUser className="input-icon" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-with-icon">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-with-icon">
              <FaLock className="input-icon" />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-with-icon">
              <FaLock className="input-icon" />
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>I am a:</label>
            <div className="role-selector">
              {roleOptions.map((option) => (
                <label key={option.value} className="role-option">
                  <input
                    type="radio"
                    name="role"
                    value={option.value}
                    checked={formData.role === option.value}
                    onChange={handleChange}
                  />
                  <div className={`role-card ${formData.role === option.value ? 'selected' : ''}`}>
                    <option.icon className="role-icon" />
                    <span>{option.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-small"></span>
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Sign in here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
