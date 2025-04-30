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
    
    try {
      // Reemplaza estos valores con los tuyos de EmailJS
      const result = await emailjs.sendForm(
        'service_yiuv0pq', 
        'template_1rfr537',
        e.target,
        'RNhz3FW21XNubLkPp'
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

  const tips = [
    {
      icon: <Recycle className="h-8 w-8" />,
      title: "Reciclaje en Casa",
      description:
        "Aprende a separar correctamente tus residuos y crear un sistema de reciclaje efectivo en tu hogar.",
    },
    {
      icon: <Droplets className="h-8 w-8" />,
      title: "Ahorro de Agua",
      description:
        "Implementa técnicas de riego eficiente y recolección de agua de lluvia para tus plantas.",
    },
    {
      icon: <Home className="h-8 w-8" />,
      title: "Jardín Urbano",
      description:
        "Crea tu propio huerto en casa, incluso en espacios pequeños, usando técnicas de cultivo vertical.",
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: "Compostaje",
      description:
        "Convierte tus residuos orgánicos en abono natural para tus plantas y reduce tu huella de carbono.",
    },
  ];

  return (
    <section id="consejos" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Lightbulb className="h-12 w-12 mx-auto text-green-600" />
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Consejos Prácticos
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Pequeñas acciones que generan un gran impacto en nuestro medio
            ambiente
          </p>
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
                <h3 className="text-lg font-medium text-gray-900 text-center mb-4">
                  {tip.title}
                </h3>
                <p className="text-gray-500 text-center">{tip.description}</p>
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
