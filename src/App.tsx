import { Navbar } from "./components/Navbar";
import { Products } from "./components/Products";
import { SidebarFilters } from "./components/SidebarFilters";
import { StoreProvider } from "./context/StoreContext";

function App() {
  return (
    <StoreProvider>
      <main className="w-full min-h-screen font-nunito">
        <header className="w-full flex items-center justify-center h-16 bg-[#F3C623]">
          <Navbar />
        </header>
        <div className="flex gap-8 px-4 pt-8 mx-auto max-w-7xl">
          <aside className="w-64 min-w-[220px] bg-white rounded-lg border border-gray-200 p-6 h-fit shadow-sm">
            <SidebarFilters />
          </aside>
          <section className="flex-1">
            <Products />
          </section>
        </div>
      </main>
      <footer className="flex justify-center items-center py-4 text-gray-500 font-nunito">
        Compra Facil | 2025
      </footer>
    </StoreProvider>
  );
}

export default App;
