import axios from 'axios';

// Create an Axios instance pointing to your backend server
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Automatically attach JWT token to requests if available in localStorage
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req.json || req; // standard request return
}, (error) => {
  return Promise.reject(error);
});

// Cleaner interceptor pattern:
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;