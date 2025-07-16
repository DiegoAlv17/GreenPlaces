import React, { useState, useEffect } from 'react';
import { ShoppingCart, Eye, Search, Filter, Calendar } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import ventaService from '../../../services/ventaService';

const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedVenta, setSelectedVenta] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const { currentUser, userRole, isAuthenticated } = useAuth();

  // Debug: mostrar información de autenticación
  console.log('Admin Ventas - Auth info:', { currentUser, userRole, isAuthenticated });

  useEffect(() => {
    if (isAuthenticated && userRole === 'administrador') {
      fetchVentas();
    } else {
      console.log('Admin Ventas - User not authenticated or not admin:', { isAuthenticated, userRole });
      setError('No tienes permisos para ver las ventas');
      setLoading(false);
    }
  }, [isAuthenticated, userRole]);

  const fetchVentas = async () => {
    try {
      setLoading(true);
      console.log('Admin Ventas - Fetching ventas for admin user:', currentUser);
      
      // Test: Intentar obtener productos primero (para verificar que el token funciona)
      try {
        const testResponse = await fetch('http://20.197.241.231:3000/api/productos', {
          credentials: 'include'
        });
        console.log('Test productos endpoint status:', testResponse.status);
      } catch (testError) {
        console.log('Test productos endpoint error:', testError);
      }
      
      const data = await ventaService.getAllVentas();
      console.log('Admin Ventas - Fetched ventas:', data);
      setVentas(data);
    } catch (error) {
      setError('Error al cargar ventas: ' + error.message);
      console.error('Admin Ventas - Error fetching ventas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetail = async (ventaId) => {
    try {
      const detail = await ventaService.getVentaDetail(ventaId);
      setSelectedVenta(detail);
      setShowDetail(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-PE', {
      year: 'numeric',
      month: 'short',
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

  // Filtrar ventas
  const filteredVentas = ventas.filter(venta => {
    const matchesSearch = venta.cliente?.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         venta.cliente?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         venta.venta_id.toString().includes(searchTerm);
    const matchesStatus = filterStatus === '' || venta.estado === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Gestión de Ventas</h2>
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-6 w-6 text-green-600" />
          <span className="text-lg font-semibold text-green-600">
            {ventas.length} ventas totales
          </span>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Filtros */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar por cliente, email o ID de venta..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="">Todos los estados</option>
              <option value="Completada">Completada</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Cancelada">Cancelada</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-green-700 text-white">
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Cliente</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Fecha Venta</th>
              <th className="px-4 py-3 text-left">Fecha Envío</th>
              <th className="px-4 py-3 text-left">Total</th>
              <th className="px-4 py-3 text-left">Estado</th>
              <th className="px-4 py-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredVentas.map((venta) => (
              <tr key={venta.venta_id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">#{venta.venta_id}</td>
                <td className="px-4 py-3">
                  {venta.cliente?.nombre} {venta.cliente?.apellido}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {venta.cliente?.email}
                </td>
                <td className="px-4 py-3 text-sm">
                  {formatDate(venta.fecha_venta)}
                </td>
                <td className="px-4 py-3 text-sm">
                  {formatDate(venta.fecha_envio)}
                </td>
                <td className="px-4 py-3 font-semibold">
                  S/ {venta.monto_total.toFixed(2)}
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(venta.estado)}`}>
                    {venta.estado}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleViewDetail(venta.venta_id)}
                    className="text-blue-600 hover:text-blue-800 p-1"
                    title="Ver detalle"
                  >
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredVentas.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            {searchTerm || filterStatus ? 'No se encontraron ventas con los filtros aplicados' : 'No hay ventas registradas'}
          </div>
        )}
      </div>

      {/* Modal de detalle */}
      {showDetail && selectedVenta && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Detalle de Venta #{selectedVenta.venta_id}</h3>
              <button
                onClick={() => setShowDetail(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Información de la venta */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">Información del Cliente</h4>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Nombre:</span> {selectedVenta.cliente?.nombre} {selectedVenta.cliente?.apellido}</div>
                  <div><span className="font-medium">Email:</span> {selectedVenta.cliente?.email}</div>
                  <div><span className="font-medium">ID Cliente:</span> {selectedVenta.cliente_id}</div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">Información de la Venta</h4>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Estado:</span>
                    <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedVenta.estado)}`}>
                      {selectedVenta.estado}
                    </span>
                  </div>
                  <div><span className="font-medium">Fecha de venta:</span> {formatDate(selectedVenta.fecha_venta)}</div>
                  <div><span className="font-medium">Fecha de envío:</span> {formatDate(selectedVenta.fecha_envio)}</div>
                  <div><span className="font-medium">Total:</span> <span className="text-lg font-bold">S/ {selectedVenta.monto_total.toFixed(2)}</span></div>
                </div>
              </div>
            </div>

            {/* Productos */}
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-3">Productos ({selectedVenta.venta_detalle?.length || 0})</h4>
              <div className="space-y-3">
                {selectedVenta.venta_detalle?.map((item) => (
                  <div key={item.venta_detalle_id} className="flex items-center gap-4 p-3 border rounded-lg">
                    <img
                      src={item.producto.url_imagen}
                      alt={item.producto.producto_nombre}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h5 className="font-medium">{item.producto.producto_nombre}</h5>
                      <p className="text-sm text-gray-600">{item.producto.descripcion}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Cantidad: {item.cantidad}</div>
                      <div className="text-sm text-gray-600">Precio unit: S/ {item.producto.precio}</div>
                      <div className="font-semibold">Subtotal: S/ {item.sub_total.toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ventas;
