import axios from 'axios';
import { isJwtValid } from '@/lib/jwt';

export const api = axios.create({
  baseURL: 'http://192.168.1.2:3000',
  headers: {
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${localStorage.getItem('token')}`,
    // Authorization:
    //   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZjZkZWRjOGFjNDg5NzU1YTUxN2VkMSIsImlhdCI6MTc2MTAwOTM3MiwiZXhwIjoxNzYxMDk1NzcyfQ.s-Bx2gQJ4fv1toN_pheHUrWVq4JSfLUs3arZ9f0tWLg',
  },
});

// На каждый запрос — подставляем только валидный токен
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token && isJwtValid(token)) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // Токен отсутствует или истёк — чистим и не шлём заголовок
      if (config.headers?.Authorization) delete config.headers.Authorization;
      localStorage.removeItem('token');
    }
  }
  return config;
});

// На любой ответ 401/403 — чистим токен и уводим на /auth
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;
    if (typeof window !== 'undefined' && (status === 401 || status === 403)) {
      localStorage.removeItem('token');
      // Жёсткий редирект, чтобы гарантированно оборвать текущий стейт
      window.location.replace('/auth');
    }
    return Promise.reject(error);
  }
);
