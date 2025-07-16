import { ShoppingBasket} from "lucide-react";
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart,incrementQuantity,decrementQuantity } from '../Redux/cartSlice';     

const Cart = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const total = cart.reduce((subtotal, item) => subtotal + parseFloat(item.price) * item.cantidad, 0);
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
              >
                Realizar la compra
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
