import React, { useEffect, useState } from 'react';
import { Sprout, Leaf } from "lucide-react";
import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/cartSlice';
import productService from '../services/productService';

const Shop = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getAllProducts();
        setProducts(data);
      } catch (error) {
        setError('Error al cargar productos');
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  return (
    <section id="shop" className="py-16 bg-amber-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 mt-10">
          <Sprout className="h-12 w-12 mx-auto text-green-600" />
          <h2 className="mt-2 text-3xl font-bold text-green-700 sm:text-4xl">
            Tienda Ecológica
          </h2>
          <p className="mt-4 text-lg text-green-700 max-w-xl mx-auto">
            Productos amigables con el medio ambiente, pensados para fomentar un estilo de vida sostenible.
          </p>
        </div>

        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-green-600">Cargando productos...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.producto_id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow"
              >
                <img
                  src={product.url_imagen}
                  alt={product.producto_nombre}
                  className="w-full h-88 object-cover rounded-t-2xl"
                />
                <div className="p-4 flex flex-col justify-between h-48">
                  <div>
                    <div className="flex items-center gap-2">
                      <Leaf className="h-4 w-4 text-amber-700" />
                      <p className="text-sm text-amber-700 font-medium">Producto Ecológico</p>
                    </div>
                    <h3 className="text-xl font-semibold text-green-600 mt-1">{product.producto_nombre}</h3>
                    <p className="text-sm text-green-600 mt-1">{product.descripcion}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-green-800">S/ {product.precio}</span>
                    <button 
                      className="bg-green-600 text-white px-4 py-1.5 rounded-md hover:bg-green-500 transition-colors text-sm" 
                      onClick={() => dispatch(addToCart({
                        id: product.producto_id,
                        name: product.producto_nombre,
                        price: product.precio,
                        imageUrl: product.url_imagen
                      }))}
                    >
                      Añadir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Shop;
