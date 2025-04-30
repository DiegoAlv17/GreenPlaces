import { Lightbulb, Recycle, Droplets, Home, Leaf, X } from "lucide-react";
import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const Tips = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [status, setStatus] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('pending');
    
    // Validar campos del formulario
    const formData = new FormData(e.target);
    const name = formData.get('user_name');
    const email = formData.get('user_email');
    const message = formData.get('message');
    
    if (!name || !email || !message) {
      setStatus('incomplete');
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Configuración actualizada de EmailJS
      const result = await emailjs.sendForm(
        'service_green_places', 
        'template_eco_tips',
        e.target,
        'GREEN_PLACES_API_KEY_2025'
      );

      if (result.text === 'OK') {
        setStatus('success');
        e.target.reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Nuevos consejos ecológicos 2025
  const tips = [
    {
      icon: <Recycle className="h-8 w-8" />,
      title: "Economía Circular",
      description:
        "Adopta prácticas de consumo responsable comprando productos de segunda mano y reparando en lugar de reemplazar.",
      category: "consumo",
      difficulty: "media",
    },
    {
      icon: <Droplets className="h-8 w-8" />,
      title: "Captación Pluvial",
      description:
        "Instala sistemas de captación de agua de lluvia para regar jardines y reducir el consumo de agua potable hasta en un 40%.",
      category: "agua",
      difficulty: "alta",
    },
    {
      icon: <Home className="h-8 w-8" />,
      title: "Energía Solar Casera",
      description:
        "Implementa pequeños paneles solares para cargar dispositivos electrónicos y reducir tu dependencia de la red eléctrica.",
      category: "energía",
      difficulty: "alta",
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: "Biodiversidad Urbana",
      description:
        "Crea espacios para polinizadores en tu balcón o jardín con plantas nativas que atraigan abejas y mariposas.",
      category: "biodiversidad",
      difficulty: "baja",
    },
  ];

  return (
    <section id="consejos" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Lightbulb className="h-12 w-12 mx-auto text-green-600" />
          <h2 className="mt-2 text-3xl font-extrabold text-green-800 sm:text-4xl">
            Eco-Consejos 2025
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            Acciones innovadoras para un futuro sostenible en el Perú
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <button className="px-4 py-2 bg-green-100 text-green-800 rounded-full hover:bg-green-200">Todos</button>
            <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full hover:bg-green-100">Agua</button>
            <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full hover:bg-green-100">Energía</button>
            <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full hover:bg-green-100">Consumo</button>
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {tips.map((tip) => (
            <div
              key={tip.title}
              className="relative p-6 bg-white rounded-lg border border-green-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="inline-flex p-2 bg-green-100 rounded-lg text-green-600">
                  {tip.icon}
                </div>
              </div>
              <div className="pt-8">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium text-green-800">
                    {tip.title}
                  </h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${tip.difficulty === 'baja' ? 'bg-green-100 text-green-800' : tip.difficulty === 'media' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                    {tip.difficulty}
                  </span>
                </div>
                <p className="text-gray-600">{tip.description}</p>
                <div className="mt-4 pt-2 border-t border-gray-100">
                  <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">{tip.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
          >
            Ver más consejos
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                Suscríbete para más consejos
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {status === 'success' ? (
              <div className="text-center">
                <p className="text-green-600 font-medium mb-4">
                  ¡Gracias por suscribirte!
                </p>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setStatus('');
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  Cerrar
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Ingrese su nombre
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Correo Electrónico
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="to_email"
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-red-500 text-sm">
                    Hubo un error al enviar el formulario. Por favor, intenta nuevamente.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                >
                  {isSubmitting ? "Enviando..." : "Suscribirse"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Tips;
