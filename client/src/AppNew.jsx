import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Admin from './admin/pages/Admin';
import Productos from './admin/pages/Productos/Productos';
import Eventos from './admin/pages/Eventos/Eventos';
import Ventas from './admin/pages/Ventas/Ventas';
import Login from './pages/Login';
import Register from './pages/Register';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import About from './components/About';
import Areas from './components/Areas';
import Education from './components/Education';
import Events from './components/Events';
import Tips from './components/Tips';

// Componente contenedor para manejar la lógica de mostrar/ocultar Navbar y Footer
function AppLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  return (
    <>
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={
          <div>
            <Hero />
            <About />
            <Education />
            <Areas />
            <Events />
            <Tips />
          </div>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </Router>
  );
}

export default App;
