import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateProduct } from "../hooks/useProducts";
import { Loader2, Package, ArrowLeft, CheckCircle } from "lucide-react";

interface FormData {
  title: string;
  description: string;
  price: string;
  image: string;
  category: string;
}

interface FormErrors {
  title?: string;
  description?: string;
  price?: string;
  image?: string;
  category?: string;
}

export const CreateProduct = () => {
  const navigate = useNavigate();
  const createProductMutation = useCreateProduct();

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    price: "",
    image: "",
    category: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const categories = ["Moda", "Calzados", "Relojes", "Perfumes"];

  // Validación del formulario
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "El título es requerido";
    } else if (formData.title.length < 3) {
      newErrors.title = "El título debe tener al menos 3 caracteres";
    }

    if (!formData.description.trim()) {
      newErrors.description = "La descripción es requerida";
    } else if (formData.description.length < 10) {
      newErrors.description =
        "La descripción debe tener al menos 10 caracteres";
    }

    if (!formData.price.trim()) {
      newErrors.price = "El precio es requerido";
    } else {
      const price = Number(formData.price);
      if (isNaN(price) || price <= 0) {
        newErrors.price = "El precio debe ser un número mayor que 0";
      }
    }

    if (!formData.image.trim()) {
      newErrors.image = "La URL de la imagen es requerida";
    } else {
      try {
        new URL(formData.image);
      } catch {
        newErrors.image = "La URL de la imagen no es válida";
      }
    }

    if (!formData.category) {
      newErrors.category = "La categoría es requerida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await createProductMutation.mutateAsync({
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        image: formData.image,
        category: formData.category,
      });

      // Mostrar mensaje de éxito
      setShowSuccess(true);

      // Resetear formulario
      setFormData({
        title: "",
        description: "",
        price: "",
        image: "",
        category: "",
      });

      // Redirigir a la página principal después de 2 segundos para ver el producto creado
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error al crear producto:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a la tienda
          </button>

          <div className="flex items-center gap-3">
            <Package className="w-8 h-8 text-[#F3C623]" />
            <h1 className="text-3xl font-bold text-gray-900">Crear Producto</h1>
          </div>
          <p className="text-gray-600 mt-2">
            Agrega un nuevo producto a la tienda
          </p>
        </div>

        {/* Mensaje de éxito */}
        {showSuccess && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <div>
              <p className="font-medium">¡Producto creado exitosamente!</p>
              <p className="text-sm">
                Redirigiendo a la página principal para ver tu producto...
              </p>
            </div>
          </div>
        )}

        {/* Formulario */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Título */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Título del producto *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F3C623] ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Ingresa el título del producto"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            {/* Descripción */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Descripción *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F3C623] resize-none ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Describe el producto detalladamente"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Precio */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Precio (ARS) *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F3C623] ${
                  errors.price ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="0.00"
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">{errors.price}</p>
              )}
            </div>

            {/* URL de imagen */}
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                URL de la imagen *
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F3C623] ${
                  errors.image ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
              {errors.image && (
                <p className="mt-1 text-sm text-red-600">{errors.image}</p>
              )}
            </div>

            {/* Categoría */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Categoría *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F3C623] ${
                  errors.category ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Selecciona una categoría</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category}</p>
              )}
            </div>

            {/* Preview de imagen */}
            {formData.image && !errors.image && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vista previa de la imagen
                </label>
                <div className="border border-gray-300 rounded-lg p-4">
                  <img
                    src={formData.image}
                    alt="Vista previa"
                    className="w-32 h-32 object-cover rounded-lg mx-auto"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                </div>
              </div>
            )}

            {/* Error de mutación */}
            {createProductMutation.isError && (
              <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                Error al crear el producto. Por favor, intenta nuevamente.
              </div>
            )}

            {/* Botones */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={createProductMutation.isPending}
                className="flex-1 px-4 py-2 bg-[#F3C623] text-black rounded-lg hover:bg-[#e6b420] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {createProductMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creando...
                  </>
                ) : (
                  "Crear Producto"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
