import axios from 'axios';

const API = axios.create({
  // baseURL: 'https://localhost:7080', //  backend base URL
  baseURL: 'https://localhost:7216'
});

// Attach JWT token from localStorage automatically to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
