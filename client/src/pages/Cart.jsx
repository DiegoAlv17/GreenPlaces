import { ShoppingBasket, Calendar } from "lucide-react";
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../context/AuthContext';
import { removeFromCart, incrementQuantity, decrementQuantity, clearCart } from '../Redux/cartSlice';
import ventaService from '../services/ventaService';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const { currentUser, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  
  const [loadingPurchase, setLoadingPurchase] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);
  const [fechaEnvio, setFechaEnvio] = useState('');

  const total = cart.reduce((subtotal, item) => subtotal + parseFloat(item.price) * item.cantidad, 0);

  // Debug: mostrar información de autenticación
  console.log('Cart - Auth info:', { currentUser, isAuthenticated, loading });

  const handleCheckout = () => {
    console.log('handleCheckout - Auth status:', { currentUser, isAuthenticated });
    
    if (!isAuthenticated || !currentUser) {
      console.log('Redirecting to login - not authenticated');
      navigate('/login');
      return;
    }
    setShowCheckout(true);
    // Establecer fecha mínima para envío (mañana)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setFechaEnvio(tomorrow.toISOString().slice(0, 16));
  };

  const handleConfirmPurchase = async () => {
    if (!fechaEnvio) {
      setError('Por favor selecciona una fecha de envío');
      return;
    }

    try {
      setLoadingPurchase(true);
      setError('');
      
      console.log('Attempting to create sale with user:', currentUser);
      
      const ventaData = {
        productos: cart.map(item => ({
          producto_id: item.id,
          cantidad: item.cantidad
        })),
        fecha_envio: new Date(fechaEnvio).toISOString()
      };

      console.log('Venta data:', ventaData);

      await ventaService.createVenta(ventaData);
      
      setSuccess('¡Compra realizada con éxito! Recibirás un correo de confirmación.');
      dispatch(clearCart());
      setShowCheckout(false);
      
      // Redirigir después de 3 segundos
      setTimeout(() => {
        navigate('/');
      }, 3000);
      
    } catch (error) {
      console.error('Error creating sale:', error);
      setError(error.message);
    } finally {
      setLoadingPurchase(false);
    }
  };
  return (
    <section id="carrito" className="py-16 bg-amber-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 mt-10">
          <ShoppingBasket className="h-12 w-12 mx-auto text-green-600" />
          <h2 className="mt-2 text-3xl font-bold text-green-700 sm:text-4xl">
            Mi lista de carrito
          </h2>
          <p className="mt-4 text-lg text-green-700 max-w-xl mx-auto">
            Aquí puedes revisar los productos que has añadido a tu carrito.
          </p>
        </div>

        {/* Mensaje de éxito */}
        {success && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {success}
          </div>
        )}

        {/* Mensaje de error */}
        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="grid grid-cols-12 font-semibold text-green-700 border-b pb-2 mb-2">
                <div className="col-span-6">Producto</div>
                <div className="col-span-2">P. Unit.</div>
                <div className="col-span-2">Cant.</div>
                <div className="col-span-2">Importe</div>
              </div>
              {cart.length === 0 ? (
                <div className="text-gray-500 py-8 text-center">No hay productos en el carrito.</div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="grid grid-cols-12 items-center border-b py-2">
                    <div className="col-span-6 flex items-center gap-2">
                      <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <span>{item.name}</span>
                    </div>
                    <div className="col-span-2">S/ {item.price}</div>
                    <div className="col-span-2 flex items-center gap-2">
                      <button
                        className="px-2 py-1 bg-green-200 rounded hover:bg-green-300"
                        onClick={() => dispatch(decrementQuantity(item.id))}
                        disabled={item.cantidad === 1}
                      >-</button>
                      <span>{item.cantidad}</span>
                      <button
                        className="px-2 py-1 bg-green-200 rounded hover:bg-green-300"
                        onClick={() => dispatch(incrementQuantity(item.id))}
                      >+</button>
                    </div>
                    <div className="col-span-2">
                      S/ {(parseFloat(item.price) * item.cantidad).toFixed(2)}
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="ml-2 text-red-500 hover:text-red-700 text-lg"
                        title="Eliminar"
                      >✕</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          {/* Total */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h5 className="text-xl font-bold mb-2 text-green-700">Total de la Compra</h5>
              <hr className="mb-2"/>
              <div className="flex justify-between mb-1">
                <span>Subtotal:</span>
                <span>S/ {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Envío:</span>
                <span>Gratis</span>
              </div>
              <hr className="my-2"/>
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>S/ {total.toFixed(2)}</span>
              </div>
              <button
                className="w-full mt-6 bg-green-600 text-white py-2 rounded-md hover:bg-green-500 transition-colors"
                disabled={cart.length === 0}
                onClick={handleCheckout}
              >
                Realizar la compra
              </button>
            </div>
          </div>
        </div>

        {/* Modal de Checkout */}
        {showCheckout && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">Confirmar Compra</h3>
              
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Resumen del pedido:</h4>
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm mb-1">
                    <span>{item.name} x{item.cantidad}</span>
                    <span>S/ {(parseFloat(item.price) * item.cantidad).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t mt-2 pt-2 font-bold">
                  Total: S/ {total.toFixed(2)}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Fecha de envío
                </label>
                <input
                  type="datetime-local"
                  value={fechaEnvio}
                  onChange={(e) => setFechaEnvio(e.target.value)}
                  min={new Date(Date.now() + 86400000).toISOString().slice(0, 16)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleConfirmPurchase}
                  disabled={loadingPurchase}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-500 transition-colors disabled:opacity-50"
                >
                  {loadingPurchase ? 'Procesando...' : 'Confirmar'}
                </button>
                <button
                  onClick={() => setShowCheckout(false)}
                  className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
