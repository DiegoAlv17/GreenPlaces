import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import eventService from '../services/eventService';

const MyEvents = () => {
  const [enrolledEvents, setEnrolledEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canceling, setCanceling] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { isAuthenticated, userRole, currentUser } = useAuth();

  useEffect(() => {
    if (isAuthenticated && userRole === 'cliente') {
      fetchMyEvents();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, userRole]);

  const fetchMyEvents = async () => {
    try {
      setLoading(true);
      const eventsData = await eventService.getMyEnrollments();
      setEnrolledEvents(eventsData);
    } catch (error) {
      setError('Error al cargar tus eventos: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEnrollment = async (eventId, eventName) => {
    const confirmed = window.confirm(
      `¿Estás seguro de que quieres cancelar tu inscripción al evento "${eventName}"?\n\nEsta acción no se puede deshacer.`
    );
    
    if (!confirmed) return;

    try {
      setCanceling(eventId);
      await eventService.cancelEnrollment(eventId);
      setSuccess(`Has cancelado tu inscripción al evento "${eventName}"`);
      
      // Actualizar la lista de eventos
      await fetchMyEvents();
      
      // Limpiar mensaje después de 3 segundos
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.message);
    } finally {
      setCanceling(null);
    }
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

  const isEventPast = (dateString) => {
    return new Date(dateString) < new Date();
  };

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Calendar className="h-12 w-12 mx-auto text-gray-400" />
            <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
              Mis Eventos
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Debes iniciar sesión para ver tus eventos
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (userRole !== 'cliente') {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Calendar className="h-12 w-12 mx-auto text-gray-400" />
            <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
              Mis Eventos
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Solo los clientes pueden inscribirse a eventos
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando tus eventos...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Calendar className="h-12 w-12 mx-auto text-green-600" />
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
            Mis Eventos
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Eventos en los que estás inscrito
          </p>
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

        {enrolledEvents.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No tienes eventos inscritos
            </h3>
            <p className="text-gray-600 mb-6">
              Explora nuestros eventos disponibles y únete a las actividades que más te interesen
            </p>
            <a
              href="#eventos"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
            >
              Ver eventos disponibles
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {enrolledEvents.map((enrollment) => {
              const event = enrollment.evento;
              const isPast = isEventPast(event.fecha_evento);
              
              return (
                <div
                  key={enrollment.evento_asistente_id}
                  className={`bg-white rounded-lg shadow-md overflow-hidden ${
                    isPast ? 'opacity-75' : ''
                  }`}
                >
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      {event.url_imagen ? (
                        <img
                          className="h-48 w-full object-cover md:h-full"
                          src={event.url_imagen}
                          alt={event.evento_nombre}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextElementSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className={`h-48 md:h-full w-full ${event.url_imagen ? 'hidden' : 'flex'} items-center justify-center bg-gradient-to-r from-green-400 to-blue-500`}>
                        <span className="text-white text-4xl">🌱</span>
                      </div>
                    </div>
                    
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-3">
                            {event.evento_nombre}
                            {isPast && (
                              <span className="ml-2 text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded">
                                Finalizado
                              </span>
                            )}
                          </h3>
                          
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center text-gray-600">
                              <Calendar className="h-5 w-5 mr-2" />
                              <span>{formatDate(event.fecha_evento)}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <MapPin className="h-5 w-5 mr-2" />
                              <span>{event.lugar}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Users className="h-5 w-5 mr-2" />
                              <span>Aforo: {event.aforo} personas</span>
                            </div>
                            {event.administrador && (
                              <div className="flex items-center text-gray-600">
                                <span className="mr-2">👤</span>
                                <span>
                                  Organizado por {event.administrador.nombre} {event.administrador.apellido}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Botón de cancelar inscripción */}
                        {!isPast && (
                          <button
                            onClick={() => handleCancelEnrollment(event.evento_id, event.evento_nombre)}
                            disabled={canceling === event.evento_id}
                            className={`ml-4 px-4 py-2 rounded-md font-medium transition-colors ${
                              canceling === event.evento_id
                                ? 'bg-gray-400 text-white cursor-not-allowed'
                                : 'bg-red-600 hover:bg-red-700 text-white'
                            }`}
                          >
                            {canceling === event.evento_id ? (
                              'Cancelando...'
                            ) : (
                              <>
                                <X className="h-4 w-4 inline mr-1" />
                                Cancelar inscripción
                              </>
                            )}
                          </button>
                        )}
                      </div>
                      
                      <div className="mt-4 text-sm text-gray-500">
                        Inscrito el {new Date(enrollment.created_at || Date.now()).toLocaleDateString('es-ES')}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEvents;
