import React from "react";

const Welcome = () => {
  return (
    <div className="bg-blue-50 min-h-screen flex flex-col items-center justify-center">
      {/* Sección Principal */}
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-700">
          ¡Bienvenido a TechPlanet!
        </h1>
        <p className="mt-6 text-2xl text-blue-600">
          Encuentra lo último en tecnología, computadoras y accesorios.
        </p>

        {/* Botones de llamada a la acción */}
        <div className="mt-10 space-x-4">
          <a
            href="/shop"
            className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Explorar Tienda
          </a>
          <a
            href="/about"
            className="bg-transparent text-blue-600 border border-blue-600 px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-100 transition duration-300"
          >
            Conócenos
          </a>
        </div>
      </div>

      {/* Imagen o Ilustración */}
      <div className="mt-12">
        <img
          src="https://via.placeholder.com/600x400?text=Bienvenido+a+TechPlanet"
          alt="Bienvenido a TechPlanet"
          className="rounded-lg shadow-lg"
        />
      </div>

      {/* Mensaje o eslogan */}
      <div className="mt-12 text-center">
        <p className="text-lg text-blue-600">
          Tu mejor aliado en tecnología de última generación.
        </p>
        <p className="text-sm text-blue-500 mt-4">
          &copy; 2024 TechPlanet. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
};

export default Welcome;
