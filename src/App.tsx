import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductList } from "./components/ProductList";
import { ProductDetail } from "./components/ProductDetail";
import Cart from "./components/Cart";
import { Checkout } from "./components/Checkout";
import { NotFound } from "./components/NotFound";
import { Navbar } from "./components/Navbar";
import { Success } from "./components/Success";

function App() {
  return (
    <BrowserRouter>
      <main className="w-full min-h-screen font-nunito">
        <header className="w-full flex items-center justify-center h-16 bg-[#F3C623]">
          <Navbar />
        </header>
        <div className="flex gap-8 justify-center items-center px-4 pt-8 mx-auto max-w-7xl">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/success" element={<Success />} />
          </Routes>
        </div>
      </main>
      <footer className="flex justify-center items-center py-4 text-gray-500 font-nunito">
        Compra Facil | 2025
      </footer>
    </BrowserRouter>
  );
}

export default App;
