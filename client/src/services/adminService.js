import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Configurar axios para enviar cookies automáticamente
axios.defaults.withCredentials = true;

const adminService = {
  // Obtener todos los administradores (solo administradores)
  getAllAdmins: async () => {
    try {
      const response = await axios.get(`${API_URL}/admins`);
      return response.data;
    } catch (error) {
      console.error('Error fetching admins:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        throw new Error('No tienes permisos para ver la lista de administradores');
      }
      throw new Error(error.response?.data?.message || 'Error al obtener administradores');
    }
  },

  // Registrar un nuevo administrador (solo administradores)
  registerAdmin: async (adminData) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register/admin`, adminData);
      return response.data;
    } catch (error) {
      console.error('Error registering admin:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        throw new Error('No tienes permisos para registrar administradores');
      }
      if (error.response?.status === 400) {
        // Manejar errores de validación específicos
        const message = error.response?.data?.message || 'Error de validación';
        if (message.includes('email')) {
          throw new Error('El email ya está registrado');
        }
        if (message.includes('dni')) {
          throw new Error('El DNI ya está registrado');
        }
        throw new Error(message);
      }
      throw new Error(error.response?.data?.message || 'Error al registrar administrador');
    }
  },

  // Validar email único (helper function)
  validateEmailUnique: async (email, excludeId = null) => {
    try {
      const admins = await adminService.getAllAdmins();
      const exists = admins.some(admin => 
        admin.email.toLowerCase() === email.toLowerCase() && 
        admin.admin_id !== excludeId
      );
      return !exists;
    } catch (error) {
      // Si no podemos validar, asumimos que es válido y dejamos que el backend maneje
      return true;
    }
  },

  // Validar DNI único (helper function)
  validateDniUnique: async (dni, excludeId = null) => {
    try {
      const admins = await adminService.getAllAdmins();
      const exists = admins.some(admin => 
        admin.dni === dni && 
        admin.admin_id !== excludeId
      );
      return !exists;
    } catch (error) {
      // Si no podemos validar, asumimos que es válido y dejamos que el backend maneje
      return true;
    }
  }
};

export default adminService;
