import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

// Creamos el contexto
const AuthContext = createContext();

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  return useContext(AuthContext);
};

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Verificar si hay un usuario autenticado al cargar la app
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          setCurrentUser(userData.user);
          setUserRole(userData.role);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error al verificar autenticación:", error);
      } finally {
        setLoading(false);
      }
    };

    // Ejecutamos la verificación y aseguramos que loading se actualice
    checkAuthStatus().finally(() => {
      // Garantizamos que loading se ponga en false después de un breve tiempo
      // en caso de que algo salga mal con la verificación
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    });
  }, []);

  // Función para iniciar sesión
  const login = async (credentials) => {
    try {
      const result = await authService.login(credentials);
      setCurrentUser(result.user);
      setUserRole(result.role);
      setIsAuthenticated(true);
      
      // Redirigir según el rol
      if (result.role === 'administrador') {
        navigate('/admin');
      } else {
        navigate('/');
      }
      
      return result;
    } catch (error) {
      throw error;
    }
  };

  // Función para registrarse
  const register = async (userData) => {
    try {
      const result = await authService.register(userData);
      return result;
    } catch (error) {
      throw error;
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    try {
      await authService.logout();
      setCurrentUser(null);
      setUserRole(null);
      setIsAuthenticated(false);
      navigate('/');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // Valores que se proporcionarán a través del contexto
  const value = {
    currentUser,
    userRole,
    isAuthenticated,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
