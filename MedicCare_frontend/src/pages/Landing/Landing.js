import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaHeartbeat,
  FaUserMd,
  FaRobot,
  FaCalendarCheck,
  FaShieldAlt,
  FaArrowRight,
} from 'react-icons/fa';
import './Landing.css';

const Landing = () => {
  const features = [
    {
      icon: FaRobot,
      title: 'AI-Powered Diagnosis',
      description: 'Get instant health insights with our advanced AI chatbot',
    },
    {
      icon: FaCalendarCheck,
      title: 'Easy Appointments',
      description: 'Book and manage appointments with top doctors effortlessly',
    },
    {
      icon: FaUserMd,
      title: 'Expert Doctors',
      description: 'Connect with certified medical professionals',
    },
    {
      icon: FaShieldAlt,
      title: 'Secure & Private',
      description: 'Your health data is encrypted and protected',
    },
  ];

  return (
    <div className="landing-page">
      <nav className="landing-nav">
        <div className="nav-content">
          <div className="logo-landing">
            <FaHeartbeat className="logo-icon-landing" />
            <span className="logo-text-landing">MedicCare</span>
          </div>
          <div className="nav-actions">
            <Link to="/login" className="btn btn-secondary">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-text"
          >
            <h1 className="hero-title">
              Your Health,
              <br />
              <span className="gradient-text">Our Priority</span>
            </h1>
            <p className="hero-description">
              Experience the future of healthcare with AI-powered diagnostics, seamless
              appointment booking, and direct access to medical professionals.
            </p>
            <div className="hero-buttons">
              <Link to="/register" className="btn btn-primary btn-large">
                Start Your Journey
                <FaArrowRight />
              </Link>
              <Link to="/login" className="btn btn-secondary btn-large">
                I Have an Account
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hero-visual"
          >
            <div className="floating-card card-1">
              <FaHeartbeat className="card-icon" />
              <span>95% Patient Satisfaction</span>
            </div>
            <div className="floating-card card-2">
              <FaUserMd className="card-icon" />
              <span>500+ Doctors</span>
            </div>
            <div className="floating-card card-3">
              <FaRobot className="card-icon" />
              <span>AI-Powered Care</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="features-section">
        <div className="section-header">
          <h2 className="section-title">Why Choose MedicCare?</h2>
          <p className="section-description">
            Advanced technology meets compassionate care
          </p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="feature-card"
            >
              <div className="feature-icon">
                <feature.icon />
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="cta-content"
        >
          <h2 className="cta-title">Ready to Get Started?</h2>
          <p className="cta-description">
            Join thousands of patients who trust MedicCare for their healthcare needs
          </p>
          <Link to="/register" className="btn btn-primary btn-large">
            Create Your Account
            <FaArrowRight />
          </Link>
        </motion.div>
      </section>

      <footer className="landing-footer">
        <p>&copy; 2026 MedicCare. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
