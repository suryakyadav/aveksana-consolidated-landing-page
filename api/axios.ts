
import axios from 'axios';

// In a real environment, this would come from import.meta.env.VITE_API_URL or process.env
// For this implementation, we'll use a placeholder base URL. 
// You should replace this with your actual AWS API Gateway URL.
const API_URL = 'https://api.aveksana.com/v1'; 

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // SECURITY UPGRADE: 
  // 'withCredentials: true' allows the browser to send cookies (HttpOnly) with requests.
  // This is required if you move from localStorage to Cookie-based auth in the future.
  withCredentials: true, 
});

// 1. Request Interceptor: Attaches token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 2. Response Interceptor: Handles global errors (e.g., token expiry)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 Unauthorized and we haven't retried yet
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // TODO: IMPLEMENT REFRESH TOKEN LOGIC HERE
      // 1. Call backend endpoint '/auth/refresh-token' (sending refresh token cookie)
      // 2. Get new Access Token
      // 3. Update localStorage (or memory)
      // 4. Update originalRequest.headers['Authorization']
      // 5. Return apiClient(originalRequest)
      
      // For now, fallback to logout
      localStorage.removeItem('authToken');
      // Optionally redirect to login here if not handled by ProtectedRoute
      // window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

export default apiClient;
