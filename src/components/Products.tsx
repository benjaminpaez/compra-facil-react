import { useStore } from "../context/StoreContext";
import { useProductsWithErrorHandling } from "../hooks/useProducts";
import { Card } from "./ui/Card";
import { AlertTriangle, Loader2, RefreshCw } from "lucide-react";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category?: string;
};

// Función para verificar si un producto cumple con el filtro de precio
function cumpleFiltroPrecio(product: Product, priceFilter: string): boolean {
  if (!priceFilter) return true;

  if (priceFilter === "0-10000") {
    return product.price < 10000;
  } else if (priceFilter === "10000-20000") {
    return product.price >= 10000 && product.price <= 20000;
  } else if (priceFilter === "20000-999999") {
    return product.price > 20000;
  }

  return true;
}

export const Products = () => {
  const { searchTerm, selectedCategories, priceFilter } = useStore();
  const { products, isLoading, hasError, isEmpty, retry } =
    useProductsWithErrorHandling();

  // Estado de carga
  if (isLoading) {
    return (
      <section className="w-full flex flex-col items-center justify-center py-16">
        <Loader2 className="w-12 h-12 animate-spin text-[#F3C623] mb-4" />
        <p className="text-lg text-gray-600">Cargando productos...</p>
      </section>
    );
  }

  // Estado de error
  if (hasError) {
    return (
      <section className="w-full flex flex-col items-center justify-center py-16">
        <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
        <p className="text-lg text-gray-600 mb-4">
          Error al cargar los productos
        </p>
        <button
          onClick={retry}
          className="flex items-center gap-2 px-4 py-2 bg-[#F3C623] text-black rounded-lg hover:bg-[#e6b420] transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Reintentar
        </button>
      </section>
    );
  }

  // Filtrar productos según los criterios
  const filteredProducts = products.filter((product: Product) => {
    // Filtro por término de búsqueda
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Filtro por categoría
    const matchesCategory =
      selectedCategories.length === 0 ||
      (product.category && selectedCategories.includes(product.category));

    // Filtro por precio
    const matchesPrice = cumpleFiltroPrecio(product, priceFilter);

    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Agrupar productos por categoría para mostrar
  const groupedProducts = filteredProducts.reduce(
    (acc: Record<string, Product[]>, product) => {
      const category = product.category || "Sin categoría";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    },
    {}
  );

  const hasFilteredProducts = filteredProducts.length > 0;

  return (
    <section className="w-full">
      {/* Contador de resultados */}
      <div className="mb-4 text-base font-medium text-gray-700">
        {hasFilteredProducts
          ? `${filteredProducts.length} resultado${
              filteredProducts.length !== 1 ? "s" : ""
            }`
          : "0 resultados"}
      </div>

      {/* Mensaje cuando no hay productos */}
      {!hasFilteredProducts && !isEmpty && (
        <div className="flex flex-col justify-center items-center py-16 text-gray-500">
          <AlertTriangle className="mb-4 w-12 h-12 text-yellow-500" />
          <span className="text-xl font-semibold">
            No se encontraron productos para tu búsqueda
          </span>
        </div>
      )}

      {/* Mensaje cuando no hay productos en la base de datos */}
      {isEmpty && (
        <div className="flex flex-col justify-center items-center py-16 text-gray-500">
          <AlertTriangle className="mb-4 w-12 h-12 text-yellow-500" />
          <span className="text-xl font-semibold">
            No hay productos disponibles
          </span>
        </div>
      )}

      {/* Renderizar productos agrupados por categoría */}
      {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
        <section
          id={category.toLowerCase()}
          key={category}
          className="flex flex-col bg-[#DFDFDE] gap-8 p-8 rounded-md mb-10"
        >
          <section>
            <h1 className="flex text-4xl text-black">{category}</h1>
            <p className="text-lg text-slate-600">
              {categoryProducts.length} producto
              {categoryProducts.length !== 1 ? "s" : ""}
            </p>
            <hr className="my-2 border-t border-gray-300" />
          </section>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {categoryProducts.map((product: Product) => (
              <div
                key={product.id}
                className="flex bg-white rounded-lg flex-col h-full"
              >
                <Card
                  id={product.id}
                  image={product.image}
                  description={product.description}
                  price={product.price}
                  title={product.title}
                />
              </div>
            ))}
          </div>
        </section>
      ))}
    </section>
  );
};
