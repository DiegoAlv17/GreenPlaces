import axios from 'axios';

const API_URL = 'http://localhost:3000/api/productos';

// Configuramos axios para que envíe cookies en las peticiones
axios.defaults.withCredentials = true;

const productService = {
  // Obtener todos los productos (público)
  getAllProducts: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al obtener productos' };
    }
  },

  // Crear producto (requiere autenticación de admin)
  createProduct: async (productData) => {
    try {
      const response = await axios.post(API_URL, {
        producto_nombre: productData.producto_nombre,
        precio: productData.precio,
        descripcion: productData.descripcion,
        url_imagen: productData.url_imagen
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al crear producto' };
    }
  },

  // Actualizar producto (requiere autenticación de admin)
  updateProduct: async (productId, productData) => {
    try {
      const response = await axios.put(`${API_URL}/${productId}`, {
        producto_nombre: productData.producto_nombre,
        precio: productData.precio,
        descripcion: productData.descripcion,
        url_imagen: productData.url_imagen
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al actualizar producto' };
    }
  },

  // Eliminar producto (requiere autenticación de admin)
  deleteProduct: async (productId) => {
    try {
      const response = await axios.delete(`${API_URL}/${productId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al eliminar producto' };
    }
  }
};

export default productService;
