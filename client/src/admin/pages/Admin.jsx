import React, { useState } from 'react';
import { Package, Calendar, ShoppingCart, LogOut, Leaf, Users } from 'lucide-react';
import Productos from './Productos/Productos';
import Eventos from './Eventos/Eventos';
import Ventas from './Ventas/Ventas';
import Administradores from './Administradores/Administradores';
import { useAuth } from '../../context/AuthContext';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('productos');
  const { logout } = useAuth();

  const renderContent = () => {
    switch (activeTab) {
      case 'productos':
        return <Productos />;
      case 'eventos':
        return <Eventos />;
      case 'ventas':
        return <Ventas />;
      case 'administradores':
        return <Administradores />;
      default:
        return <Productos />;
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      // El redireccionamiento se maneja en el contexto de autenticación
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="bg-green-700 text-white w-64 p-4 flex flex-col">
        <div className="flex items-center gap-2 mb-6">
          <img src="/logo2.png" alt="GreenPlaces Logo" className="h-8 w-8" />
          <span className="font-bold text-xl">GreenPlaces</span>
        </div>
        <nav className="space-y-4 flex-grow">
          <button 
            onClick={() => setActiveTab('productos')} 
            className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-md ${activeTab === 'productos' ? 'bg-green-600' : 'hover:bg-green-600'}`}
          >
            <Package size={18} />
            Productos
          </button>
          <button 
            onClick={() => setActiveTab('eventos')}
            className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-md ${activeTab === 'eventos' ? 'bg-green-600' : 'hover:bg-green-600'}`}
          >
            <Calendar size={18} />
            Eventos
          </button>
          <button 
            onClick={() => setActiveTab('ventas')}
            className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-md ${activeTab === 'ventas' ? 'bg-green-600' : 'hover:bg-green-600'}`}
          >
            <ShoppingCart size={18} />
            Ventas
          </button>
          <button 
            onClick={() => setActiveTab('administradores')}
            className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-md ${activeTab === 'administradores' ? 'bg-green-600' : 'hover:bg-green-600'}`}
          >
            <Users size={18} />
            Administradores
          </button>
        </nav>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 w-full text-left hover:bg-red-600 px-3 py-2 rounded-md mt-auto"
        >
          <LogOut size={18} />
          Cerrar sesión
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default Admin;
