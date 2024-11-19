import { BookOpen, Video, FileText } from "lucide-react";

const Education = () => {
  const content = [
    {
      title: "Biodiversidad Peruana",
      type: "Artículo",
      icon: <FileText className="h-6 w-6" />,
      description:
        "Descubre la rica diversidad de flora y fauna en nuestros ecosistemas.",
      imageUrl:
        "/img/biodiversidad.jpg",
    },
    {
      title: "Técnicas de Reforestación",
      type: "Video",
      icon: <Video className="h-6 w-6" />,
      description:
        "Aprende métodos efectivos para reforestar áreas degradadas.",
      imageUrl:
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80",
    },
    {
      title: "Guía de Compostaje",
      type: "Artículo",
      icon: <FileText className="h-6 w-6" />,
      description: "Manual paso a paso para crear tu propio compost en casa.",
      imageUrl:
        "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?auto=format&fit=crop&q=80",
    },
  ];

  return (
    <section id="educacion" className="educacion py-16 bg-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <BookOpen className="h-12 w-12 mx-auto text-green-600" />
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Contenido Educativo
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Recursos y materiales para aprender sobre conservación y
            sostenibilidad
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {content.map((item) => (
            <div
              key={item.title}
              className="flex flex-col overflow-hidden rounded-lg shadow-lg"
            >
              <div className="flex-shrink-0">
                <img
                  className="h-48 w-full object-cover"
                  src={item.imageUrl}
                  alt={item.title}
                />
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <div className="flex items-center text-sm text-green-600">
                    {item.icon}
                    <span className="ml-2">{item.type}</span>
                  </div>
                  <a href="#" className="block mt-2">
                    <p className="text-xl font-semibold text-gray-900">
                      {item.title}
                    </p>
                    <p className="mt-3 text-base text-gray-500">
                      {item.description}
                    </p>
                  </a>
                </div>
                <div className="mt-6">
                  <a
                    href="#"
                    className="text-base font-semibold text-green-600 hover:text-green-500"
                  >
                    Leer más →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
