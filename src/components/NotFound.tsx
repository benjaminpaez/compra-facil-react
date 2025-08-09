import notfound from "../assets/not_found.webp";

export const NotFound = () => {
  return (
    <div className="flex justify-center items-center bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl text-center">
        <img
          src={notfound}
          alt="Pagina no encontrada"
          className="mx-auto mb-6 w-64 h-64"
        />
        <h1 className="mb-4 text-2xl font-bold text-gray-800">
          Pagina no encontrada
        </h1>
        <p className="mb-6 text-gray-600">
          Regresa a la pagina principal para seguir navegando
        </p>
        <a href="/" className="text-blue-600 underline">
          Volver a inicio
        </a>
      </div>
    </div>
  );
};
