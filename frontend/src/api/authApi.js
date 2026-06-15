import axios from 'axios';


const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  // Crucial flag for ensuring browsers send the JWT cookie automatically with every request
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default authApi;
