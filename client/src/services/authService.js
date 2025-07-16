import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth';

// Configuramos axios para que envíe cookies en las peticiones
axios.defaults.withCredentials = true;

const authService = {
  register: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        nombre: userData.nombre,
        apellido: userData.apellido,
        email: userData.email,
        contraseña: userData.contraseña
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al registrarse' };
    }
  },

  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email: credentials.email,
        contraseña: credentials.contraseña
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al iniciar sesión' };
    }
  },

  logout: async () => {
    try {
      const response = await axios.post(`${API_URL}/logout`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al cerrar sesión' };
    }
  },

  // Método para verificar si hay una sesión activa
  getCurrentUser: async () => {
    try {
      // Esta ruta debe ser implementada en tu backend
      const response = await axios.get(`${API_URL}/me`);
      return response.data;
    } catch (error) {
      console.log('No hay usuario autenticado o el endpoint /me no está disponible');
      return null;
    }
  }
};

export default authService;
