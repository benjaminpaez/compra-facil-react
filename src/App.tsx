import { dataArticles } from "./response";
import ProductSection from "./components/ProductSection";
import { Navbar } from "./components/Navbar";

function App() {
  const { moda, calzados, relojes, perfumes } = dataArticles;

  return (
    <main className="min-h-screen w-full font-nunito">
      <header className="w-full flex items-center justify-center h-16 bg-[#F3C623]">
        <Navbar />
      </header>
      <div className="w-full max-w-6xl px-4 mx-auto">
        <section className="grid gap-4 py-4">
          <article id="moda">
            <ProductSection
              {...moda}
              title="Moda"
              description="Tendencias del momento"
            />
          </article>
          <article id="zapatillas">
            <ProductSection
              {...calzados}
              title="Zapatillas"
              description="Impresioná desde el primer paso"
            />
          </article>
          <article id="relojes">
            <ProductSection
              {...relojes}
              title="Relojes"
              description="Elegancia a tu ritmo"
            />
          </article>
          <article id="perfumes">
            <ProductSection
              {...perfumes}
              title="Perfumes"
              description="Detalles que marcan"
            />
          </article>
        </section>

        <footer className="py-4 flex items-center justify-center font-nunito">
          Compra Facil | 2025
        </footer>
      </div>
    </main>
  );
}

export default App;
