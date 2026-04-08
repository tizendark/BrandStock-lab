import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronDown, Loader2 } from 'lucide-react'

// Mock categories
const categories = [
  { id: 1, name: 'Electrónica' },
  { id: 2, name: 'Accesorios' },
  { id: 3, name: 'Mobiliario' },
  { id: 4, name: 'Iluminación' },
  { id: 5, name: 'Papelería' }
]

// Mock units
const units = ['Unidad', 'Caja', 'Paquete', 'Metro', 'Kilogramo', 'Litro']

export default function NewProduct() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    category: '',
    initialStock: '',
    unit: ''
  })

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.code.trim()) {
      newErrors.code = 'El código es obligatorio'
    } else if (!/^[A-Za-z0-9-]+$/.test(formData.code)) {
      newErrors.code = 'El código solo puede contener letras, números y guiones'
    }
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio'
    }
    
    if (!formData.category) {
      newErrors.category = 'La categoría es obligatoria'
    }
    
    if (!formData.initialStock) {
      newErrors.initialStock = 'El stock inicial es obligatorio'
    } else if (parseInt(formData.initialStock) < 0) {
      newErrors.initialStock = 'El stock no puede ser negativo'
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
    
    try {
      // TODO: Implementar llamada real al backend
      // POST /api/products
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Redirect to products list on success
      navigate('/products')
    } catch (error) {
      console.error('Error creating product:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    navigate('/products')
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Back Button */}
      <button
        onClick={handleCancel}
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al catálogo
      </button>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Nuevo Producto</h1>
        <p className="text-gray-600 mt-1">Registrar producto en el catálogo de inventario</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="space-y-6">
          {/* Código del producto */}
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
              Código del producto <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="code"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              placeholder="Ej: P011"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors.code ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.code && (
              <p className="mt-1 text-sm text-red-600">{errors.code}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              → Código único identificador (Ej: P001, ELEC-001)
            </p>
          </div>

          {/* Nombre del producto */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del producto <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ej: Laptop Dell Inspiron 15"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              → Nombre descriptivo y completo del producto
            </p>
          </div>

          {/* Categoría */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Categoría <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className={`appearance-none w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white ${
                  errors.category ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Seleccionar categoría...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              → Clasificación para organización y reportes
            </p>
          </div>

          {/* Stock inicial y Unidad de medida */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Stock inicial */}
            <div>
              <label htmlFor="initialStock" className="block text-sm font-medium text-gray-700 mb-2">
                Stock inicial <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="initialStock"
                min="0"
                value={formData.initialStock}
                onChange={(e) => setFormData({ ...formData, initialStock: e.target.value })}
                placeholder="0"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  errors.initialStock ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.initialStock && (
                <p className="mt-1 text-sm text-red-600">{errors.initialStock}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                → Cantidad actual en inventario
              </p>
            </div>

            {/* Unidad de medida */}
            <div>
              <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-2">
                Unidad de medida <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="unit"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  className={`appearance-none w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white ${
                    errors.unit ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Seleccionar unidad...</option>
                  {units.map((unit) => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
              {errors.unit && (
                <p className="mt-1 text-sm text-red-600">{errors.unit}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                → Cómo se mide el producto
              </p>
            </div>
          </div>

          {/* Info Note */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <p className="text-sm text-blue-700">
              <strong>Nota:</strong> El producto será creado con estado "Activo". Podrás editarlo o deshabilitarlo posteriormente.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isLoading}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creando...
                </>
              ) : (
                'Crear Producto'
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Validation Note */}
      <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-xs text-gray-600">
          <strong>→ Validaciones:</strong> Campos obligatorios (*) se validan al enviar. Código debe ser único en el sistema.
        </p>
      </div>
    </div>
  )
}
