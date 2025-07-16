import React, { useState, useEffect } from 'react';
import { ShoppingBag, Calendar, MapPin, Package, Eye } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ventaService from '../services/ventaService';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const { currentUser, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Debug: mostrar información de autenticación
  console.log('OrderHistory - Auth info:', { currentUser, isAuthenticated, authLoading });

  useEffect(() => {
    // Esperar a que termine la carga del contexto de autenticación
    if (authLoading) {
      return;
    }

    if (!isAuthenticated || !currentUser) {
      console.log('OrderHistory - Redirecting to login - not authenticated');
      navigate('/login');
      return;
    }
    
    fetchOrders();
  }, [isAuthenticated, currentUser, authLoading, navigate]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      console.log('Fetching orders for user:', currentUser);
      const data = await ventaService.getClientVentas();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetail = async (orderId) => {
    try {
      const detail = await ventaService.getClientVentaDetail(orderId);
      setSelectedOrder(detail);
      setShowDetail(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-PE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completada':
        return 'bg-green-100 text-green-800';
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelada':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <ShoppingBag className="h-8 w-8 text-green-600" />
            Mi Historial de Compras
          </h1>
          <p className="mt-2 text-gray-600">Revisa todas tus compras y su estado</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="h-24 w-24 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tienes compras aún</h3>
            <p className="text-gray-500 mb-4">¡Explora nuestra tienda y realiza tu primera compra!</p>
            <button
              onClick={() => navigate('/shop')}
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-500 transition-colors"
            >
              Ir a la tienda
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.venta_id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Pedido #{order.venta_id}
                    </h3>
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center text-gray-600 text-sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        Realizado: {formatDate(order.fecha_venta)}
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <MapPin className="h-4 w-4 mr-2" />
                        Envío: {formatDate(order.fecha_envio)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.estado)}`}
                    >
                      {order.estado}
                    </span>
                    <div className="mt-2 text-lg font-bold text-gray-900">
                      S/ {order.monto_total.toFixed(2)}
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600 text-sm">
                      <Package className="h-4 w-4 mr-2" />
                      {order.venta_detalle?.length || 0} producto(s)
                    </div>
                    <button
                      onClick={() => handleViewDetail(order.venta_id)}
                      className="text-green-600 hover:text-green-800 flex items-center gap-1 text-sm font-medium"
                    >
                      <Eye className="h-4 w-4" />
                      Ver detalles
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal de detalle */}
        {showDetail && selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Detalle del Pedido #{selectedOrder.venta_id}</h3>
                <button
                  onClick={() => setShowDetail(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="mb-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Estado:</span>
                  <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.estado)}`}>
                    {selectedOrder.estado}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Total:</span>
                  <span className="ml-2 font-bold">S/ {selectedOrder.monto_total.toFixed(2)}</span>
                </div>
                <div>
                  <span className="font-medium">Fecha de compra:</span>
                  <span className="ml-2">{formatDate(selectedOrder.fecha_venta)}</span>
                </div>
                <div>
                  <span className="font-medium">Fecha de envío:</span>
                  <span className="ml-2">{formatDate(selectedOrder.fecha_envio)}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">Productos:</h4>
                <div className="space-y-3">
                  {selectedOrder.venta_detalle?.map((item) => (
                    <div key={item.venta_detalle_id} className="flex items-center gap-4 p-3 border rounded-lg">
                      <img
                        src={item.producto.url_imagen}
                        alt={item.producto.producto_nombre}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h5 className="font-medium">{item.producto.producto_nombre}</h5>
                        <p className="text-sm text-gray-600">{item.producto.descripcion}</p>
                        <p className="text-sm">
                          Cantidad: {item.cantidad} × S/ {item.producto.precio} = S/ {item.sub_total.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
