import { useStore } from "../context/StoreContext";
import { dataArticles } from "../response";
import { Card } from "./Card";
import { AlertTriangle } from "lucide-react";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
};

type CategoryData = {
  title: string;
  description: string;
  products: Product[];
};

function convertirAFormatoArray(obj: Record<string, CategoryData>) {
  return {
    products: Object.entries(obj).map(([categoria, data]) => ({
      categoria,
      title: data.title,
      description: data.description,
      products: data.products,
    })),
  };
}

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
  const products = convertirAFormatoArray(dataArticles);
  const { searchTerm, selectedCategories, priceFilter } = useStore();

  // Filtrar categorías según los filtros seleccionados
  const filteredCategories = products.products.filter(
    (category) =>
      selectedCategories.length === 0 ||
      selectedCategories.includes(category.title)
  );

  // Contar todos los productos filtrados
  const allFilteredProducts = filteredCategories.flatMap((category) =>
    category.products.filter(
      (p: Product) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        cumpleFiltroPrecio(p, priceFilter)
    )
  );
  const hasProducts = allFilteredProducts.length > 0;

  return (
    <section className="w-full">
      {/* Contador de resultados */}
      <div className="mb-4 text-base font-medium text-gray-700">
        {hasProducts
          ? `${allFilteredProducts.length} resultado${
              allFilteredProducts.length !== 1 ? "s" : ""
            }`
          : "0 resultados"}
      </div>
      {/* Mensaje si no hay productos */}
      {!hasProducts && (
        <div className="flex flex-col justify-center items-center py-16 text-gray-500">
          <AlertTriangle className="mb-4 w-12 h-12 text-yellow-500" />
          <span className="text-xl font-semibold">
            No se encontraron productos para tu búsqueda
          </span>
        </div>
      )}
      {/* Renderizar productos agrupados por categoría */}
      {filteredCategories.map((category) => {
        // Filtrar productos por searchTerm y priceFilter dentro de cada categoría
        const filteredProducts = category.products.filter(
          (p: Product) =>
            p.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            cumpleFiltroPrecio(p, priceFilter)
        );
        if (filteredProducts.length === 0) return null;
        return (
          <section
            id={category.title.toLowerCase()}
            key={category.title}
            className="flex flex-col bg-[#DFDFDE] gap-8 p-8 rounded-md mb-10"
          >
            <section>
              <h1 className="flex text-4xl text-black">{category.title}</h1>
              <p className="text-lg text-slate-600">{category.description}</p>
              <hr className="my-2 border-t border-gray-300" />
            </section>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {filteredProducts.map((product: Product) => (
                <div
                  key={product.id}
                  className="flex flex-col p-4 h-full bg-white rounded-lg shadow-sm"
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
        );
      })}
    </section>
  );
};
