import axios from 'axios';

// Create custom axios instance
const authApi = axios.create({
  // Use VITE_API_URL if defined, otherwise default to local backend port 5000
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  // Crucial flag for ensuring browsers send the JWT cookie automatically with every request
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default authApi;
