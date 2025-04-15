// client/src/services/adminService.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/admin',
  withCredentials: true, // for cookies if using auth
});

export const getTotalUsers = () => API.get('/total-users');
export const getTotalMovies = () => API.get('/total-movies');
export const getSuspendedUsers = () => API.get('/suspended-users');
export const getAnalyticsData = () => API.get('/analytics');
export const getAdminNotifications = () => API.get('/notifications');

// Add more API calls as needed
