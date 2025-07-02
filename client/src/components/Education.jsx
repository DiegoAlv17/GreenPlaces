import { BookOpen, FileText, X, Youtube } from "lucide-react";
import { useState } from "react";

const Education = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("");

  const content = [
    {
      title: "Biodiversidad Peruana",
      type: "Video",
      icon: <Youtube className="h-6 w-6" />,
      description:
        "Descubre la rica diversidad de flora y fauna en nuestros ecosistemas.",
      imageUrl: "/img/biodiversidad.jpg",
      readMore: "https://www.youtube.com/shorts/5myxtyIZrZA",
    },
    {
      title: "Técnicas de Reforestación",
      type: "Video",
      icon: <Youtube className="h-6 w-6" />,
      description:
        "Aprende métodos efectivos para reforestar áreas degradadas.",
      imageUrl:
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80",
      readMore: "https://www.youtube.com/watch?v=UC1sHCo3ZBg",
    },
    {
      title: "Guía de Compostaje",
      type: "Artículo",
      icon: <FileText className="h-6 w-6" />,
      description: "Manual paso a paso para crear tu propio compost en casa.",
      imageUrl:
        "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?auto=format&fit=crop&q=80",
      readMore:
        "https://illustrious-narwhal-04efc3.netlify.app/",
    },
  ];

  const handleReadMore = (url) => {
    setRedirectUrl(url);
    setIsModalOpen(true);
  };

  const handleContinue = () => {
    window.open(redirectUrl, "_blank");
    setIsModalOpen(false);
  };

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
            sostenibilidad de la mano de GreenPlaces
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
                  <button
                    onClick={() => handleReadMore(item.readMore)}
                    className="text-base font-semibold text-green-600 hover:text-green-500"
                  >
                    Ver más →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Alerta</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <p className="mb-4">
              Estas a punto de entrar a otro link. ¿Deseas continuar?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleContinue}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Education;
