import { Calendar, MapPin, Users } from "lucide-react";
import { useEffect, useState } from "react";

const Events = () => {

  const currentYear = new Date().getFullYear();

  const [volunteers, setVolunteers] = useState({
    tarapoto: 50,
    iquitos: 100,
    arequipa: 30,
  });

  const events = [
    {
      title: "Campaña de protección del colibrí",
      date: `12 de marzo, ${currentYear}`,
      location: "Tarapoto, San Martín",
      participants: volunteers.tarapoto,
      imageUrl:
        "https://www.portalambiental.com.mx/sites/default/files/media/image/2020/12/colibri.unam__0.jpg",
      id: "tarapoto",
    },
    {
      title: "Festival de vida silvestre",
      date: `27 de abril, ${currentYear}`,
      location: "Iquitos, Loreto",
      participants: volunteers.iquitos,
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkPc7XudTaSySciMPEXPLbTNqud6n7XQ3r4Q&s",
      id: "iquitos",
    },
    {
      title: "Jornada de compostaje comunitario",
      date: `9 de septiembre, ${currentYear}`,
      location: "Arequipa, Cayma",
      participants: volunteers.arequipa,
      imageUrl:
        "https://cdn.www.gob.pe/uploads/document/file/5235173/abue%2001.jpeg.JPG",
      id: "arequipa",
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
            Únete a nuestras actividades de conservación y educación ambiental. ¡No te lo pierdas!
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

export default Events;
