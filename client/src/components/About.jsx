import { useState } from "react";

const About = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (event) => {
    if (!isDragging) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className="m-12 grid gap-6 md:grid-cols-1 lg:grid-cols-2">

      <div className="about-desc content-center">
        <h1 className="m-4 text-3xl font-extrabold text-green-900 text-center sm:text-4xl">
          Sobre Nosotros
        </h1>
        <p className="text-gray-700">
          En Green Places, creemos en la importancia de preservar y cuidar las
          áreas verdes que enriquecen nuestro país. Nuestra misión es fomentar
          una cultura de respeto y protección hacia la naturaleza peruana, desde
          sus majestuosos bosques amazónicos hasta los parques urbanos que
          brindan espacios de recreación y vida a nuestras ciudades. A través de
          información, campañas educativas y actividades comunitarias, buscamos
          crear conciencia sobre el valor ecológico y social de los espacios
          naturales, promoviendo su conservación y manejo sostenible. En Green Places,
          encontrarás recursos, consejos y formas de participar para que juntos
          podamos garantizar un Perú más verde, saludable y sostenible para las
          futuras generaciones.
        </p>
      </div>

      <div
        className="about-img relative w-full max-w-full aspect-[4/3] mx-auto overflow-hidden select-none cursor-ew-resize rounded-lg shadow-lg"
        onMouseMove={handleMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <img
          src="/img/img_0415.jpg"
          alt="Antes"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />


        <div
          className="absolute top-0 left-0 w-full h-full overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src="/img/img_0416.jpg"
            alt="Después"
            className="w-full h-full object-cover"
          />
        </div>


        <div
          className="absolute top-0 bottom-0 w-1 bg-white z-10"
          style={{ left: `calc(${sliderPosition}% - 1px)` }}
        >
          <div className="bg-white absolute rounded-full h-4 w-4 -left-1 top-[calc(50%-8px)]"></div>
        </div>

        <div className="absolute top-2 right-2 w-16 h-16 animate-spin-slow z-20">
          <img src="/img/eco.png" alt="Eco icono" />
        </div>
      </div>
    </div>
  );
};

export default About;
