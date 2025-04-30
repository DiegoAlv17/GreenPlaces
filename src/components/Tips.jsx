import { Lightbulb, Recycle, Droplets, Home, Leaf, X } from "lucide-react";
import React, { useState } from 'react';


const Tips = () => {

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
      </div>
    </section>
  );
};

export default Tips;
