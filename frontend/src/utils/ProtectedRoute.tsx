// ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';



const ProtectedRoute: React.FC = () => {
  const  token  = useAuth();

  return token ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
