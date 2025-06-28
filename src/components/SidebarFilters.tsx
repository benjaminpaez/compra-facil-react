import { ListFilter } from "lucide-react";
import { useStore } from "../context/StoreContext";

const categorias = ["Moda", "Zapatillas", "Relojes", "Perfumes"];

export function SidebarFilters() {
  const {
    selectedCategories,
    setSelectedCategories,
    priceFilter,
    setPriceFilter,
  } = useStore();

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex gap-4">
        <ListFilter />
        <h1 className="mb-4 text-xl font-bold text-gray-800">Filtros</h1>
      </div>
      <div>
        <h2 className="mb-2 text-base font-semibold text-gray-700">
          Categoría
        </h2>
        <div className="space-y-2">
          {categorias.map((cat) => (
            <label
              key={cat}
              className="flex gap-2 items-center text-sm text-gray-700"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="accent-yellow-500"
              />
              {cat}
            </label>
          ))}
        </div>
      </div>
      {/* Precio */}
      <div>
        <h2 className="mb-2 text-base font-semibold text-gray-700">Precio</h2>
        <select
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          className="p-2 w-full text-sm bg-white rounded border border-gray-300"
        >
          <option value="">Todos los precios</option>
          <option value="0-10000">Menor a $10.000</option>
          <option value="10000-20000">$10.000 - $20.000</option>
          <option value="20000-999999">Mayor a $20.000</option>
        </select>
      </div>
    </div>
  );
}
