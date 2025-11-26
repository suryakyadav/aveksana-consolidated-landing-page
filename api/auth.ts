
import apiClient from './axios';
import type { User } from '../types';

interface AuthResponse {
  token: string;
  user: User;
}

export const loginUser = async (credentials: { email: string; password: string; role?: string }): Promise<AuthResponse> => {
  // NOTE: Including 'role' in credentials for demo purposes so the backend knows which mock user to return
  const response = await apiClient.post('/auth/login', credentials);
  return response.data;
};

export const registerUser = async (userData: any): Promise<AuthResponse> => {
  const response = await apiClient.post('/auth/signup', userData);
  return response.data;
};

export const fetchUserProfile = async (): Promise<User> => {
  const response = await apiClient.get('/auth/me');
  return response.data;
};
