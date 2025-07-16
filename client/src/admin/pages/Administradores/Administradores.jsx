import React, { useState, useEffect } from 'react';
import { Users, Plus, Eye, EyeOff, X, UserPlus } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import adminService from '../../../services/adminService';

const Administradores = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { isAuthenticated, userRole } = useAuth();

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    dni: '',
    email: '',
    contraseña: ''
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (isAuthenticated && userRole === 'administrador') {
      fetchAdmins();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, userRole]);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const adminsData = await adminService.getAllAdmins();
      setAdmins(adminsData);
    } catch (error) {
      setError('Error al cargar administradores: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const errors = {};

    // Validar nombre
    if (!formData.nombre.trim()) {
      errors.nombre = 'El nombre es requerido';
    } else if (formData.nombre.trim().length < 2) {
      errors.nombre = 'El nombre debe tener al menos 2 caracteres';
    }

    // Validar apellido
    if (!formData.apellido.trim()) {
      errors.apellido = 'El apellido es requerido';
    } else if (formData.apellido.trim().length < 2) {
      errors.apellido = 'El apellido debe tener al menos 2 caracteres';
    }

    // Validar teléfono
    const phoneRegex = /^[0-9]{9}$/;
    if (!formData.telefono.trim()) {
      errors.telefono = 'El teléfono es requerido';
    } else if (!phoneRegex.test(formData.telefono.trim())) {
      errors.telefono = 'El teléfono debe tener 9 dígitos';
    }

    // Validar DNI
    const dniRegex = /^[0-9]{8}$/;
    if (!formData.dni.trim()) {
      errors.dni = 'El DNI es requerido';
    } else if (!dniRegex.test(formData.dni.trim())) {
      errors.dni = 'El DNI debe tener el formato 12345678A';
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'El email es requerido';
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'El formato del email no es válido';
    }

    // Validar contraseña
    if (!formData.contraseña) {
      errors.contraseña = 'La contraseña es requerida';
    } else if (formData.contraseña.length < 6) {
      errors.contraseña = 'La contraseña debe tener al menos 6 caracteres';
    }

    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar error del campo específico
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar formulario
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      setSubmitting(true);
      setFormErrors({});
      
      const adminData = {
        ...formData,
        nombre: formData.nombre.trim(),
        apellido: formData.apellido.trim(),
        telefono: formData.telefono.trim(),
        dni: formData.dni.trim().toUpperCase(),
        email: formData.email.trim().toLowerCase()
      };

      await adminService.registerAdmin(adminData);
      setSuccess('Administrador registrado exitosamente');
      
      // Resetear formulario y recargar administradores
      resetForm();
      await fetchAdmins();
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      apellido: '',
      telefono: '',
      dni: '',
      email: '',
      contraseña: ''
    });
    setFormErrors({});
    setShowForm(false);
    setShowPassword(false);
  };

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  if (!isAuthenticated || userRole !== 'administrador') {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Users className="h-12 w-12 mx-auto text-gray-400" />
            <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
              Gestión de Administradores
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Acceso restringido a administradores
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando administradores...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Users className="h-12 w-12 mx-auto text-green-600" />
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
            Gestión de Administradores
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Administra los usuarios con permisos de administrador
          </p>
        </div>

        {/* Botón crear administrador */}
        <div className="mb-8 text-center">
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
          >
            <UserPlus className="h-5 w-5 mr-2" />
            Registrar Nuevo Administrador
          </button>
        </div>

        {/* Mensajes de éxito/error */}
        {(error || success) && (
          <div className="mb-8">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex items-center justify-between">
                <span>{error}</span>
                <button onClick={clearMessages} className="text-red-700 hover:text-red-900 text-xl">
                  ✕
                </button>
              </div>
            )}
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 flex items-center justify-between">
                <span>{success}</span>
                <button onClick={clearMessages} className="text-green-700 hover:text-green-900 text-xl">
                  ✕
                </button>
              </div>
            )}
          </div>
        )}

        {/* Formulario de administrador */}
        {showForm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Registrar Nuevo Administrador
                </h3>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 ${
                        formErrors.nombre ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Juan"
                    />
                    {formErrors.nombre && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.nombre}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Apellido *
                    </label>
                    <input
                      type="text"
                      name="apellido"
                      value={formData.apellido}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 ${
                        formErrors.apellido ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Pérez"
                    />
                    {formErrors.apellido && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.apellido}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 ${
                        formErrors.telefono ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="987654321"
                      maxLength="9"
                    />
                    {formErrors.telefono && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.telefono}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      DNI *
                    </label>
                    <input
                      type="text"
                      name="dni"
                      value={formData.dni}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 ${
                        formErrors.dni ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="12345678A"
                      maxLength="9"
                    />
                    {formErrors.dni && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.dni}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 ${
                      formErrors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="admin@greenplaces.com"
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contraseña *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="contraseña"
                      value={formData.contraseña}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 pr-10 ${
                        formErrors.contraseña ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Mínimo 6 caracteres"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {formErrors.contraseña && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.contraseña}</p>
                  )}
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`px-4 py-2 rounded-md font-medium text-white transition-colors ${
                      submitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                  >
                    {submitting ? 'Registrando...' : 'Registrar Administrador'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tabla de administradores */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Administradores Registrados
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Lista de todos los administradores del sistema
            </p>
          </div>
          
          {admins.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No hay administradores registrados
              </h3>
              <p className="text-gray-600">
                Registra el primer administrador para comenzar
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nombre Completo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Teléfono
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      DNI
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {admins.map((admin) => (
                    <tr key={admin.admin_id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{admin.admin_id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center">
                              <span className="text-sm font-medium text-white">
                                {admin.nombre.charAt(0)}{admin.apellido.charAt(0)}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {admin.nombre} {admin.apellido}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {admin.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {admin.telefono}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {admin.dni}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Administradores;
