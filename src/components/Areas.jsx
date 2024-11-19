import { Map, TreePine } from 'lucide-react';

const Areas = () =>{
    const areas = [
        {
          name: "Parque Nacional del Manu",
          region: "Madre de Dios",
          type: "Reserva Natural",
          description: "Una de las áreas protegidas más importantes del Perú, hogar de una increíble biodiversidad.",
          imageUrl: "/img/parque-nacional-manu.jpg"
        },
        {
          name: "Bosque de Protección Alto Mayo",
          region: "San Martín",
          type: "Bosque Protegido",
          description: "Importante área de conservación que protege la cuenca del río Mayo.",
          imageUrl: "/img/bosquealtomayo.jpg"
        },
        {
          name: "Pantanos de Villa",
          region: "Lima",
          type: "Refugio de Vida Silvestre",
          description: "Humedal costero que alberga diversas especies de aves migratorias.",
          imageUrl: "/img/pantanovilla.jpg"
        }
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
                <div key={area.name} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                  <div className="flex-shrink-0">
                    <img className="h-48 w-full object-cover" src={area.imageUrl} alt={area.name} />
                  </div>
                  <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <TreePine className="h-5 w-5 text-green-600" />
                        <p className="ml-2 text-sm text-green-600">{area.type}</p>
                      </div>
                      <h3 className="mt-2 text-xl font-semibold text-gray-900">{area.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">{area.region}</p>
                      <p className="mt-3 text-base text-gray-500">{area.description}</p>
                    </div>
                    <div className="mt-6">
                      <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-500 transition-colors">
                        Ver detalles
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
}

export default Areas;