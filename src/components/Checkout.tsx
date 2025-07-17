import { Truck } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import ButtonBack from "./ui/ButtonBack";

export const Checkout = () => {
  const { cart } = useStore();
  const [deliveryMethod, setDeliveryMethod] = useState("home");
  const [paymentMethod, setPaymentMethod] = useState("visa");
  const [cardInfo, setCardInfo] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

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
      <div className="min-h-screen bg-gray-50">
        <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold text-gray-800">
              Tu carrito está vacío
            </h1>
            <p className="mb-6 text-gray-600">
              Agrega algunos productos para continuar con la compra
            </p>
            <Link
              to="/"
              className="inline-block px-6 py-3 font-medium text-white bg-blue-600 rounded-lg transition-colors hover:bg-blue-700"
            >
              Continuar comprando
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 mx-auto w-full sm:px-6 lg:px-8">
          <ButtonBack direction="/cart" />
        </div>
      </div>
      <div className="px-4 py-8 mx-auto w-full sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Panel izquierdo - Método de entrega */}
          <div className="space-y-6 lg:col-span-2">
            <h1 className="text-2xl font-bold text-gray-900">
              Elegí la forma de entrega
            </h1>

            {/* Opción de retiro en sucursal (opcional) */}
            <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-3">
                  <div className="flex-1">
                    <label
                      htmlFor="pickup"
                      className="text-sm font-medium text-gray-900"
                    >
                      Retirar en sucursal
                    </label>
                    <p className="mt-1 text-sm text-gray-600">
                      Sucursal Centro
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Horario: Lunes a Viernes 9:00 - 18:00
                    </p>
                  </div>
                </div>
                <span className="text-sm font-medium text-green-600">
                  Gratis
                </span>
              </div>
            </div>

            {/* Selección de método de pago */}
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-gray-900">
                Elegí cómo pagar
              </h2>

              <div className="space-y-4">
                {/* Opción VISA */}
                <div className="relative p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="visa"
                      name="payment-method"
                      value="visa"
                      checked={paymentMethod === "visa"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <div className="flex justify-center items-center w-8 h-8 bg-blue-600 rounded-full">
                      <span className="text-xs font-bold text-white">VISA</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Banco de Chaco **** 0189
                      </p>
                      <span className="inline-block px-2 py-1 mt-1 text-xs text-green-800 bg-green-100 rounded">
                        Mismo precio en hasta 12 cuotas
                      </span>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 text-xs text-white uppercase bg-black rounded">
                      Recomendado
                    </span>
                  </div>
                </div>

                {/* Opción Mastercard */}
                <div className="p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="mastercard"
                      name="payment-method"
                      value="mastercard"
                      checked={paymentMethod === "mastercard"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <div className="flex justify-center items-center w-8 h-8 bg-red-600 rounded-full">
                      <span className="text-xs font-bold text-white">MC</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Banco Galicia **** 5678
                      </p>
                      <span className="inline-block px-2 py-1 mt-1 text-xs text-green-800 bg-green-100 rounded">
                        Mismo precio en hasta 12 cuotas
                      </span>
                    </div>
                  </div>
                </div>

                {/* Opción efectivo */}
                <div className="p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="cash"
                      name="payment-method"
                      value="cash"
                      checked={paymentMethod === "cash"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <div className="flex justify-center items-center w-8 h-8 bg-green-600 rounded-full">
                      <span className="text-xs font-bold text-white">$</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Efectivo
                      </p>
                      <span className="inline-block px-2 py-1 mt-1 text-xs text-green-800 bg-green-100 rounded">
                        10% de descuento
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-6">
              <Link
                to="/success"
                className="flex gap-2 px-8 py-3 font-medium text-white bg-green-600 rounded-lg transition-colors hover:bg-green-700"
              >
                <Truck />
                Completar compra
              </Link>
            </div>
          </div>

          {/* Panel derecho - Resumen */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 p-6 bg-white rounded-lg shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-gray-900">
                Resumen de compra
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-600">
                    Productos ({totalItems})
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {formatPrice(calculateSubtotal())}
                  </span>
                </div>

                <div className="flex justify-between py-2">
                  <span className="text-sm font-medium text-gray-900">
                    Pagás
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    {formatPrice(calculateTotal())}
                  </span>
                </div>
              </div>

              {/* Lista de productos (opcional, para mostrar qué se está comprando) */}
              <div className="pt-4 mt-4 border-t border-gray-200">
                <h3 className="mb-2 text-sm font-medium text-gray-900">
                  Productos en tu compra:
                </h3>
                <div className="overflow-y-auto space-y-2 max-h-40">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex justify-between text-xs text-gray-600"
                    >
                      <span className="flex-1 truncate">
                        {item.product.title} x{item.quantity}
                      </span>
                      <span className="ml-2">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
