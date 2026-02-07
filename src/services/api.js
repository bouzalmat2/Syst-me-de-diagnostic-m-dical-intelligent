import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
};


// Patient APIs
export const patientAPI = {
  getAppointments: () => api.get('/patient/appointments'),
  bookAppointment: (data) => api.post('/patient/appointments', data),
  getHistory: () => api.get('/patient/history'),
  sendMessage: (data) => api.post('/patient/messages', data),
  getMessages: () => api.get('/patient/messages'),
  chatbot: (message) => api.post('/patient/chatbot', { message }),
};

// Doctor APIs
export const doctorAPI = {
  getAppointments: () => api.get('/doctor/appointments'),
  updateAppointment: (id, status) => api.patch(`/doctor/appointments/${id}`, { status }),
  getPatients: () => api.get('/doctor/patients'),
  addPatientNote: (patientId, note) => api.post(`/doctor/patients/${patientId}/notes`, note),
  getMessages: () => api.get('/doctor/messages'),
  sendMessage: (data) => api.post('/doctor/messages', data),
  chatbot: (message) => api.post('/doctor/chatbot', { message }),
};

// Admin APIs
export const adminAPI = {
  getStatistics: () => api.get('/admin/statistics'),
  getUsers: () => api.get('/admin/users'),
  updateUser: (id, data) => api.patch(`/admin/users/${id}`, data),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  getDashboardData: () => api.get('/admin/dashboard'),
};

export default api;
