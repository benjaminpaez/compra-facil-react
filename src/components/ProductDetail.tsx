import { useParams, Link } from "react-router-dom";
import { dataArticles, type Product } from "../response";
import { useStore } from "../context/StoreContext";

export const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, removeFromCart, cart } = useStore();

  // Buscar el producto en todas las categorías
  const findProduct = (): Product | null => {
    for (const category of Object.values(dataArticles)) {
      const product = category.products.find((p) => p.id === Number(id));
      if (product) return product;
    }
    return null;
  };

  const product = findProduct();

  // Obtener la cantidad actual en el carrito
  const cartItem = cart.find((item) => item.product.id === Number(id));
  const currentCartQuantity = cartItem ? cartItem.quantity : 0;

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-800">
            Producto no encontrado
          </h1>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Volver a la tienda
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Header con navegación */}
      <div className="gap-4 bg-white border-b border-gray-200">
        <div className="px-4 mx-auto w-full sm:px-6 lg:px-8">
          <Link to="/" className="mr-4 text-gray-500 hover:text-gray-700">
            ← Volver
          </Link>
        </div>
      </div>

      <div className="px-4 py-8 mx-auto w-full sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Columna izquierda - Imagen */}
          <div className="space-y-4">
            <div className="overflow-hidden bg-white rounded-lg shadow-sm">
              <img
                src={product.image}
                alt={product.title}
                className="object-cover w-full h-96"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {/* Miniaturas de imágenes (simuladas) */}
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="overflow-hidden bg-white rounded-lg shadow-sm transition-shadow cursor-pointer hover:shadow-md"
                >
                  <img
                    src={product.image}
                    alt={`${product.title} ${i}`}
                    className="object-cover w-full h-20"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Columna derecha - Información del producto */}
          <div className="space-y-6">
            {/* Título y condición */}
            <div>
              <div className="flex items-center mb-2 space-x-2">
                <span className="text-sm font-medium text-green-600">
                  Nuevo
                </span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">
                  Más de 100 vendidos
                </span>
              </div>
              <h1 className="mb-2 text-2xl font-bold text-gray-900">
                {product.title}
              </h1>
            </div>

            {/* Precio */}
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </div>
              <div className="text-sm text-gray-500">
                en 12x {formatPrice(Math.round(product.price / 12))} sin interés
              </div>
              <div className="text-sm text-green-600">Envío gratis</div>
            </div>

            {/* Cantidad en carrito */}
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-blue-800">
                  Cantidad en carrito
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => removeFromCart(Number(id))}
                    disabled={currentCartQuantity === 0}
                    className="flex justify-center items-center w-8 h-8 text-red-600 bg-red-50 rounded border border-red-300 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    -
                  </button>
                  <span className="w-8 font-medium text-center">
                    {currentCartQuantity}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="flex justify-center items-center w-8 h-8 text-green-600 bg-green-50 rounded border border-green-300 hover:bg-green-100"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="space-y-3">
              <Link
                to="/cart"
                className="px-6 py-3 w-56 font-medium text-white bg-blue-600 rounded-lg transition-colors hover:bg-blue-700"
              >
                Comprar ahora
              </Link>
            </div>

            {/* Información de envío */}
            <div className="p-4 space-y-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-medium text-gray-900">
                  Envío gratis
                </span>
              </div>
              <div className="text-sm text-gray-600">
                Llega gratis el martes
              </div>
              <div className="text-sm text-gray-600">
                Vendido y enviado por Compra Fácil
              </div>
            </div>

            {/* Garantía */}
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Compra Protegida</span>
            </div>
          </div>
        </div>

        {/* Sección de descripción */}
        <div className="p-6 mt-12 bg-white rounded-lg shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Descripción</h2>
          <p className="leading-relaxed text-gray-700">{product.description}</p>
        </div>

        {/* Sección de características */}
        <div className="p-6 mt-8 bg-white rounded-lg shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Características
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Marca</span>
              <span className="font-medium">Compra Fácil</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Modelo</span>
              <span className="font-medium">{product.title}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Condición</span>
              <span className="font-medium text-green-600">Nuevo</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Garantía</span>
              <span className="font-medium">6 meses</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
