import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowDownLeft, 
  ArrowUpRight, 
  Search, 
  ChevronDown, 
  Loader2,
  AlertCircle
} from 'lucide-react'

// Mock products for autocomplete
const mockProducts = [
  { id: 'P001', name: 'Laptop Dell Inspiron 15', stock: 5 },
  { id: 'P002', name: 'Mouse Logitech M185', stock: 45 },
  { id: 'P003', name: 'Teclado Mecánico RGB', stock: 8 },
  { id: 'P004', name: 'Monitor Samsung 24"', stock: 2 },
  { id: 'P005', name: 'Silla Ergonómica Office Pro', stock: 12 }
]

const reasons = ['Compra', 'Venta', 'Merma', 'Ajuste', 'Devolución']

export default function NewMovement() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [searchQuery, setSearchQuery] = useState('')
  const [showProductDropdown, setShowProductDropdown] = useState(false)
  
  const [formData, setFormData] = useState({
    type: 'entrada' as 'entrada' | 'salida',
    product: null as { id: string; name: string; stock: number } | null,
    quantity: '',
    reason: '',
    notes: ''
  })

  const filteredProducts = mockProducts.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.product) {
      newErrors.product = 'Debes seleccionar un producto'
    }
    
    if (!formData.quantity || parseInt(formData.quantity) <= 0) {
      newErrors.quantity = 'La cantidad debe ser mayor a 0'
    } else if (formData.type === 'salida' && formData.product) {
      if (parseInt(formData.quantity) > formData.product.stock) {
        newErrors.quantity = `Stock insuficiente. Disponible: ${formData.product.stock}`
      }
    }
    
    if (!formData.reason) {
      newErrors.reason = 'Debes seleccionar un motivo'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setShowConfirmation(true)
    }
  }

  const handleConfirm = async () => {
    setIsLoading(true)
    try {
      // TODO: Implementar llamada real al backend
      // POST /api/movements
      await new Promise(resolve => setTimeout(resolve, 1500))
      navigate('/')
    } catch (error) {
      console.error('Error creating movement:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    navigate('/')
  }

  const selectProduct = (product: typeof mockProducts[0]) => {
    setFormData({ ...formData, product })
    setSearchQuery(`${product.id} - ${product.name}`)
    setShowProductDropdown(false)
    // Clear quantity error when product changes
    if (errors.quantity) {
      setErrors({ ...errors, quantity: '' })
    }
  }

  const getNewStock = () => {
    if (!formData.product || !formData.quantity) return null
    const qty = parseInt(formData.quantity)
    if (formData.type === 'entrada') {
      return formData.product.stock + qty
    } else {
      return formData.product.stock - qty
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Registro de Movimiento</h1>
        <p className="text-gray-600 mt-1">Entrada o salida de productos del inventario</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="space-y-6">
          {/* Tipo de movimiento */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Tipo de movimiento <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'entrada' })}
                className={`flex items-center gap-3 px-4 py-3 border-2 rounded-lg transition-colors ${
                  formData.type === 'entrada'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  formData.type === 'entrada' ? 'border-green-500' : 'border-gray-400'
                }`}>
                  {formData.type === 'entrada' && <div className="w-2.5 h-2.5 rounded-full bg-green-500" />}
                </div>
                <ArrowDownLeft className="h-5 w-5" />
                <span className="font-medium">Entrada</span>
              </button>
              
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'salida' })}
                className={`flex items-center gap-3 px-4 py-3 border-2 rounded-lg transition-colors ${
                  formData.type === 'salida'
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  formData.type === 'salida' ? 'border-red-500' : 'border-gray-400'
                }`}>
                  {formData.type === 'salida' && <div className="w-2.5 h-2.5 rounded-full bg-red-500" />}
                </div>
                <ArrowUpRight className="h-5 w-5" />
                <span className="font-medium">Salida</span>
              </button>
            </div>
          </div>

          {/* Producto */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Producto <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setShowProductDropdown(true)
                  if (formData.product) {
                    setFormData({ ...formData, product: null })
                  }
                }}
                onFocus={() => setShowProductDropdown(true)}
                placeholder="Buscar por código o nombre..."
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  errors.product ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              
              {/* Autocomplete Dropdown */}
              {showProductDropdown && searchQuery && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => selectProduct(product)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-0"
                      >
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.id} · Stock: {product.stock}</div>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-gray-500">No se encontraron productos</div>
                  )}
                </div>
              )}
            </div>
            {errors.product && (
              <p className="mt-1 text-sm text-red-600">{errors.product}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              → Autocompletado muestra código y stock en tiempo real
            </p>
          </div>

          {/* Cantidad */}
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
              Cantidad <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              placeholder="0"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors.quantity ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.quantity && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.quantity}
              </p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              → Validación en tiempo real para salidas
            </p>
          </div>

          {/* Motivo */}
          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
              Motivo <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="reason"
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                className={`appearance-none w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white ${
                  errors.reason ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Seleccionar motivo...</option>
                {reasons.map((reason) => (
                  <option key={reason} value={reason}>{reason}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
            {errors.reason && (
              <p className="mt-1 text-sm text-red-600">{errors.reason}</p>
            )}
          </div>

          {/* Observaciones */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
              Observaciones <span className="text-gray-400">(opcional)</span>
            </label>
            <textarea
              id="notes"
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Agregar notas adicionales..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            />
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
              Confirmar Movimiento
            </button>
          </div>
        </div>
      </form>

      {/* Note */}
      <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-xs text-gray-600">
          <strong>→ Flujo guiado:</strong> Validaciones en tiempo real previenen errores. Modal de confirmación antes de registrar.
        </p>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirmar Movimiento</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Tipo:</span>
                <span className={`font-medium ${formData.type === 'entrada' ? 'text-green-600' : 'text-red-600'}`}>
                  {formData.type === 'entrada' ? 'Entrada' : 'Salida'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Producto:</span>
                <span className="font-medium">{formData.product?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Cantidad:</span>
                <span className="font-medium">{formData.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Motivo:</span>
                <span className="font-medium">{formData.reason}</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Stock actual:</span>
                  <span className="font-medium">{formData.product?.stock}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Nuevo stock:</span>
                  <span className={`font-medium ${
                    (getNewStock() || 0) < (formData.product?.stock || 0) ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {getNewStock()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmation(false)}
                disabled={isLoading}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirm}
                disabled={isLoading}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Registrando...
                  </>
                ) : (
                  'Confirmar'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
