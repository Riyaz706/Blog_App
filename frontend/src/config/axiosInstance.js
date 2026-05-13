import axios from 'axios';

// In dev: uses VITE_API_URL from .env.local (http://localhost:4000)
// In prod: uses VITE_API_URL from Vercel environment variable (https://your-backend.onrender.com)
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
  withCredentials: true,
});

export default axiosInstance;
