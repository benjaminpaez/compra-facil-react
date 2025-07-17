import { useStore } from "../context/StoreContext";
import { Link } from "react-router-dom";
import { CheckCircle, Package, Truck, CreditCard } from "lucide-react";
import { useState } from "react";
import { TicketPurchase } from "./TicketPurchase";

export const Success = () => {
  const { cart, clearCart } = useStore();
  const [showTicket, setShowTicket] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  // Generar número de pedido aleatorio
  const orderNumber = `#${Math.random()
    .toString(36)
    .substr(2, 9)
    .toUpperCase()}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-8 mx-auto max-w-4xl sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            ¡Compra completada exitosamente!
          </h1>
          <p className="text-lg text-gray-600">
            Tu pedido ha sido procesado y confirmado
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Panel izquierdo - Detalles del pedido */}
          <div className="space-y-6">
            {/* Información del pedido */}
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Detalles del pedido
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Número de pedido:</span>
                  <span className="font-medium text-gray-900">
                    {orderNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fecha:</span>
                  <span className="font-medium text-gray-900">
                    {new Date().toLocaleDateString("es-AR")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total de productos:</span>
                  <span className="font-medium text-gray-900">
                    {totalItems}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total pagado:</span>
                  <span className="text-lg font-bold text-gray-900">
                    {formatPrice(calculateTotal())}
                  </span>
                </div>
              </div>
            </div>

            {/* Estado del pedido */}
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Estado del pedido
              </h2>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="flex justify-center items-center w-8 h-8 bg-green-600 rounded-full">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      Pedido confirmado
                    </p>
                    <p className="text-sm text-gray-600">
                      Tu pedido ha sido recibido
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="flex justify-center items-center w-8 h-8 bg-blue-600 rounded-full">
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">En preparación</p>
                    <p className="text-sm text-gray-600">
                      Preparando tu pedido
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="flex justify-center items-center w-8 h-8 bg-gray-300 rounded-full">
                    <Truck className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-400">En envío</p>
                    <p className="text-sm text-gray-400">Próximamente</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Información de entrega */}
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Información de entrega
              </h2>

              <div className="space-y-3">
                <div>
                  <p className="font-medium text-gray-900">
                    Dirección de entrega:
                  </p>
                  <p className="text-gray-600">Resistencia, Chaco</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    Método de entrega:
                  </p>
                  <p className="text-gray-600">Envío a domicilio - Gratis</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Tiempo estimado:</p>
                  <p className="text-gray-600">3-5 días hábiles</p>
                </div>
              </div>
            </div>
          </div>

          {/* Panel derecho - Productos comprados */}
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Productos comprados
              </h2>

              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center p-3 space-x-4 rounded-lg border border-gray-200"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="object-cover w-16 h-16 rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 truncate">
                        {item.product.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Cantidad: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Información de pago */}
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Información de pago
              </h2>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900">Método de pago:</p>
                    <p className="text-gray-600">
                      VISA - Banco de Chaco **** 0189
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="text-gray-900">
                      {formatPrice(calculateTotal())}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Envío:</span>
                    <span className="text-green-600">Gratis</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="font-bold text-gray-900">Total:</span>
                    <span className="text-lg font-bold text-gray-900">
                      {formatPrice(calculateTotal())}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Link
                to="/"
                onClick={clearCart}
                className="block px-6 py-3 w-full font-medium text-center text-white bg-blue-600 rounded-lg transition-colors hover:bg-blue-700"
              >
                Continuar comprando
              </Link>
              <button
                className="block px-6 py-3 w-full font-medium text-center text-blue-600 rounded-lg border border-blue-600 transition-colors hover:bg-blue-50"
                onClick={() => setShowTicket((show) => !show)}
              >
                {showTicket ? "Ocultar comprobante" : "Ver detalle comprobante"}
              </button>
              {showTicket && (
                <div className="flex justify-center mt-4">
                  <TicketPurchase />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
