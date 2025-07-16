import axios from 'axios';

const API_URL = 'http://20.197.241.231:3000/api';

// Configurar axios para enviar cookies automáticamente
axios.defaults.withCredentials = true;

// Interceptor para debugging de requests
axios.interceptors.request.use(
  (config) => {
    console.log('Axios Request:', {
      method: config.method,
      url: config.url,
      withCredentials: config.withCredentials,
      headers: config.headers
    });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para debugging de responses
axios.interceptors.response.use(
  (response) => {
    console.log('Axios Response:', {
      status: response.status,
      url: response.config.url,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.log('Axios Error:', {
      status: error.response?.status,
      url: error.config?.url,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

const ventaService = {
  // Crear una venta (solo clientes autenticados)
  createVenta: async (ventaData) => {
    try {
      const response = await axios.post(`${API_URL}/ventas`, ventaData);
      return response.data;
    } catch (error) {
      console.error('Error creating venta:', error);
      if (error.response?.status === 401) {
        throw new Error('Debes iniciar sesión para realizar una compra');
      }
      throw new Error(error.response?.data?.message || 'Error al realizar la venta');
    }
  },

  // Obtener historial de ventas del cliente (solo clientes autenticados)
  getClientVentas: async () => {
    try {
      const response = await axios.get(`${API_URL}/cliente/ventas`);
      return response.data;
    } catch (error) {
      console.error('Error fetching client ventas:', error);
      if (error.response?.status === 401) {
        throw new Error('Debes iniciar sesión para ver tu historial');
      }
      throw new Error(error.response?.data?.message || 'Error al obtener historial de ventas');
    }
  },

  // Obtener detalle de una venta específica del cliente
  getClientVentaDetail: async (ventaId) => {
    try {
      const response = await axios.get(`${API_URL}/cliente/ventas/${ventaId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching client venta detail:', error);
      if (error.response?.status === 401) {
        throw new Error('No tienes permisos para ver esta venta');
      }
      throw new Error(error.response?.data?.message || 'Error al obtener detalle de la venta');
    }
  },

  // Obtener todas las ventas (solo administradores)
  getAllVentas: async () => {
    try {
      console.log('ventaService - Calling getAllVentas endpoint');
      const response = await axios.get(`${API_URL}/ventas`);
      console.log('ventaService - getAllVentas response:', response.data);
      return response.data;
    } catch (error) {
      console.error('ventaService - Error fetching all ventas:', error);
      console.error('ventaService - Response status:', error.response?.status);
      console.error('ventaService - Response data:', error.response?.data);
      if (error.response?.status === 401 || error.response?.status === 403) {
        throw new Error('No tienes permisos para ver todas las ventas');
      }
      throw new Error(error.response?.data?.message || 'Error al obtener ventas');
    }
  },

  // Obtener detalle de una venta específica (solo administradores)
  getVentaDetail: async (ventaId) => {
    try {
      const response = await axios.get(`${API_URL}/ventas/${ventaId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching venta detail:', error);
      if (error.response?.status === 401) {
        throw new Error('No tienes permisos para ver esta venta');
      }
      throw new Error(error.response?.data?.message || 'Error al obtener detalle de la venta');
    }
  }
};

export default ventaService;
