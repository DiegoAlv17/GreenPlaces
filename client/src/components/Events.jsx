import { Calendar, MapPin, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import eventService from "../services/eventService";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { isAuthenticated, userRole, currentUser } = useAuth();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await eventService.getAllEvents();
      setEvents(data);
    } catch (error) {
      setError('Error al cargar eventos: ' + error.message);
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (eventId, eventName) => {
    if (!isAuthenticated) {
      setError('Debes iniciar sesión para inscribirte a eventos');
      return;
    }

    if (userRole !== 'cliente') {
      setError('Solo los clientes pueden inscribirse a eventos');
      return;
    }

    const confirmed = window.confirm(`¿Estás seguro de que quieres inscribirte al evento "${eventName}"?`);
    if (!confirmed) return;

    try {
      setEnrolling(eventId);
      await eventService.enrollInEvent(eventId);
      setSuccess(`Te has inscrito exitosamente al evento "${eventName}"`);
      // Recargar eventos para actualizar cupos
      await fetchEvents();
      
      // Limpiar mensaje después de 3 segundos
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.message);
    } finally {
      setEnrolling(null);
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

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  if (loading) {
    return (
      <section id="eventos" className="eventos py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <p className="ml-4 text-gray-600">Cargando eventos...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="eventos" className="eventos py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Calendar className="h-12 w-12 mx-auto text-green-600" />
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Eventos Ecológicos
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Únete a nuestras actividades de conservación y educación ambiental. ¡No te lo pierdas!
          </p>
        </div>

        {/* Mensajes de éxito/error */}
        {(error || success) && (
          <div className="mt-8 max-w-4xl mx-auto">
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

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event.evento_id}
              className="flex flex-col rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex-shrink-0 relative">
                {event.url_imagen ? (
                  <img
                    className="h-48 w-full object-cover"
                    src={event.url_imagen}
                    alt={event.evento_nombre}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                
                {/* Fallback cuando no hay imagen o falla la carga */}
                <div className={`h-48 w-full ${event.url_imagen ? 'hidden' : 'flex'} items-center justify-center bg-gradient-to-r from-green-400 to-blue-500`}>
                  <span className="text-white text-4xl">🌱</span>
                </div>

                {/* Indicador de cupos */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    event.cupos_disponibles > 10 
                      ? 'bg-green-500 text-white' 
                      : event.cupos_disponibles > 0 
                        ? 'bg-yellow-500 text-white' 
                        : 'bg-red-500 text-white'
                  }`}>
                    {event.cupos_disponibles > 0 
                      ? `${event.cupos_disponibles} cupos` 
                      : 'Completo'
                    }
                  </span>
                </div>
              </div>
              
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {event.evento_nombre}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-5 w-5 mr-2" />
                      <span className="text-sm">{formatDate(event.fecha_evento)}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-5 w-5 mr-2" />
                      <span className="text-sm">{event.lugar}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="h-5 w-5 mr-2" />
                      <span className="text-sm">
                        {event.asistentes_inscritos} de {event.aforo} inscritos
                      </span>
                    </div>
                    {event.administrador && (
                      <div className="flex items-center text-gray-600">
                        <span className="mr-2">👤</span>
                        <span className="text-sm">
                          Organizado por {event.administrador.nombre} {event.administrador.apellido}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-6">
                  {!isAuthenticated ? (
                    <button
                      onClick={() => setError('Debes iniciar sesión para inscribirte')}
                      className="w-full bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500 transition-colors font-semibold"
                    >
                      Iniciar sesión para inscribirse
                    </button>
                  ) : userRole !== 'cliente' ? (
                    <div className="text-center text-gray-500 text-sm py-2">
                      Solo los clientes pueden inscribirse
                    </div>
                  ) : event.cupos_disponibles === 0 ? (
                    <button
                      disabled
                      className="w-full bg-gray-400 text-white py-2 px-4 rounded-md cursor-not-allowed font-semibold"
                    >
                      Evento completo
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEnroll(event.evento_id, event.evento_nombre)}
                      disabled={enrolling === event.evento_id}
                      className={`w-full py-2 px-4 rounded-md font-semibold transition-colors ${
                        enrolling === event.evento_id
                          ? 'bg-gray-400 text-white cursor-not-allowed'
                          : 'bg-green-600 hover:bg-green-700 text-white'
                      }`}
                    >
                      {enrolling === event.evento_id ? 'Inscribiendo...' : 'Inscribirse'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {events.length === 0 && !error && (
          <div className="text-center py-8 text-gray-500">
            No hay eventos disponibles en este momento
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;
