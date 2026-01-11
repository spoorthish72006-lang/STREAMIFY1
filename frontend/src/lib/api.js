import axios from 'axios';

// Create axios instance with base URL
// Assuming backend runs on port 5001 as per server.js
const api = axios.create({
  baseURL: 'http://localhost:5001/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to attach the token if it exists
api.interceptors.request.use(
  (config) => {
    // In a real app, you'd get this from localStorage or a context
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API methods organized by resource
export const authApi = {
  login: (credentials) => api.post('/auth/login', credentials),
  signup: (userData) => api.post('/auth/signup', userData),
  logout: () => api.post('/auth/logout'),
  check: () => api.get('/auth/check'),
};

export const agentsApi = {
  getAgents: () => api.get('/agents'),
};

export const metricsApi = {
  getMetrics: () => api.get('/metrics'),
};

export const settingsApi = {
  getSettings: () => api.get('/settings'),
  updateSettings: (settings) => api.put('/settings', settings),
};

export const ticketsApi = {
  getAllTickets: () => api.get('/tickets'),
  searchTickets: (filters) => api.get('/tickets/search', { params: filters }),
  createTicket: (ticketData) => api.post('/tickets', ticketData),
  assignTicket: (ticketId, agentId) => api.post('/tickets/assign', { ticketId, agentId }),
  deleteTicket: (id) => api.delete(`/tickets/${id}`),
};

export default api;
