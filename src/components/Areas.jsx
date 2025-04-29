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
};

export default Areas;

