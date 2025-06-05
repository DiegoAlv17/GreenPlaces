const Hero = () => {
    return (
        <div id="inicio" className="relative bg-black w-screen h-screen">
      <div className="absolute inset-0 w-screen h-screen">
        <video
          src="/video/fondo.mp4"
          className="w-full h-full object-cover opacity-50"
          autoPlay
          loop
          muted
        />
      </div>
      <div className="relative flex items-center justify-center w-full h-full z-10">
        <div className="max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
          <div className="w-[65%] h-auto m-auto">
            <img src="/logo2.png" className="w-full h-auto" alt="logo" />
          </div> 
          <a href=""></a>
          <h1 className="text-4xl font-extrabold tracking-tight text-lime-400 text-opacity-80 sm:text-5xl md:text-6xl">
            Bienvenido a <span className="text-white">Green Places</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-white">
            Promoviendo el cuidado y la conservación de nuestras áreas verdes
            para un Perú más sostenible.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <a
              href="#educacion"
              className="px-8 py-3 border border-white text-base font-medium rounded-md text-white bg-lime-700 hover:bg-green-800 md:text-lg transition duration-500"
            >
              Aprende con nosotros
            </a>
            <a
              href="#eventos"
              className="px-8 py-3 border border-white text-base font-medium rounded-md text-white bg-black bg-opacity-30 hover:backdrop-blur-lg md:text-lg transition duration-500"
            >
              Únete a nuestros eventos
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Hero;