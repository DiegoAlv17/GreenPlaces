const About = () => {
    return (
      <div className="m-12 grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <div className=" about-desc content-center">
          <h1 className="m-4 text-3xl font-extrabold text-green-900 text-center sm:text-4xl">Sobre Nosotros</h1>
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
        <div className=" about-img relative">
          <img
            className="w-full h-auto object-cover rounded-lg shadow-lg"
            src="/img/img_0416.jpg"
            alt="rio"
          />
          <div className="absolute top-0 right-0 w-24 h-24 animate-spin-slow">
              <img src="/img/eco.png" alt="" />
          </div>
        </div>
      </div>
    );
  };
  
  export default About;
  