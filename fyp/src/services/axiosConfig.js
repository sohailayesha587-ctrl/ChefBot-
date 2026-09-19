import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
const token = localStorage.getItem('userToken');
    if (
      token &&
      token !== 'undefined' &&
      token !== 'null'
    ) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('userToken');
localStorage.removeItem('userData');
      if (window.location.pathname !== '/login-page') {
        window.location.href = '/login-page';
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
