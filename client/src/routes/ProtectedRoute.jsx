import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSession } from '@/config/useSession';

const ProtectedRoute = () => {
  const { usuario } = useSession();

  // Si no hay usuario autenticado, redirige al home
  if (!usuario || Object.keys(usuario).length === 0) {
    return <Navigate to="/" replace />;
  }

  // Si hay usuario autenticado, renderiza las rutas hijas
  return <Outlet />;
};

export default ProtectedRoute;