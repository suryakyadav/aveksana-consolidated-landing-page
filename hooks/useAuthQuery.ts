
// This file is largely deprecated by the move to Redux.
// We keep it temporarily to prevent import errors in components that might still reference it directly,
// mapping them to the new Redux-based useAuth hook where possible or providing stubs.

import { useAuth } from '../contexts/AuthContext';

export const useLogin = () => {
  const { login, isLoading, isError } = useAuth();
  // Adapter to match React Query mutation signature roughly
  return {
    mutate: login,
    isPending: isLoading,
    isError: isError,
    error: null
  };
};

export const useRegister = () => {
  const { register, isLoading, isError } = useAuth();
  return {
    mutate: register,
    isPending: isLoading,
    isError: isError,
    error: null
  };
};

export const useUser = () => {
  const { user, isLoading, isError } = useAuth();
  return {
    data: user,
    isLoading,
    isError
  };
};
