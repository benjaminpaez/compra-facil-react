import axios from "axios";

// Configuración base de la API
const API_BASE_URL = "https://jsonplaceholder.typicode.com"; // URL de ejemplo, cambiar por tu API real

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Tipos para los productos
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category?: string;
}

export interface CreateProductData {
  title: string;
  description: string;
  price: number;
  image: string;
  category?: string;
}

// Store local para productos creados por el usuario
class LocalProductStore {
  private storageKey = "user-created-products";
  private products: Product[] = [];
  private nextId = 1000; // Empezar con IDs altos para evitar conflictos

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const data = JSON.parse(stored);
        this.products = data.products || [];
        this.nextId = data.nextId || 1000;
      }
    } catch (error) {
      console.error("Error loading products from storage:", error);
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem(
        this.storageKey,
        JSON.stringify({
          products: this.products,
          nextId: this.nextId,
        })
      );
    } catch (error) {
      console.error("Error saving products to storage:", error);
    }
  }

  addProduct(productData: CreateProductData): Product {
    const newProduct: Product = {
      id: this.nextId++,
      ...productData,
    };

    this.products.push(newProduct);
    this.saveToStorage();
    return newProduct;
  }

  getProducts(): Product[] {
    return [...this.products];
  }

  getProductById(id: number): Product | null {
    return this.products.find((p) => p.id === id) || null;
  }

  removeProduct(id: number): boolean {
    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.saveToStorage();
      return true;
    }
    return false;
  }
}

// Instancia del store local
const localStore = new LocalProductStore();

// Servicios de API
export const productService = {
  // Obtener todos los productos (API + productos locales)
  getAllProducts: async (): Promise<Product[]> => {
    try {
      // Obtener productos de la API
      const response = await api.get("/posts");
      const apiProducts = response.data
        .slice(0, 20)
        .map((item: { id: number; title: string; body: string }) => ({
          id: item.id,
          title: item.title,
          description: item.body,
          price: Math.floor(Math.random() * 50000) + 1000,
          image: `https://picsum.photos/400/300?random=${item.id}`,
          category: ["Moda", "Calzados", "Relojes", "Perfumes"][
            Math.floor(Math.random() * 4)
          ],
        }));

      // Obtener productos creados localmente
      const localProducts = localStore.getProducts();

      // Combinar ambos (productos locales primero para que aparezcan al inicio)
      const allProducts = [...localProducts, ...apiProducts];

      console.log(
        `🛍️ Productos cargados: ${allProducts.length} total (${localProducts.length} locales + ${apiProducts.length} de API)`
      );

      return allProducts;
    } catch (error) {
      console.error("Error al obtener productos:", error);
      // Si la API falla, al menos devolver productos locales
      return localStore.getProducts();
    }
  },

  // Obtener producto por ID
  getProductById: async (id: number): Promise<Product> => {
    try {
      // Primero buscar en productos locales
      const localProduct = localStore.getProductById(id);
      if (localProduct) {
        return localProduct;
      }

      // Si no está en local, buscar en la API
      const response = await api.get(`/posts/${id}`);
      return {
        id: response.data.id,
        title: response.data.title,
        description: response.data.body,
        price: Math.floor(Math.random() * 50000) + 1000,
        image: `https://picsum.photos/800/600?random=${response.data.id}`,
        category: ["Moda", "Calzados", "Relojes", "Perfumes"][
          Math.floor(Math.random() * 4)
        ],
      };
    } catch (error) {
      console.error(`Error al obtener producto ${id}:`, error);
      throw new Error(`No se pudo obtener el producto con ID ${id}`);
    }
  },

  // Crear nuevo producto (solo local)
  createProduct: async (productData: CreateProductData): Promise<Product> => {
    try {
      // Simular delay de red
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Crear producto localmente
      const newProduct = localStore.addProduct(productData);

      console.log("✅ Producto creado y guardado localmente:", newProduct);
      console.log(
        `📦 Total productos locales ahora: ${localStore.getProducts().length}`
      );
      return newProduct;
    } catch (error) {
      console.error("Error al crear producto:", error);
      throw new Error("No se pudo crear el producto");
    }
  },

  // Obtener productos por categoría
  getProductsByCategory: async (category: string): Promise<Product[]> => {
    try {
      const allProducts = await productService.getAllProducts();
      return allProducts.filter((product) => product.category === category);
    } catch (error) {
      console.error(
        `Error al obtener productos de categoría ${category}:`,
        error
      );
      throw new Error(
        `No se pudieron obtener los productos de la categoría ${category}`
      );
    }
  },

  // Eliminar producto (solo productos locales)
  deleteProduct: async (id: number): Promise<boolean> => {
    try {
      // Solo permitir eliminar productos creados localmente (ID >= 1000)
      if (id < 1000) {
        throw new Error("No se pueden eliminar productos de la API");
      }

      const success = localStore.removeProduct(id);
      if (!success) {
        throw new Error("Producto no encontrado");
      }

      return true;
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      throw error;
    }
  },
};

// Configuración de interceptores para manejo de errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 404) {
      console.error("Recurso no encontrado");
    } else if (error.response?.status >= 500) {
      console.error("Error del servidor");
    } else if (error.code === "ECONNABORTED") {
      console.error("Tiempo de espera agotado");
    }
    return Promise.reject(error);
  }
);
