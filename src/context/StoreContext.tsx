import { createContext, useContext, useState, useEffect } from "react";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
};

type CartItem = {
  product: Product;
  quantity: number;
};

type StoreContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  priceFilter: string;
  setPriceFilter: (filter: string) => void;
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Función para cargar el carrito desde localStorage
const loadCartFromStorage = (): CartItem[] => {
  try {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
    return [];
  }
};

// Función para guardar el carrito en localStorage
const saveCartToStorage = (cart: CartItem[]) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceFilter, setPriceFilter] = useState<string>("");

  // Cargar el carrito desde localStorage al inicializar
  useEffect(() => {
    const savedCart = loadCartFromStorage();
    setCart(savedCart);
  }, []);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      let newCart;

      if (existing) {
        newCart = prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newCart = [...prev, { product, quantity: 1 }];
      }

      // Guardar en localStorage
      saveCartToStorage(newCart);
      return newCart;
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === productId);
      let newCart;

      if (existing && existing.quantity > 1) {
        newCart = prev.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        // Si solo queda uno, lo elimina
        newCart = prev.filter((item) => item.product.id !== productId);
      }

      // Guardar en localStorage
      saveCartToStorage(newCart);
      return newCart;
    });
  };
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        searchTerm,
        setSearchTerm,
        selectedCategories,
        setSelectedCategories,
        priceFilter,
        setPriceFilter,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context)
    throw new Error("useStore debe ser utilizado dentro de StoreProvider");
  return context;
};
