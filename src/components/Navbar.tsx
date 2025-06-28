import { useStore } from "../context/StoreContext";
import { Search, ShoppingCart } from "lucide-react";

export function Navbar() {
  const { cart, setSearchTerm } = useStore();

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <div className="flex justify-between items-center p-4 w-full max-w-6xl">
      <div>
        <img
          src="../../public/logo-compra-lista.png"
          alt="logo"
          className="w-44 h-20"
        />
      </div>

      <section className="my-4 w-[450px]">
        <div className="hidden relative md:block">
          <div className="flex absolute inset-y-0 items-center pointer-events-none start-0 ps-3">
            <Search />
          </div>
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 ps-10 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:text-gray-700 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Buscar productos, accesorios y mas..."
          />
        </div>
      </section>

      <section className="flex justify-center items-center font-light">
        <nav className="flex gap-4 justify-between">
          <a href="#moda">Moda</a>
          <a href="#zapatillas">Zapatillas</a>
          <a href="#relojes">Relojes</a>
          <a href="#perfumes">Perfumes</a>
        </nav>
      </section>
      <div className="relative">
        <ShoppingCart className="w-6 h-6" />
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
          {totalQuantity}
        </span>
      </div>
    </div>
  );
}
