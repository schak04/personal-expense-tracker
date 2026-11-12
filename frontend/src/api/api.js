import axios from 'axios';

// Assuming a local backend for the MVP
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const transactionService = {
  // Get all transactions (can accept query params for filters like ?month=11)
  getAll: async (params = {}) => {
    const response = await api.get('/transactions', { params });
    return response.data;
  },

  // Get dashboard summary (totals, recent transactions)
  getSummary: async () => {
    const response = await api.get('/transactions/summary');
    return response.data;
  },

  // Get analytics data for charts
  getAnalytics: async () => {
    const response = await api.get('/transactions/analytics');
    return response.data;
  },

  // Add a new transaction
  create: async (transactionData) => {
    const response = await api.post('/transactions', transactionData);
    return response.data;
  },

  // Update an existing transaction
  update: async (id, transactionData) => {
    const response = await api.put(`/transactions/${id}`, transactionData);
    return response.data;
  },

  // Delete a transaction
  delete: async (id) => {
    const response = await api.delete(`/transactions/${id}`);
    return response.data;
  }
};

export default api;
