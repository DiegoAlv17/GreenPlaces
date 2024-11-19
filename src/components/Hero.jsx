import { TreePine } from "lucide-react";

const Hero = () => {
  return (
    <div id="inicio" className="relative bg-black pt-16">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover opacity-50" 
          src="/img/img_0415.jpg"
          alt="Bosque peruano"
        />
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <div className="text-center">
          <TreePine className="h-16 w-16 mx-auto text-green-100 mb-4" />
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Bienvenido a Green Places
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-green-100">
            Promoviendo el cuidado y la conservación de nuestras áreas verdes
            para un Perú más sostenible.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <a
              href="#educacion"
              className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-500 md:text-lg"
            >
              Aprende con nosotros
            </a>
            <a
              href="#eventos"
              className="px-8 py-3 border border-green-100 text-base font-medium rounded-md text-green-100 hover:bg-green-800 md:text-lg"
            >
              Únete a eventos
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
