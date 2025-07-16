import axios from 'axios';

const API_URL = 'http://20.197.241.231:3000/api';

// Configurar axios para enviar cookies automáticamente
axios.defaults.withCredentials = true;

const eventService = {
  // Obtener todos los eventos (público)
  getAllEvents: async () => {
    try {
      const response = await axios.get(`${API_URL}/eventos`);
      return response.data;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw new Error(error.response?.data?.message || 'Error al obtener eventos');
    }
  },

  // MÉTODOS PARA CLIENTES
  
  // Inscribirse a un evento (solo clientes autenticados)
  enrollInEvent: async (eventId) => {
    try {
      const response = await axios.post(`${API_URL}/eventos/${eventId}/inscribirse`);
      return response.data;
    } catch (error) {
      console.error('Error enrolling in event:', error);
      if (error.response?.status === 401) {
        throw new Error('Debes iniciar sesión para inscribirte');
      }
      if (error.response?.status === 400) {
        throw new Error(error.response?.data?.message || 'No puedes inscribirte a este evento');
      }
      throw new Error(error.response?.data?.message || 'Error al inscribirse al evento');
    }
  },

  // Cancelar inscripción a un evento (solo clientes autenticados)
  cancelEnrollment: async (eventId) => {
    try {
      const response = await axios.delete(`${API_URL}/eventos/${eventId}/cancelar`);
      return response.data;
    } catch (error) {
      console.error('Error canceling enrollment:', error);
      if (error.response?.status === 401) {
        throw new Error('Debes iniciar sesión para cancelar inscripción');
      }
      throw new Error(error.response?.data?.message || 'Error al cancelar inscripción');
    }
  },

  // Ver eventos inscritos del cliente (solo clientes autenticados)
  getMyEnrollments: async () => {
    try {
      const response = await axios.get(`${API_URL}/cliente/eventos`);
      return response.data;
    } catch (error) {
      console.error('Error fetching client events:', error);
      if (error.response?.status === 401) {
        throw new Error('Debes iniciar sesión para ver tus eventos');
      }
      throw new Error(error.response?.data?.message || 'Error al obtener tus eventos');
    }
  },

  // MÉTODOS PARA ADMINISTRADORES

  // Crear evento (solo administradores)
  createEvent: async (eventData) => {
    try {
      const response = await axios.post(`${API_URL}/eventos`, eventData);
      return response.data;
    } catch (error) {
      console.error('Error creating event:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        throw new Error('No tienes permisos para crear eventos');
      }
      throw new Error(error.response?.data?.message || 'Error al crear evento');
    }
  },

  // Actualizar evento (solo administradores)
  updateEvent: async (eventId, eventData) => {
    try {
      const response = await axios.put(`${API_URL}/eventos/${eventId}`, eventData);
      return response.data;
    } catch (error) {
      console.error('Error updating event:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        throw new Error('No tienes permisos para actualizar eventos');
      }
      throw new Error(error.response?.data?.message || 'Error al actualizar evento');
    }
  },

  // Eliminar evento (solo administradores)
  deleteEvent: async (eventId) => {
    try {
      const response = await axios.delete(`${API_URL}/eventos/${eventId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting event:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        throw new Error('No tienes permisos para eliminar eventos');
      }
      throw new Error(error.response?.data?.message || 'Error al eliminar evento');
    }
  },

  // Ver eventos creados por el administrador (solo administradores)
  getMyCreatedEvents: async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/eventos`);
      return response.data;
    } catch (error) {
      console.error('Error fetching admin events:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        throw new Error('No tienes permisos para ver eventos de administrador');
      }
      throw new Error(error.response?.data?.message || 'Error al obtener eventos creados');
    }
  },

  // Ver asistentes de un evento (solo administradores)
  getEventAttendees: async (eventId) => {
    try {
      const response = await axios.get(`${API_URL}/admin/eventos/${eventId}/asistentes`);
      return response.data;
    } catch (error) {
      console.error('Error fetching event attendees:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        throw new Error('No tienes permisos para ver asistentes');
      }
      throw new Error(error.response?.data?.message || 'Error al obtener asistentes');
    }
  }
};

export default eventService;
