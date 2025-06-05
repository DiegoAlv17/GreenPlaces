import { Map, TreePine, X } from "lucide-react";
import { useState } from "react";

const Areas = () => {
  const [selectedArea, setSelectedArea] = useState(null);

  const areas = [
    {
      name: "Parque Nacional del Manu",
      region: "Madre de Dios",
      type: "Reserva Natural",
      description:
        "Una de las áreas protegidas más importantes del Perú, hogar de una increíble biodiversidad.",
      imageUrl: "/img/parque-nacional-manu.jpg",
      longDescription:
        "El Parque Nacional del Manu es una de las áreas protegidas más importantes del Perú. Ubicado entre las regiones de Cusco y Madre de Dios, este parque es reconocido mundialmente por su increíble biodiversidad. Alberga una gran variedad de especies de flora y fauna, incluyendo jaguares, tapires, monos y cientos de especies de aves. El parque también es hogar de comunidades indígenas que viven en armonía con la naturaleza.",
    },
    {
      name: "Bosque de Protección Alto Mayo",
      region: "San Martín",
      type: "Bosque Protegido",
      description:
        "Importante área de conservación que protege la cuenca del río Mayo.",
      imageUrl: "/img/bosquealtomayo.jpg",
      longDescription:
        "El Bosque de Protección Alto Mayo es un área de conservación crucial en la región de San Martín. Este bosque protege la cuenca del río Mayo, vital para el suministro de agua de la región. El área es conocida por su rica biodiversidad, incluyendo especies endémicas como el mono tocón. Además de su importancia ecológica, el bosque también juega un papel crucial en la mitigación del cambio climático al actuar como un importante sumidero de carbono.",
    },
    {
      name: "Pantanos de Villa",
      region: "Lima",
      type: "Refugio de Vida Silvestre",
      description:
        "Humedal costero que alberga diversas especies de aves migratorias.",
      imageUrl: "/img/pantanovilla.jpg",
      longDescription:
        "Los Pantanos de Villa son un refugio de vida silvestre ubicado en el corazón de Lima. Este humedal costero es un oasis de biodiversidad en medio de la ciudad, albergando una gran variedad de especies de aves migratorias. Es un sitio importante para la conservación de aves acuáticas y sirve como un pulmón verde para la capital peruana. Los Pantanos de Villa también ofrecen oportunidades educativas y recreativas para los residentes de Lima, permitiéndoles conectar con la naturaleza sin salir de la ciudad.",
    },
  ];
  
  return (
    <section id="areas" className="areas py-16 bg-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Map className="h-12 w-12 mx-auto text-green-600" />
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Áreas Verdes
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Descubre los espacios naturales más importantes del Perú
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {areas.map((area) => (
            <div
              key={area.name}
              className="flex flex-col rounded-lg shadow-lg overflow-hidden"
            >
              <div className="flex-shrink-0">
                <img
                  className="h-48 w-full object-cover"
                  src={area.imageUrl}
                  alt={area.name}
                />
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <div className="flex items-center">
                    <TreePine className="h-5 w-5 text-green-600" />
                    <p className="ml-2 text-sm text-green-600">{area.type}</p>
                  </div>
                  <h3 className="mt-2 text-xl font-semibold text-gray-900">
                    {area.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{area.region}</p>
                  <p className="mt-3 text-base text-gray-500">
                    {area.description}
                  </p>
                </div>
                <div className="mt-6">
                  <button
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-500 transition-colors"
                    onClick={() => setSelectedArea(area)}
                  >
                    Ver detalles
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedArea && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold text-gray-900">
                {selectedArea.name}
              </h3>
              <button
                onClick={() => setSelectedArea(null)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Cerrar detalles"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <img
              src={selectedArea.imageUrl}
              alt={selectedArea.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-gray-600 mb-2">
              <strong>Región:</strong> {selectedArea.region}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Tipo:</strong> {selectedArea.type}
            </p>
            <p className="text-gray-700">{selectedArea.longDescription}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Areas;

