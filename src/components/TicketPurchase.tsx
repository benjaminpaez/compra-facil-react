import { useStore } from "../context/StoreContext";

export const TicketPurchase = () => {
  const { cart } = useStore();
  const fecha = new Date().toLocaleString();

  const calcularTotal = () =>
    cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div
      className="p-4 mx-auto max-w-xs font-mono text-sm bg-white rounded-lg border border-gray-300 shadow-md"
      style={{ minWidth: 320 }}
    >
      <div className="pb-2 mb-2 text-center border-b border-dashed">
        <h2 className="text-lg font-bold tracking-widest">Compra Lista</h2>
        <div className="text-xs text-gray-500">{fecha}</div>
      </div>
      <div>
        <div className="flex justify-between pb-1 mb-1 font-bold border-b border-dashed">
          <span>Producto</span>
          <span>Cant.</span>
          <span>Precio</span>
          <span>Subtotal</span>
        </div>
        {cart.length === 0 ? (
          <div className="py-4 text-center text-gray-400">Carrito vacío</div>
        ) : (
          cart.map((item) => (
            <div
              key={item.product.id}
              className="flex justify-between py-1 border-b border-dotted"
            >
              <span className="w-20 truncate" title={item.product.title}>
                {item.product.title}
              </span>
              <span>{item.quantity}</span>
              <span>${item.product.price.toFixed(2)}</span>
              <span>${(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
          ))
        )}
      </div>
      <div className="flex justify-between pt-2 mt-3 font-bold border-t border-dashed">
        <span>Total</span>
        <span>${calcularTotal().toFixed(2)}</span>
      </div>
      <div className="mt-3 text-xs text-center text-gray-400">
        ¡Gracias por tu compra!
      </div>
    </div>
  );
};
