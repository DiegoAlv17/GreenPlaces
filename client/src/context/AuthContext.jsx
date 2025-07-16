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
      console.log('AuthContext - Starting auth check...');
      try {
        // Primero verificar si hay datos en localStorage
        const savedUser = localStorage.getItem('currentUser');
        const savedRole = localStorage.getItem('userRole');
        
        console.log('AuthContext - localStorage data:', { savedUser: !!savedUser, savedRole });
        
        if (savedUser && savedRole) {
          const parsedUser = JSON.parse(savedUser);
          setCurrentUser(parsedUser);
          setUserRole(savedRole);
          setIsAuthenticated(true);
          console.log('AuthContext - Usuario cargado desde localStorage:', { parsedUser, savedRole });
          setLoading(false);
          return;
        }

        // Si no hay datos en localStorage, intentar verificar con el backend
        console.log('AuthContext - No localStorage data, checking with backend...');
        const userData = await authService.getCurrentUser();
        if (userData) {
          setCurrentUser(userData.user);
          setUserRole(userData.role);
          setIsAuthenticated(true);
          
          // Guardar en localStorage
          localStorage.setItem('currentUser', JSON.stringify(userData.user));
          localStorage.setItem('userRole', userData.role);
          
          console.log('AuthContext - Usuario autenticado encontrado:', userData);
        } else {
          console.log('AuthContext - No hay usuario autenticado');
          setCurrentUser(null);
          setUserRole(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.log("AuthContext - No hay sesión activa:", error.message);
        // Limpiar localStorage si hay error
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userRole');
        setCurrentUser(null);
        setUserRole(null);
        setIsAuthenticated(false);
      } finally {
        console.log('AuthContext - Setting loading to false');
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Función para iniciar sesión
  const login = async (credentials) => {
    try {
      const result = await authService.login(credentials);
      setCurrentUser(result.user);
      setUserRole(result.role);
      setIsAuthenticated(true);
      
      // Guardar en localStorage
      localStorage.setItem('currentUser', JSON.stringify(result.user));
      localStorage.setItem('userRole', result.role);
      
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
      
      // Limpiar localStorage
      localStorage.removeItem('currentUser');
      localStorage.removeItem('userRole');
      
      navigate('/');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      // Limpiar estado local aunque falle la llamada al servidor
      setCurrentUser(null);
      setUserRole(null);
      setIsAuthenticated(false);
      localStorage.removeItem('currentUser');
      localStorage.removeItem('userRole');
      navigate('/');
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
