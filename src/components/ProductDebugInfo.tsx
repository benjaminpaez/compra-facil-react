import { useProductsWithErrorHandling } from "../hooks/useProducts";

export const ProductDebugInfo = () => {
  const { products, isLoading, hasError } = useProductsWithErrorHandling();

  if (isLoading) return <div>Cargando debug info...</div>;
  if (hasError) return <div>Error en debug info</div>;

  const localProducts = products.filter((p) => p.id >= 1000);
  const apiProducts = products.filter((p) => p.id < 1000);

  return (
    <div className="p-4 mb-4 text-sm bg-gray-100 rounded-lg">
      <h3 className="mb-2 text-lg font-bold">Estado de Productos</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <h4 className="font-semibold text-blue-600">Total de Productos</h4>
          <p>{products.length}</p>
        </div>
        <div>
          <h4 className="font-semibold text-green-600">
            Productos Creados Localmente
          </h4>
          <p>{localProducts.length}</p>
          {localProducts.length > 0 && (
            <ul className="mt-1 text-xs">
              {localProducts.slice(0, 3).map((p) => (
                <li key={p.id}>
                  ID: {p.id} - {p.title.slice(0, 20)}...
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <h4 className="font-semibold text-purple-600">Productos de la API</h4>
          <p>{apiProducts.length}</p>
          {apiProducts.length > 0 && (
            <ul className="mt-1 text-xs">
              {apiProducts.slice(0, 3).map((p) => (
                <li key={p.id}>
                  ID: {p.id} - {p.title.slice(0, 20)}...
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Categorías */}
      <div className="mt-4">
        <h4 className="font-semibold text-orange-600">
          Productos por Categoría
        </h4>
        <div className="grid grid-cols-2 gap-2 mt-2 md:grid-cols-4">
          {["Moda", "Calzados", "Relojes", "Perfumes"].map((category) => {
            const count = products.filter(
              (p) => p.category === category
            ).length;
            return (
              <div key={category} className="p-2 bg-white rounded">
                <span className="text-xs font-medium">{category}</span>
                <span className="block text-lg font-bold">{count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
