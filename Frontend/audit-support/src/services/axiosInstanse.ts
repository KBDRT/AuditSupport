// api/axiosInstance.ts
import axios, { type InternalAxiosRequestConfig } from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://localhost:5001',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000, 
});



// // Интерсептор для обработки ошибок
// axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response?.status === 401) {
//             // Перенаправление на логин
//             if (typeof window !== 'undefined') {
//                 window.location.href = '/login';
//             }
//         }
//         return Promise.reject(error);
//     }
// );

// Интерсептор для добавления токена (если нужно)
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Можно добавить логирование или другие заголовки
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);