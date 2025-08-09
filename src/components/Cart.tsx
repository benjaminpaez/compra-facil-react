import { useStore } from "../context/StoreContext";
import { Link } from "react-router-dom";
import { Trash2, ChevronRight } from "lucide-react";
import emptyCartImage from "../assets/empty-cart.webp";
import ButtonBack from "./ui/ButtonBack";

export default function Cart() {
  const { cart, addToCart, removeFromCart } = useStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const calculateSubtotal = () => {
    return cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const calculateTotal = () => {
    return calculateSubtotal();
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl text-center">
          <img
            src={emptyCartImage}
            alt="Carrito vacío"
            className="mx-auto mb-6 w-64 h-64"
          />
          <h1 className="mb-4 text-2xl font-bold text-gray-800">
            Tu carrito está vacío
          </h1>
          <p className="mb-6 text-gray-600">
            Agrega algunos productos para comenzar a comprar
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 font-medium text-white bg-blue-600 rounded-lg transition-colors hover:bg-blue-700"
          >
            Continuar comprando
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <ButtonBack direction="/" />
          </div>
        </div>
      </div>
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h1 className="mb-8 text-2xl font-bold text-gray-900">
          Carrito de compras
        </h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Panel izquierdo - Productos */}
          <div className="space-y-6 lg:col-span-2">
            {/* Productos del vendedor */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="ml-2 text-sm font-medium text-gray-900">
                      Productos | Total
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>

              {/* Lista de productos */}
              <div className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <div key={item.product.id} className="p-4">
                    <div className="flex items-start space-x-4">
                      <input
                        type="checkbox"
                        className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        defaultChecked
                      />

                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="object-cover w-16 h-16 rounded"
                      />

                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          {item.product.title}
                        </h3>
                        <button className="flex items-center mt-1 text-sm text-blue-600 hover:text-blue-800">
                          <Trash2 className="mr-1 w-3 h-3" />
                          Eliminar
                        </button>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="flex justify-center items-center w-8 h-8 rounded border border-gray-300 hover:bg-gray-50"
                        >
                          -
                        </button>
                        <span className="w-8 text-sm font-medium text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => addToCart(item.product)}
                          className="flex justify-center items-center w-8 h-8 rounded border border-gray-300 hover:bg-gray-50"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">
                          {formatPrice(item.product.price * item.quantity)}
                        </div>
                        <div className="text-xs text-gray-500">
                          +30 disponibles
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sección de envío */}
              <div className="p-4 bg-gray-50">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-900">
                    Envío
                  </span>
                  <span className="text-sm font-medium text-green-600">
                    Gratis
                  </span>
                </div>

                <div className="mb-3">
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-green-600 rounded-full"
                      style={{ width: "95%" }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>Envió gratis</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600">
                  Aprovechá tu envío gratis agregando más productos de Compra
                  Fácil.{" "}
                  <Link to="/" className="text-blue-600 hover:text-blue-800">
                    Ver más productos de este vendedor &gt;
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Panel derecho - Resumen */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 p-6 bg-white rounded-lg shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-gray-900">
                Resumen de compra
              </h2>

              <div className="mb-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    Productos ({totalItems})
                  </span>
                  <div className="text-right">
                    <div className="text-sm text-gray-400 line-through">
                      {formatPrice(calculateSubtotal() * 1.1)}
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {formatPrice(calculateSubtotal())}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    Envíos ({cart.length > 0 ? 1 : 0})
                  </span>
                  <span className="text-sm font-medium text-green-600">
                    Gratis
                  </span>
                </div>

                <button className="text-sm text-blue-600 hover:text-blue-800">
                  Ingresar código de cupón
                </button>
              </div>

              <div className="pt-4 mb-6 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-lg font-bold text-gray-900">
                    {formatPrice(calculateTotal())}
                  </span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="block px-6 py-3 w-full font-medium text-center text-white bg-blue-600 rounded-lg transition-colors hover:bg-blue-700"
              >
                Continuar compra
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
