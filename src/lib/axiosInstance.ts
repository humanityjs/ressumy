import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// TODO: Add error interceptors

export default axiosInstance;
