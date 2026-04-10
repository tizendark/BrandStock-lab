import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronDown, Loader2, Info } from 'lucide-react'
import { createProduct } from '../services/productService'

// Categorías del sistema (pueden venir de la DB, por ahora estáticas)
const categories = ['Electrónica', 'Hogar', 'Ropa', 'Alimentos']

// Unidades de medida
const units = ['Unidad', 'Caja', 'Paquete', 'Metro', 'Kilogramo', 'Litro']

export default function NewProduct() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [serverError, setServerError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    category: '',
    stock: '',
    unit: '',
    price: '',
    minStock: '10',
    description: ''
  })

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.sku.trim()) {
      newErrors.sku = 'El código es obligatorio'
    } else if (!/^[A-Za-z0-9-]+$/.test(formData.sku)) {
      newErrors.sku = 'El código solo puede contener letras, números y guiones'
    }
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio'
    }
    
    if (!formData.category) {
      newErrors.category = 'La categoría es obligatoria'
    }
    
    if (!formData.stock) {
      newErrors.stock = 'El stock inicial es obligatorio'
    } else if (parseInt(formData.stock) < 0) {
      newErrors.stock = 'El stock no puede ser negativo'
    }

    if (!formData.price) {
      newErrors.price = 'El precio es obligatorio'
    } else if (parseFloat(formData.price) < 0) {
      newErrors.price = 'El precio no puede ser negativo'
    }

    if (!formData.minStock) {
      newErrors.minStock = 'El stock mínimo es obligatorio'
    } else if (parseInt(formData.minStock) < 0) {
      newErrors.minStock = 'El stock no puede ser negativo'
    }
    
    if (!formData.unit) {
      newErrors.unit = 'La unidad de medida es obligatoria'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    setServerError(null)
    
    try {
      await createProduct({
        name: formData.name,
        sku: formData.sku,
        category: formData.category,
        stock: parseInt(formData.stock),
        price: parseFloat(formData.price),
        minStock: parseInt(formData.minStock),
        description: formData.description || undefined
      })
      
      // Redirigir al catálogo en caso de éxito
      navigate('/products')
    } catch (error: any) {
      console.error('Error creating product:', error)
      setServerError(error.message || 'Ocurrió un error al crear el producto. Por favor intenta de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    navigate('/products')
  }

  return (
    <div className="max-w-[800px] mx-auto pb-10">
      {/* Back Button */}
      <button
        onClick={handleCancel}
        className="inline-flex items-center gap-2 text-sm font-medium text-[#4A5565] hover:text-[#101828] transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al catálogo
      </button>

      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-[30px] font-semibold text-[#101828] tracking-tight">Nuevo Producto</h1>
        <p className="text-[#4A5565] mt-1 text-sm">Registrar producto en el catálogo de inventario</p>
      </div>

      {serverError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center gap-3">
          <Info className="h-4 w-4" />
          {serverError}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-[10px] border border-[#D1D5DC] shadow-sm overflow-hidden">
        <div className="p-8 space-y-8">
          {/* Código del producto */}
          <div className="space-y-2">
            <label htmlFor="sku" className="block text-sm font-semibold text-[#101828]">
              Código del producto *
            </label>
            <input
              type="text"
              id="sku"
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              placeholder="Ej: P011"
              className={`w-full px-4 py-2.5 bg-[#F9FAFB] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#155DFC] focus:border-transparent text-sm transition-all ${
                errors.sku ? 'border-red-500' : 'border-[#D1D5DC]'
              }`}
            />
            {errors.sku && <p className="text-xs text-red-600 font-medium">{errors.sku}</p>}
            <p className="text-xs text-[#667085]">
              → Código único identificador (Ej: P001, ELEC-001)
            </p>
          </div>

          {/* Nombre del producto */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-semibold text-[#101828]">
              Nombre del producto *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ej: Laptop Dell Inspiron 15"
              className={`w-full px-4 py-2.5 bg-[#F9FAFB] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#155DFC] focus:border-transparent text-sm transition-all ${
                errors.name ? 'border-red-500' : 'border-[#D1D5DC]'
              }`}
            />
            {errors.name && <p className="text-xs text-red-600 font-medium">{errors.name}</p>}
            <p className="text-xs text-[#667085]">
              → Nombre descriptivo y completo del producto
            </p>
          </div>

          {/* Categoría */}
          <div className="space-y-2">
            <label htmlFor="category" className="block text-sm font-semibold text-[#101828]">
              Categoría *
            </label>
            <div className="relative">
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className={`appearance-none w-full px-4 py-2.5 pr-10 bg-[#F9FAFB] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#155DFC] focus:border-transparent text-sm cursor-pointer transition-all ${
                  errors.category ? 'border-red-500' : 'border-[#D1D5DC]'
                }`}
              >
                <option value="">Seleccionar categoría...</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#667085] pointer-events-none" />
            </div>
            {errors.category && <p className="text-xs text-red-600 font-medium">{errors.category}</p>}
            <p className="text-xs text-[#667085]">
              → Clasificación para organización y reportes
            </p>
          </div>

          {/* Stock inicial y Unidad de medida */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
            {/* Stock inicial */}
            <div className="space-y-2">
              <label htmlFor="stock" className="block text-sm font-semibold text-[#101828]">
                Stock inicial *
              </label>
              <input
                type="number"
                id="stock"
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                placeholder="0"
                className={`w-full px-4 py-2.5 bg-[#F9FAFB] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#155DFC] focus:border-transparent text-sm transition-all ${
                  errors.stock ? 'border-red-500' : 'border-[#D1D5DC]'
                }`}
              />
              {errors.stock && <p className="text-xs text-red-600 font-medium">{errors.stock}</p>}
              <p className="text-xs text-[#667085]">
                → Cantidad actual en inventario
              </p>
            </div>

            {/* Unidad de medida */}
            <div className="space-y-2">
              <label htmlFor="unit" className="block text-sm font-semibold text-[#101828]">
                Unidad de medida *
              </label>
              <div className="relative">
                <select
                  id="unit"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  className={`appearance-none w-full px-4 py-2.5 pr-10 bg-[#F9FAFB] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#155DFC] focus:border-transparent text-sm cursor-pointer transition-all ${
                    errors.unit ? 'border-red-500' : 'border-[#D1D5DC]'
                  }`}
                >
                  <option value="">Seleccionar unidad...</option>
                  {units.map((unit) => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#667085] pointer-events-none" />
              </div>
              {errors.unit && <p className="text-xs text-red-600 font-medium">{errors.unit}</p>}
              <p className="text-xs text-[#667085]">
                → Cómo se mide el producto
              </p>
            </div>
          </div>

          {/* Precio y Stock mínimo (Campos adicionales para funcionalidad del backend) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
            <div className="space-y-2">
              <label htmlFor="price" className="block text-sm font-semibold text-[#101828]">
                Precio unitario *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#667085] text-sm">$</span>
                <input
                  type="number"
                  id="price"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                  className={`w-full pl-8 pr-4 py-2.5 bg-[#F9FAFB] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#155DFC] focus:border-transparent text-sm transition-all ${
                    errors.price ? 'border-red-500' : 'border-[#D1D5DC]'
                  }`}
                />
              </div>
              {errors.price && <p className="text-xs text-red-600 font-medium">{errors.price}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="minStock" className="block text-sm font-semibold text-[#101828]">
                Stock mínimo *
              </label>
              <input
                type="number"
                id="minStock"
                min="0"
                value={formData.minStock}
                onChange={(e) => setFormData({ ...formData, minStock: e.target.value })}
                placeholder="10"
                className={`w-full px-4 py-2.5 bg-[#F9FAFB] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#155DFC] focus:border-transparent text-sm transition-all ${
                  errors.minStock ? 'border-red-500' : 'border-[#D1D5DC]'
                }`}
              />
              {errors.minStock && <p className="text-xs text-red-600 font-medium">{errors.minStock}</p>}
            </div>
          </div>

          {/* Info Note */}
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] p-4">
            <p className="text-xs text-[#64748B] leading-relaxed">
              <strong>Nota:</strong> El producto será creado con estado "Activo". Podrás editarlo o deshabilitarlo desde el catálogo o su página de detalle.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-8 py-6 bg-[#F9FAFB] border-t border-[#D1D5DC] flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 border border-[#D1D5DC] bg-white text-sm font-semibold text-[#101828] rounded-lg hover:bg-[#F9FAFB] transition-all disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 bg-[#155DFC] text-sm font-semibold text-white rounded-lg hover:bg-[#004EEB] transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Guardando...
              </>
            ) : (
              'Guardar producto'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
