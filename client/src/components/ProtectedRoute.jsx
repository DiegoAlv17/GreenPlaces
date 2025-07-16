import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requireAdmin = false, requireRole = null }) => {
  const { isAuthenticated, userRole, loading, currentUser } = useAuth();

  // Debug: mostrar información de autenticación
  console.log('ProtectedRoute - Auth info:', { isAuthenticated, userRole, loading, currentUser, requireAdmin, requireRole });

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    console.log('ProtectedRoute - Showing loading screen');
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verificando permisos...</p>
        </div>
      </div>
    );
  }

  // Redirigir a login si no está autenticado
  if (!isAuthenticated) {
    console.log('ProtectedRoute - Redirecting to login - not authenticated');
    return <Navigate to="/login" replace />;
  }

  // Redirigir a home si requiere admin pero no es admin
  if (requireAdmin && userRole !== 'administrador') {
    console.log('ProtectedRoute - Redirecting to home - not admin');
    return <Navigate to="/" replace />;
  }

  // Redirigir si requiere un rol específico y no lo tiene
  if (requireRole && userRole !== requireRole) {
    console.log(`ProtectedRoute - Redirecting to home - required role: ${requireRole}, user role: ${userRole}`);
    return <Navigate to="/" replace />;
  }

  console.log('ProtectedRoute - Access granted');
  return children;
};

export default ProtectedRoute;
