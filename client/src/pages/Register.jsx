import React, { useState } from 'react';

export default function Register() {
  const [form, setForm] = useState({ nombre: '', apellido: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de registro
    if (!form.nombre || !form.apellido || !form.email || !form.password) {
      setError('Completa todos los campos');
      return;
    }
    setError('');
    alert('Registro simulado');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-amber-50">
      <div className="flex flex-col md:flex-row w-full max-w-3xl md:h-[500px] shadow-md rounded-2xl overflow-hidden bg-white">
        <div className="hidden md:flex w-1/2 h-full">
          <img
            src="https://caritas.org.pe/wp-content/uploads/2022/09/peruyvenezuela.png"
            alt="Register visual"
            className="object-cover w-full h-full"
          />
        </div>
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-center p-8 h-full">
          <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Registro</h2>
          {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}
          <div className="mb-4">
            <label className="block text-green-700 mb-1">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-green-700 mb-1">Apellido</label>
            <input
              type="text"
              name="apellido"
              value={form.apellido}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-green-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-green-700 mb-1">Contraseña</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-500 transition-colors font-semibold"
          >
            Registrarse
          </button>
          <div className="mt-4 text-center">
            <a href="/login" className="text-green-700 hover:underline text-sm">¿Ya tienes cuenta? Inicia sesión</a>
          </div>
        </form>
      </div>
    </div>
  );
}
