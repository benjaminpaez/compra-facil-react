import { useStore } from "../context/StoreContext";
type TCard = {
  id: number;
  image: string;
  title: string;
  description: string;
  price: number;
};
export function Card({ id, image, title, description, price }: TCard) {
  const { cart, addToCart, removeFromCart } = useStore();

  const cartItem = cart.find((item) => item.product.id === id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <section className="grid grid-rows-[178px, 1fr, 60px] block w-full max-w-sm mx-auto rounded-lg shadow-xl hover:shadow-lg transition-shadow duration-300 bg-[#FFF7F1] overflow-hidden">
      <div className="relative">
        <img src={image} alt={title} className="object-cover w-full h-48" />
      </div>

      <div className="gap-2 p-2">
        <h3 className="mb-2 text-xl font-semibold text-gray-900">{title}</h3>
        <p className="mb-3 text-sm text-gray-600 line-clamp-3">{description}</p>
      </div>
      <div className="flex p-2">
        <span className="text-2xl font-bold text-[#236f24]">$ {price}</span>
      </div>
      <div className="flex flex-col gap-2 items-center pb-2">
        {quantity > 0 ? (
          <div className="grid">
            <span className="text-green-600 text-md font-regular">
              Cantidad en carrito: <span className="text-xl font-bold"></span>{" "}
              {quantity}
            </span>
            <div className="flex gap-2 items-center">
              <button
                onClick={() => removeFromCart(id)}
                className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
              >
                Quitar
              </button>
              <button
                onClick={() =>
                  addToCart({ id, image, title, description, price })
                }
                className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Agregar
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => addToCart({ id, image, title, description, price })}
            className="px-3 py-1 text-white bg-blue-500 rounded transition hover:bg-blue-600"
          >
            Agregar
          </button>
        )}
      </div>
    </section>
  );
}
