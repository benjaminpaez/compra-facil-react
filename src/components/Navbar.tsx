export function Navbar() {
  return (
    <div className="flex justify-between w-full max-w-6xl p-4 ">
      <div>
        <img
          src="../../public/logo-compra-lista.png"
          alt="logo"
          className="h-20 w-44"
        />
      </div>
      <section className="flex justify-center items-center font-light">
        <nav className="flex justify-between gap-4">
          <a href="#moda" className="">
            Moda
          </a>
          <a href="#zapatillas">Zapatillas</a>
          <a href="#relojes">Relojes</a>
          <a href="#perfumes">Perfumes</a>
        </nav>
      </section>
    </div>
  );
}
