// api/axiosInstance.ts
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000, 
});



// // Интерцепторы для всех запросов
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // Добавляем токен авторизации
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Обработка ошибок
//     if (error.response?.status === 401) {
//       // Неавторизован
//       localStorage.removeItem('token');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );