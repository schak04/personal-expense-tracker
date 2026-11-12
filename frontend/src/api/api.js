import axios from 'axios';

// Assuming a local backend for the MVP
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const transactionService = {
  getAll: async (params = {}) => {
    const response = await api.get('/transactions/', { params });
    return response.data;
  },
  getSummary: async () => {
    const response = await api.get('/transactions/summary/');
    return response.data;
  },
  getAnalytics: async () => {
    const response = await api.get('/transactions/analytics/');
    return response.data;
  },
  create: async (transactionData) => {
    const response = await api.post('/transactions/', transactionData);
    return response.data;
  },
  update: async (id, transactionData) => {
    const response = await api.put(`/transactions/${id}/`, transactionData);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/transactions/${id}/`);
    return response.data;
  }
};


export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login/', credentials);
    const { access, refresh } = response.data;
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    return response.data;
  },
  register: async (payload) => {
    const response = await api.post('/auth/register/', payload);
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },
  isAuthenticated: () => !!localStorage.getItem('access_token'),
};

export default api;
