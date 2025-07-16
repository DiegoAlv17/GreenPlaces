import React from 'react';

const Eventos = () => {
  return (
    <div className="p-6 bg-gray-100 h-screen">
      <h2 className="text-2xl font-bold mb-4">Eventos</h2>
      <table className="w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-green-700 text-white">
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Lugar</th>
            <th className="px-4 py-2">Fecha</th>
            <th className="px-4 py-2">Aforo</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">Nombre</td>
            <td className="border px-4 py-2">Lugar</td>
            <td className="border px-4 py-2">Fecha del evento</td>
            <td className="border px-4 py-2">Aforo</td>
            <td className="border px-4 py-2">
              <button className="text-blue-500 hover:underline mr-2">Agregar</button>
              <button className="text-yellow-500 hover:underline mr-2">Editar</button>
              <button className="text-red-500 hover:underline">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Eventos;
