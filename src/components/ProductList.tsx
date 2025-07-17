import { Products } from "./Products";
import { SidebarFilters } from "./SidebarFilters";

export const ProductList = () => {
  return (
    <>
      <div className="flex gap-8 px-4 pt-8 mx-auto max-w-7xl">
        <aside className="w-64 min-w-[220px] bg-white rounded-lg border border-gray-200 p-6 h-fit shadow-sm">
          <SidebarFilters />
        </aside>
        <section className="flex-1">
          <Products />
        </section>
      </div>
    </>
  );
};
