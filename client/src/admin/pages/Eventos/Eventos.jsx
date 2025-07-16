import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Plus, Edit, Trash2, Eye, X } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import eventService from '../../../services/eventService';

const Eventos = () => {
  const [events, setEvents] = useState([]);
  const [attendees, setAttendees] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showAttendees, setShowAttendees] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const { isAuthenticated, userRole } = useAuth();

  const [formData, setFormData] = useState({
    evento_nombre: '',
    lugar: '',
    fecha_evento: '',
    aforo: '',
    url_imagen: ''
  });

  useEffect(() => {
    if (isAuthenticated && userRole === 'administrador') {
      fetchMyEvents();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, userRole]);

  const fetchMyEvents = async () => {
    try {
      setLoading(true);
      const eventsData = await eventService.getMyCreatedEvents();
      setEvents(eventsData);
    } catch (error) {
      setError('Error al cargar eventos: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAttendees = async (eventId) => {
    try {
      const attendeesData = await eventService.getEventAttendees(eventId);
      setAttendees(attendeesData);
      setShowAttendees(true);
    } catch (error) {
      setError('Error al cargar asistentes: ' + error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validaciones
    if (!formData.evento_nombre.trim()) {
      setError('El nombre del evento es requerido');
      return;
    }
    if (!formData.lugar.trim()) {
      setError('El lugar es requerido');
      return;
    }
    if (!formData.fecha_evento) {
      setError('La fecha del evento es requerida');
      return;
    }
    if (!formData.aforo || formData.aforo <= 0) {
      setError('El aforo debe ser un número mayor a 0');
      return;
    }

    // Verificar que la fecha no sea en el pasado
    const eventDate = new Date(formData.fecha_evento);
    const now = new Date();
    if (eventDate <= now) {
      setError('La fecha del evento debe ser en el futuro');
      return;
    }

    try {
      setSubmitting(true);
      
      const eventData = {
        ...formData,
        aforo: parseInt(formData.aforo)
      };

      if (editingEvent) {
        await eventService.updateEvent(editingEvent.evento_id, eventData);
        setSuccess('Evento actualizado exitosamente');
      } else {
        await eventService.createEvent(eventData);
        setSuccess('Evento creado exitosamente');
      }

      // Resetear formulario y recargar eventos
      resetForm();
      await fetchMyEvents();
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      evento_nombre: event.evento_nombre,
      lugar: event.lugar,
      fecha_evento: new Date(event.fecha_evento).toISOString().slice(0, 16),
      aforo: event.aforo.toString(),
      url_imagen: event.url_imagen || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (eventId, eventName) => {
    const confirmed = window.confirm(
      `¿Estás seguro de que quieres eliminar el evento "${eventName}"?\n\nEsta acción no se puede deshacer y se cancelarán todas las inscripciones.`
    );
    
    if (!confirmed) return;

    try {
      await eventService.deleteEvent(eventId);
      setSuccess('Evento eliminado exitosamente');
      await fetchMyEvents();
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      evento_nombre: '',
      lugar: '',
      fecha_evento: '',
      aforo: '',
      url_imagen: ''
    });
    setEditingEvent(null);
    setShowForm(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
            <Calendar className="h-12 w-12 mx-auto text-gray-400" />
            <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
              Administración de Eventos
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
            <p className="mt-4 text-gray-600">Cargando eventos...</p>
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
          <Calendar className="h-12 w-12 mx-auto text-green-600" />
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
            Administración de Eventos
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Gestiona los eventos que has creado
          </p>
        </div>

        {/* Botón crear evento */}
        <div className="mb-8 text-center">
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Crear Nuevo Evento
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

        {/* Formulario de evento */}
        {showForm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">
                  {editingEvent ? 'Editar Evento' : 'Crear Nuevo Evento'}
                </h3>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre del Evento *
                  </label>
                  <input
                    type="text"
                    name="evento_nombre"
                    value={formData.evento_nombre}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="Ej: Feria Ecológica"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lugar *
                  </label>
                  <input
                    type="text"
                    name="lugar"
                    value={formData.lugar}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="Ej: Parque Central"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha y Hora *
                  </label>
                  <input
                    type="datetime-local"
                    name="fecha_evento"
                    value={formData.fecha_evento}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Aforo (Cantidad máxima de personas) *
                  </label>
                  <input
                    type="number"
                    name="aforo"
                    value={formData.aforo}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="Ej: 100"
                    min="1"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL de la Imagen (opcional)
                  </label>
                  <input
                    type="url"
                    name="url_imagen"
                    value={formData.url_imagen}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
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
                    {submitting ? 'Guardando...' : (editingEvent ? 'Actualizar' : 'Crear')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal de asistentes */}
        {showAttendees && attendees && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-2/3 shadow-lg rounded-md bg-white">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Asistentes - {attendees.evento.evento_nombre}
                </h3>
                <button
                  onClick={() => setShowAttendees(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Inscritos:</span>
                    <div className="text-lg font-semibold text-green-600">
                      {attendees.evento.asistentes_inscritos}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium">Aforo:</span>
                    <div className="text-lg font-semibold">
                      {attendees.evento.aforo}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium">Disponibles:</span>
                    <div className="text-lg font-semibold text-blue-600">
                      {attendees.evento.cupos_disponibles}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium">% Ocupación:</span>
                    <div className="text-lg font-semibold">
                      {Math.round((attendees.evento.asistentes_inscritos / attendees.evento.aforo) * 100)}%
                    </div>
                  </div>
                </div>
              </div>

              {attendees.asistentes.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No hay asistentes inscritos en este evento
                </div>
              ) : (
                <div className="max-h-96 overflow-y-auto">
                  <div className="space-y-3">
                    {attendees.asistentes.map((attendee, index) => (
                      <div key={attendee.evento_asistente_id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">
                            {attendee.cliente.nombre} {attendee.cliente.apellido}
                          </div>
                          <div className="text-sm text-gray-600">
                            {attendee.cliente.email}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Lista de eventos */}
        {events.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No tienes eventos creados
            </h3>
            <p className="text-gray-600 mb-6">
              Crea tu primer evento para comenzar a organizar actividades
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div key={event.evento_id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 relative">
                  {event.url_imagen ? (
                    <img
                      className="h-full w-full object-cover"
                      src={event.url_imagen}
                      alt={event.evento_nombre}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className={`h-full w-full ${event.url_imagen ? 'hidden' : 'flex'} items-center justify-center bg-gradient-to-r from-green-400 to-blue-500`}>
                    <span className="text-white text-4xl">🌱</span>
                  </div>
                  
                  {/* Indicador de estado */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      event.cupos_disponibles > 10 
                        ? 'bg-green-500 text-white' 
                        : event.cupos_disponibles > 0 
                          ? 'bg-yellow-500 text-white' 
                          : 'bg-red-500 text-white'
                    }`}>
                      {event.asistentes_inscritos}/{event.aforo}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {event.evento_nombre}
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600 text-sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatDate(event.fecha_evento)}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.lugar}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Users className="h-4 w-4 mr-2" />
                      {event.asistentes_inscritos} inscritos de {event.aforo}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => fetchAttendees(event.evento_id)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm font-medium transition-colors"
                    >
                      <Eye className="h-4 w-4 inline mr-1" />
                      Ver asistentes
                    </button>
                    <button
                      onClick={() => handleEdit(event)}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-3 rounded text-sm font-medium transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(event.evento_id, event.evento_nombre)}
                      className="bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded text-sm font-medium transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Eventos;


