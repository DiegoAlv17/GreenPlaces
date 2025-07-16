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
      // Intentar obtener el usuario actual del backend
      const response = await axios.get(`${API_URL}/me`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        console.log('Endpoint /me no disponible, verificando con una llamada simple...');
        
        // Si el endpoint /me no existe, intentar otra verificación
        try {
          // Hacer una llamada a algún endpoint protegido para verificar el token
          const testResponse = await axios.get('http://localhost:3000/api/productos');
          // Si la llamada es exitosa, significa que tenemos un token válido
          // Pero no podemos obtener los datos del usuario sin el endpoint /me
          console.log('Token válido pero sin endpoint /me - necesitarás implementar el endpoint en el backend');
          return null;
        } catch (testError) {
          console.log('No hay sesión activa');
          return null;
        }
      }
      
      console.log('No hay usuario autenticado:', error.response?.status);
      return null;
    }
  }
};

export default authService;
