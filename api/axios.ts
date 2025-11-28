
import axios from 'axios';

// NOTE: This file defines the Axios configuration for a REAL backend integration.
// Currently, the application is using the mock implementation in `api/auth.ts` to simulate 
// the backend experience without a running server. 

const API_URL = 'https://api.aveksana.com/v1'; 

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // 'withCredentials: true' allows the browser to send cookies (HttpOnly) with requests.
  withCredentials: true, 
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

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

    // Handle 401 Unauthorized (Token Expired)
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      
      if (isRefreshing) {
        return new Promise(function(resolve, reject) {
          failedQueue.push({resolve, reject});
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return apiClient(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Attempt to refresh the token
        // In a real app, you would call your backend endpoint
        // const { data } = await axios.post(`${API_URL}/auth/refresh-token`, {}, { withCredentials: true });
        
        // Mocking refresh success for demonstration
        const mockNewToken = 'mock-refreshed-token-' + Date.now();
        localStorage.setItem('authToken', mockNewToken);
        
        apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + mockNewToken;
        originalRequest.headers['Authorization'] = 'Bearer ' + mockNewToken;
        
        processQueue(null, mockNewToken);
        isRefreshing = false;
        
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;
        // Logout user on failure
        localStorage.removeItem('authToken');
        window.location.href = '/login'; 
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
