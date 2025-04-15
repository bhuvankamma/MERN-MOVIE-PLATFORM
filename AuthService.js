// src/services/AuthService.js
import api from './api';

import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Update this if needed
  withCredentials: true, // Optional: if your backend uses cookies/auth
});

// ============================
// AUTH SECTION
// ============================

// Register user
export const registerUser = async (userData) => {
  try {
    const response = await API.post('/auth/register', userData);
    return response.data;
  } catch (err) {
    const errorMsg = err?.response?.data?.message || 'Registration failed';
    console.error('📛 Registration Error:', errorMsg);
    throw new Error(errorMsg);
  }
};

// Login user
export const loginUser = async (email, password) => {
  try {
    const response = await API.post('/auth/login', { email, password });
    return response.data;
  } catch (err) {
    const errorMsg = err?.response?.data?.message || 'Login failed';
    console.error('🔐 Login Error:', errorMsg);
    throw new Error(errorMsg);
  }
};

// ============================
// WATCHLIST SECTION
// ============================

export const getUserWatchlist = () => API.get('/user/watchlist');
export const removeFromWatchlist = (movieId) =>
  API.delete(`/user/watchlist/${movieId}`);

// ============================
// DOWNLOADS SECTION
// ============================

export const getUserDownloads = () => API.get('/user/downloads');
export const requestDownload = (movieId) =>
  API.post(`/user/downloads/${movieId}`);
export const deleteDownload = (downloadId) =>
  API.delete(`/user/downloads/${downloadId}`);

// ============================
// RECOMMENDATIONS SECTION
// ============================

export const getRecommendedMovies = () => API.get('/user/recommendations');
