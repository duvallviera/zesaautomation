import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5051/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData: any) => api.post('/auth/register', userData),
  login: (credentials: any) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/me'),
  updateProfile: (data: any) => api.put('/auth/profile', data),
  changePassword: (data: any) => api.post('/auth/change-password', data),
};

// Contact API
export const contactAPI = {
  submitContactForm: (data: any) => api.post('/email/contact-form', data),
  getContacts: (params?: any) => api.get('/email/contacts', { params }),
  getContact: (id: string) => api.get(`/email/contacts/${id}`),
  updateContactStatus: (id: string, status: string) => 
    api.put(`/email/contacts/${id}/status`, { status }),
};

// Automation API
export const automationAPI = {
  getAutomations: (params?: any) => api.get('/automation', { params }),
  getAutomation: (id: string) => api.get(`/automation/${id}`),
  createAutomation: (data: any) => api.post('/automation', data),
  updateAutomation: (id: string, data: any) => api.put(`/automation/${id}`, data),
  executeAutomation: (id: string, data: any) => api.post(`/automation/${id}/execute`, data),
  deleteAutomation: (id: string) => api.delete(`/automation/${id}`),
};

// Email API
export const emailAPI = {
  sendEmail: (data: any) => api.post('/email/send', data),
};

// Booking API
export const bookingAPI = {
  getBookings: (params?: any) => api.get('/booking', { params }),
};

// Portfolio API
export const portfolioAPI = {
  getPortfolio: (params?: any) => api.get('/portfolio', { params }),
};

// Analytics API
export const analyticsAPI = {
  getAnalytics: (params?: any) => api.get('/analytics', { params }),
};

// Health check
export const healthCheck = () => api.get('/health');

export default api;
