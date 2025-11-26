
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    // Use a simple spinner or skeleton screen while auth status is being checked
    return (
        <div className="min-h-screen flex items-center justify-center bg-brand-light-gray-blue">
            <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-medium-teal mb-4"></div>
                <p className="text-brand-dark-grey font-medium">Verifying session...</p>
            </div>
        </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
