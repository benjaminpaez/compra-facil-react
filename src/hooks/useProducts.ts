import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  productService,
  type CreateProductData,
  type Product,
} from "../services/api";

// Hook para obtener todos los productos
export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: productService.getAllProducts,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
    retry: 3,
    retryDelay: 1000,
  });
};

// Hook para obtener un producto específico por ID
export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => productService.getProductById(id),
    enabled: !!id, // Solo ejecuta si hay un ID válido
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 3,
    retryDelay: 1000,
  });
};

// Hook para obtener productos por categoría
export const useProductsByCategory = (category: string) => {
  return useQuery({
    queryKey: ["products", "category", category],
    queryFn: () => productService.getProductsByCategory(category),
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Hook para crear un nuevo producto (useMutation)
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productData: CreateProductData) =>
      productService.createProduct(productData),
    onSuccess: (newProduct) => {
      // Invalidar y refrescar TODA la lista de productos para obtener datos frescos
      queryClient.invalidateQueries({ queryKey: ["products"] });

      // También invalidar categorías
      queryClient.invalidateQueries({ queryKey: ["products", "category"] });

      // Agregar el producto individual al cache
      queryClient.setQueryData(["product", newProduct.id], newProduct);

      console.log("Producto creado exitosamente:", newProduct);
    },
    onError: (error) => {
      console.error("Error al crear producto:", error);
    },
  });
};

// Hook para eliminar un producto (useMutation)
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: number) => productService.deleteProduct(productId),
    onSuccess: (_, deletedId) => {
      // Remover el producto del cache de la lista
      queryClient.setQueryData(["products"], (oldData: unknown) => {
        const currentProducts = oldData as Product[] | undefined;
        if (!currentProducts) return [];
        return currentProducts.filter((product) => product.id !== deletedId);
      });

      // Remover el producto individual del cache
      queryClient.removeQueries({ queryKey: ["product", deletedId] });

      // Invalidar consultas relacionadas
      queryClient.invalidateQueries({ queryKey: ["products", "category"] });

      console.log("Producto eliminado exitosamente:", deletedId);
    },
    onError: (error) => {
      console.error("Error al eliminar producto:", error);
    },
  });
};

// Hook personalizado que combina el estado de productos con manejo de errores
export const useProductsWithErrorHandling = () => {
  const { data: products, isLoading, error, refetch } = useProducts();

  const handleRetry = () => {
    refetch();
  };

  return {
    products: products || [],
    isLoading,
    error,
    isEmpty: !isLoading && (!products || products.length === 0),
    hasError: !!error,
    retry: handleRetry,
  };
};

// Hook personalizado para un producto específico con manejo de errores
export const useProductWithErrorHandling = (id: number) => {
  const { data: product, isLoading, error, refetch } = useProduct(id);

  const handleRetry = () => {
    refetch();
  };

  return {
    product,
    isLoading,
    error,
    notFound: !isLoading && !product && !error,
    hasError: !!error,
    retry: handleRetry,
  };
};
