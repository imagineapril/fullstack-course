import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:9002/api/v1',
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) =>  {
  const token = window.localStorage.getItem('token');

  if(token)  {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config;
});
