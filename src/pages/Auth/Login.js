import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaHeartbeat } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
    setLoading(true);

    try {
      // Simulate API call - replace with actual API
      setTimeout(() => {
        // Mock login - replace with actual API call
        const mockUser = {
          id: 1,
          name: formData.email.split('@')[0],
          email: formData.email,
          role: 'patient', // Change based on login credentials
          token: 'mock-jwt-token',
        };

        // For demo: check email prefix for role
        if (formData.email.startsWith('doctor')) {
          mockUser.role = 'doctor';
        } else if (formData.email.startsWith('admin')) {
          mockUser.role = 'admin';
        }

        login(mockUser);
        toast.success(`Welcome back, ${mockUser.name}!`);
        navigate(`/${mockUser.role}/dashboard`);
        setLoading(false);
      }, 1500);

      /* Actual API call
      const response = await authAPI.login(formData);
      login(response.data);
      toast.success('Login successful!');
      navigate(`/${response.data.role}/dashboard`);
      */
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="auth-container"
      >
        <div className="auth-header">
          <div className="auth-logo">
            <FaHeartbeat />
          </div>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to continue to MedicCare</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
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
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-small"></span>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="auth-link">
              Register here
            </Link>
          </p>
        </div>

        <div className="demo-credentials">
          <p className="demo-title">Demo Credentials:</p>
          <div className="demo-grid">
            <div className="demo-item">
              <strong>Patient:</strong> patient@test.com
            </div>
            <div className="demo-item">
              <strong>Doctor:</strong> doctor@test.com
            </div>
            <div className="demo-item">
              <strong>Admin:</strong> admin@test.com
            </div>
          </div>
          <p className="demo-note">Password: any (for demo)</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
