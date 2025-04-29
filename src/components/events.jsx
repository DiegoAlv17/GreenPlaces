import { Calendar, MapPin, Users } from "lucide-react";
import { useEffect, useState } from "react";

const events = () => {
  const [volunteers, setVolunteers] = useState({
    oxapampa: 50,
    lima: 100,
    miraflores: 30,
  });

  const events = [
    {
      title: "Reforestación en Oxapampa",
      date: "15 de Mayo, 2024",
      location: "Oxapampa, Pasco",
      participants: volunteers.oxapampa,
      imageUrl:
        "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80",
      id: "oxapampa",
    },
    {
      title: "Limpieza de Playa Costa Verde",
      date: "22 de Mayo, 2024",
      location: "Lima",
      participants: volunteers.lima,
      imageUrl:
        "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&q=80",
      id: "lima",
    },
    {
      title: "Taller de Agricultura Urbana",
      date: "1 de Junio, 2024",
      location: "Miraflores, Lima",
      participants: volunteers.miraflores,
      imageUrl:
        "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80",
      id: "miraflores",
    },
  ];

  const handleInscription = (location, participants) => {
    setVolunteers({
      ...volunteers,
      [location]: participants + 1,
    });
  };

  useEffect(() => {
    setVolunteers(volunteers);
  }, []);

  return (
    <section id="eventos" className="eventos py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Calendar className="h-12 w-12 mx-auto text-green-600" />
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Próximos Eventos
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Únete a nuestras actividades de conservación y educación ambiental
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event.title}
              className="flex flex-col rounded-lg shadow-lg overflow-hidden"
            >
              <div className="flex-shrink-0">
                <img
                  className="h-48 w-full object-cover"
                  src={event.imageUrl}
                  alt={event.title}
                />
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {event.title}
                  </h3>
                  <div className="mt-4 flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-2" />
                    {event.date}
                  </div>
                  <div className="mt-2 flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2" />
                    {event.location}
                  </div>
                  <div className="mt-2 flex items-center text-gray-600">
                    <Users className="h-5 w-5 mr-2" />
                    {event.participants} voluntarios
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-500 transition-colors"
                    onClick={() =>
                      handleInscription(event.id, event.participants)
                    }
                  >
                    Inscribirse
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default events;
