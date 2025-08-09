import { Eye, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";

type TCard = {
  id: number;
  image: string;
  title: string;
  description: string;
  price: number;
};
export function Card({ id, image, title, description, price }: TCard) {
  const { cart, addToCart, removeFromCart } = useStore();
  const navigate = useNavigate();

  const cartItem = cart.find((item) => item.product.id === id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const shortDescription =
    description.length > 20 ? description.slice(0, 20) + "..." : description;

  return (
    <section className="overflow-hidden mx-auto w-full max-w-md bg-white rounded-lg border border-gray-200 shadow-xl transition-shadow duration-300 hover:shadow-lg">
      <div className="relative">
        <img src={image} alt={title} className="object-cover w-full h-48" />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{shortDescription}</p>
        <span className="mt-2 text-2xl font-bold text-green-600">
          $ {price}
        </span>
        <div className="flex flex-col gap-2 mt-2">
          <button
            onClick={() => navigate(`/product/${id}`)}
            className="flex gap-2 px-4 py-2 w-full font-semibold text-blue-600 rounded-lg border border-blue-600 transition hover:bg-blue-50"
          >
            <div>
              <Eye />
            </div>
            Ver Detalle
          </button>
          <button
            onClick={() => addToCart({ id, image, title, description, price })}
            className="flex gap-2 justify-center items-center px-4 py-2 w-full font-semibold text-white bg-blue-600 rounded-lg transition hover:bg-blue-700"
          >
            <div>
              <ShoppingCart />
            </div>
            <span>Agregar</span>
          </button>
          {quantity > 0 && (
            <div className="flex flex-col items-center mt-2">
              <span className="font-medium text-green-600 text-md">
                Cantidad en carrito:{" "}
                <span className="text-xl font-bold">{quantity}</span>
              </span>
              <div className="flex gap-2 mt-1">
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
          )}
        </div>
      </div>
    </section>
  );
}
