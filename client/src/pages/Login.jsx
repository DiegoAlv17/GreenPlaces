import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', contraseña: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.email || !form.contraseña) {
      setError('Completa todos los campos');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await login(form);
      // El redireccionamiento se maneja en el AuthContext según el rol
    } catch (error) {
      setError(error.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-amber-50">
      <div className="flex flex-col md:flex-row w-full max-w-3xl md:h-[500px] shadow-md rounded-2xl overflow-hidden bg-white">
        <div className="hidden md:flex w-1/2 h-full">
          <img
            src="https://bicentenario.gob.pe/portal/2023/03/bd7321e6-8430-48e1-a957-f1138b91ccad-1024x683.jpeg"
            alt="Login visual"
            className="object-cover w-full h-full"
          />
        </div>
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-center p-8 h-full">
          <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Iniciar Sesión</h2>
          {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}
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
              name="contraseña"
              value={form.contraseña}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-500 transition-colors font-semibold"
            disabled={loading}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
          <div className="mt-4 text-center">
            <Link to="/register" className="text-green-700 hover:underline text-sm">¿No tienes cuenta? Regístrate</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
