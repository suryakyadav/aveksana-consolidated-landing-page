
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { loginUser, registerUser, fetchUserProfile } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types';

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // 1. Store token
      localStorage.setItem('authToken', data.token);
      
      // 2. Update User Cache immediately
      // Ensure the user object has empty arrays for the dashboard if undefined
      const safeUser = {
          ...data.user,
          savedIdeas: data.user.savedIdeas || [],
          pipelineProjects: data.user.pipelineProjects || [],
          strategies: data.user.strategies || [],
          recentActivity: data.user.recentActivity || [],
          expertise: data.user.expertise || []
      };
      
      queryClient.setQueryData(['user'], safeUser);
      
      // 3. Redirect
      navigate('/dashboard');
    },
    onError: (error: any) => {
      console.error("Login failed:", error.response?.data?.message || error.message);
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      localStorage.setItem('authToken', data.token);
      queryClient.setQueryData(['user'], data.user);
      navigate('/dashboard');
    },
  });
};

// Hook to check if user is logged in (runs on app load)
export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: fetchUserProfile,
    retry: false, // Don't retry if 401
    enabled: !!localStorage.getItem('authToken'), // Only run if token exists
    // Ensure we return a structure compatible with the dashboard even if some fields are missing
    select: (data: User) => ({
        ...data,
        savedIdeas: data.savedIdeas || [],
        pipelineProjects: data.pipelineProjects || [],
        strategies: data.strategies || [],
        recentActivity: data.recentActivity || [],
        expertise: data.expertise || []
    })
  });
};
