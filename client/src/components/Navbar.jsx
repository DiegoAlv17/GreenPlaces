import React from 'react';
import { Leaf, Calendar, BookOpen, Map, Home, Lightbulb, Store,ShoppingCart} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../Redux/cartSlice';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const menuItems = [
    { title: 'Inicio', icon: <Home size={20} />, href: '/' },
    { title: 'Educación', icon: <BookOpen size={20} />, href: '#educacion' },
    { title: 'Eventos', icon: <Calendar size={20} />, href: '#eventos' },
    { title: 'Áreas Verdes', icon: <Map size={20} />, href: '#areas' },
    { title: 'Consejos', icon: <Lightbulb size={20} />, href: '#consejos' },
    { title: 'Shop', icon: <Store size={20} />, href: '/shop' },
  ];

  return (
    <nav className="bg-green-700 fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center gap-2 text-white">
                <Leaf className="h-8 w-8" />
                <span className="font-bold text-xl">GreenPlaces</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {menuItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  className="nav-item text-green-100 hover:bg-green-600 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2"
                >
                  {item.icon}
                  {item.title}
                </Link>
              ))}
              <Link
                to="/login"
                className="nav-item text-green-100 border border-green-200 hover:bg-green-600 px-3 py-2 rounded-md text-sm font-medium ml-2"
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/register"
                className="nav-item text-green-100 border border-green-200 hover:bg-green-600 px-3 py-2 rounded-md text-sm font-medium ml-2"
              >
                Registrarse
              </Link>
              {/* Carrito */}
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative ml-4 text-green-100 hover:text-white"
                aria-label="Ver carrito"
              >
                <ShoppingCart size={24} />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-500 text-xs text-white rounded-full px-2">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-green-100 hover:bg-green-600"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                to={item.href}
                className="nav-item text-green-100 hover:bg-green-600 px-3 py-2 rounded-md text-base font-medium flex items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
            <Link
              to="/login"
              className="block text-green-100 border border-green-200 hover:bg-green-600 px-3 py-2 rounded-md text-base font-medium mt-2"
              onClick={() => setIsOpen(false)}
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/register"
              className="block text-green-100 border border-green-200 hover:bg-green-600 px-3 py-2 rounded-md text-base font-medium mt-2"
              onClick={() => setIsOpen(false)}
            >
              Registrarse
            </Link>
          </div>
        </div>
      )}
     {isCartOpen && (
      <div className="fixed top-20 right-4 bg-white shadow-lg rounded-lg p-4 z-50 w-80">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-lg">Carrito</h3>
          {cart.length > 0 && (
            <button
              onClick={() => dispatch(clearCart())}
              className="text-xs text-red-600 hover:underline"
            >
              Vaciar carrito
            </button>
          )}
        </div>
        {cart.length === 0 ? (
          <p className="text-gray-500">No hay productos en el carrito.</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="flex items-center gap-2 border-b py-2">
                <img src={item.imageUrl} alt={item.name} className="w-10 h-10 rounded" />
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-green-700">S/ {item.price}</p>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-500 hover:text-red-700 text-xs"
                  title="Eliminar"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
       <Link
        to="/cart"
        className="bg-green-600 text-white mt-4 px-4 py-1.5 rounded-md hover:bg-green-500 transition-colors text-sm flex justify-center items-center"
        onClick={() => setIsCartOpen(false)}
      >
        Ir a Carrito
      </Link>
      </div>
    )}
    </nav>
  );
};

export default Navbar;