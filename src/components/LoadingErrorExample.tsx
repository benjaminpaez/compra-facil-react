import { useState } from "react";
import {
  useProductsWithErrorHandling,
  useProductWithErrorHandling,
} from "../hooks/useProducts";
import { Loader2, AlertTriangle, RefreshCw } from "lucide-react";

export const LoadingErrorExample = () => {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

  // Hook para obtener todos los productos con manejo de errores
  const {
    products,
    isLoading: productsLoading,
    hasError: productsError,
    isEmpty,
    retry: retryProducts,
  } = useProductsWithErrorHandling();

  // Hook para obtener un producto específico (solo si hay uno seleccionado)
  const {
    product,
    isLoading: productLoading,
    hasError: productError,
    notFound,
    retry: retryProduct,
  } = useProductWithErrorHandling(selectedProductId || 0);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Ejemplo de Estados de Carga y Error
      </h1>

      {/* Sección de Lista de Productos */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Lista de Productos</h2>

        {productsLoading && (
          <div className="flex items-center gap-2 p-4 bg-blue-50 rounded-lg">
            <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
            <span>Cargando productos...</span>
          </div>
        )}

        {productsError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <span className="text-red-700 font-medium">
                Error al cargar productos
              </span>
            </div>
            <button
              onClick={retryProducts}
              className="flex items-center gap-2 px-3 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Reintentar
            </button>
          </div>
        )}

        {isEmpty && (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              <span className="text-yellow-700">
                No hay productos disponibles
              </span>
            </div>
          </div>
        )}

        {!productsLoading && !productsError && !isEmpty && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.slice(0, 6).map((product) => (
              <div
                key={product.id}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedProductId(product.id)}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-32 object-cover rounded mb-2"
                />
                <h3 className="font-medium text-sm">{product.title}</h3>
                <p className="text-green-600 font-bold">${product.price}</p>
                <p className="text-xs text-gray-500">{product.category}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sección de Producto Individual */}
      {selectedProductId && (
        <div className="border-t pt-8">
          <h2 className="text-xl font-semibold mb-4">
            Producto Seleccionado (ID: {selectedProductId})
          </h2>

          {productLoading && (
            <div className="flex items-center gap-2 p-4 bg-blue-50 rounded-lg">
              <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
              <span>Cargando detalles del producto...</span>
            </div>
          )}

          {productError && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <span className="text-red-700 font-medium">
                  Error al cargar el producto
                </span>
              </div>
              <button
                onClick={retryProduct}
                className="flex items-center gap-2 px-3 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Reintentar
              </button>
            </div>
          )}

          {notFound && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                <span className="text-yellow-700">Producto no encontrado</span>
              </div>
            </div>
          )}

          {product && !productLoading && !productError && (
            <div className="p-4 border rounded-lg bg-gray-50">
              <div className="flex gap-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-24 h-24 object-cover rounded"
                />
                <div>
                  <h3 className="font-bold text-lg">{product.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {product.description}
                  </p>
                  <p className="text-green-600 font-bold text-xl">
                    ${product.price}
                  </p>
                  <p className="text-blue-600 text-sm">{product.category}</p>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={() => setSelectedProductId(null)}
            className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
          >
            Cerrar detalles
          </button>
        </div>
      )}
    </div>
  );
};
