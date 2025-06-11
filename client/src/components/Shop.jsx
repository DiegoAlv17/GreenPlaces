import { Sprout, Leaf } from "lucide-react";
import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/cartSlice';

const products = [
  {
    id: 1,
    name: "Cepillo de Bambú",
    description: "Biodegradable, ideal para reemplazar cepillos plásticos.",
    imageUrl: "https://bamboobalance.pe/wp-content/uploads/2022/04/01.png.webp",
    price: "12.00",
  },
  {
    id: 2,
    name: "Bolsa Reutilizable",
    description: "Resistente, perfecta para tus compras diarias.",
    imageUrl: "https://bamboobalance.pe/wp-content/uploads/2021/04/00.jpg.webp",
    price: "18.00",
  },
  {
    id: 3,
    name: "Comedero Eco para Mascotas",
    description: "Hecho con materiales reciclados, seguro y durable.",
    imageUrl: "https://bamboobalance.pe/wp-content/uploads/2020/09/filtro-para-leche-vegetal.png.webp",
    price: "25.00",
  },
  {
    id: 4,
    name: "Juguete Natural para Gatos",
    description: "100% algodón orgánico con hierba gatera.",
    imageUrl: "https://bamboobalance.pe/wp-content/uploads/2019/08/sorbetes-de-bamboo-set-768x894.webp",
    price: "15.00",
  },
];

const Shop = () => {
  const dispatch = useDispatch();
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-88 object-cover rounded-t-2xl"
              />
              <div className="p-4 flex flex-col justify-between h-48">
                <div>
                  <div className="flex items-center gap-2">
                    <Leaf className="h-4 w-4 text-amber-700" />
                    <p className="text-sm text-amber-700 font-medium">Producto Ecológico</p>
                  </div>
                  <h3 className="text-xl font-semibold text-green-600 mt-1">{product.name}</h3>
                  <p className="text-sm text-green-600 mt-1">{product.description}</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold text-green-800">S/ {product.price}</span>
                  <button className="bg-green-600 text-white px-4 py-1.5 rounded-md hover:bg-green-500 transition-colors text-sm" 
                  onClick={() => dispatch(addToCart(product))}>
                    Añadir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Shop;
