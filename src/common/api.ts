import axios from 'axios';

export const Axios = axios.create({
  baseURL: 'https://ediscovery.inabia.ai/api',
  headers: {
    'Content-type': 'application/json'
  }
});

Axios.interceptors.request.use((config) => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  if (userId && token) {
    config.params = {
      userId,
      token,
      ...config.params
    };
  }
  return config;
});

export enum API {
  AddCase = '/addcase',
  GetCases = '/getcases'
}

export default Axios;
