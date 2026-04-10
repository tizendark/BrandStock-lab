import { useState, type FormEvent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowDownLeft, 
  ArrowUpRight, 
  Search, 
  ChevronDown, 
  Loader2,
  AlertCircle,
  Package,
  X
} from 'lucide-react'
import { getProducts } from '../services/productService'
import { createMovement } from '../services/movementService'
import { type Product } from '../components/products/ProductCard'

const reasons = {
  entrada: ['Compra', 'Devolución', 'Ajuste'],
  salida: ['Venta', 'Merma', 'Ajuste', 'Devolución Proveedor']
}

export default function NewMovement() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [searchQuery, setSearchQuery] = useState('')
  const [showProductDropdown, setShowProductDropdown] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [serverError, setServerError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    type: 'entrada' as 'entrada' | 'salida',
    product: null as Product | null,
    quantity: '',
    reason: '',
    notes: ''
  })

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.length > 1 && !formData.product) {
        setIsSearching(true)
        try {
          const res = await getProducts(1, 10, searchQuery)
          setProducts(res.products)
          setShowProductDropdown(true)
        } catch (err) {
          console.error('Error searching products:', err)
        } finally {
          setIsSearching(false)
        }
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery, formData.product])

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
    if (!formData.product) return
    setIsLoading(true)
    setServerError(null)
    try {
      await createMovement({
        productId: formData.product.id,
        type: formData.type,
        quantity: parseInt(formData.quantity),
        reason: formData.reason,
        notes: formData.notes
      })
      navigate('/')
    } catch (err: any) {
      console.error('Error creating movement:', err)
      setServerError(err.message || 'Error al registrar el movimiento.')
      setShowConfirmation(false)
    } finally {
      setIsLoading(false)
    }
  }

  const selectProduct = (product: Product) => {
    setFormData({ ...formData, product })
    setSearchQuery(`${product.sku} - ${product.name}`)
    setShowProductDropdown(false)
    if (errors.product) setErrors({ ...errors, product: '' })
  }

  const clearProduct = () => {
    setFormData({ ...formData, product: null })
    setSearchQuery('')
    setShowProductDropdown(false)
  }

  const getNewStock = () => {
    if (!formData.product || !formData.quantity) return null
    const qty = parseInt(formData.quantity)
    if (formData.type === 'entrada') {
      return formData.product.stock + qty
    } else {
      return (formData.product.stock || 0) - qty
    }
  }

  return (
    <div className="max-w-[800px] mx-auto pb-10">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-[30px] font-semibold text-[#101828] tracking-tight">Registro de Movimiento</h1>
        <p className="text-[#4A5565] mt-1 text-sm">Entrada o salida de productos del inventario</p>
      </div>

      {serverError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center gap-3">
          <AlertCircle className="h-4 w-4" />
          {serverError}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-[10px] border border-[#D1D5DC] shadow-sm overflow-hidden">
        <div className="p-8 space-y-8">
          {/* Tipo de movimiento */}
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-[#101828]">
              Tipo de movimiento *
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'entrada', reason: '' })}
                className={`flex items-center gap-3 px-4 py-3 border rounded-lg transition-all ${
                  formData.type === 'entrada'
                    ? 'border-[#039855] bg-green-50 text-[#039855] ring-1 ring-[#039855]'
                    : 'border-[#D1D5DC] hover:border-gray-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  formData.type === 'entrada' ? 'border-[#039855] bg-white' : 'border-[#D1D5DC] bg-white'
                }`}>
                  {formData.type === 'entrada' && <div className="w-2.5 h-2.5 rounded-full bg-[#039855]" />}
                </div>
                <div className="flex items-center gap-2">
                  <ArrowUpRight className="h-5 w-5" />
                  <span className="font-medium text-sm">Entrada</span>
                </div>
              </button>
              
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'salida', reason: '' })}
                className={`flex items-center gap-3 px-4 py-3 border rounded-lg transition-all ${
                  formData.type === 'salida'
                    ? 'border-[#D92D20] bg-red-50 text-[#D92D20] ring-1 ring-[#D92D20]'
                    : 'border-[#D1D5DC] hover:border-gray-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  formData.type === 'salida' ? 'border-[#D92D20] bg-white' : 'border-[#D1D5DC] bg-white'
                }`}>
                  {formData.type === 'salida' && <div className="w-2.5 h-2.5 rounded-full bg-[#D92D20]" />}
                </div>
                <div className="flex items-center gap-2">
                  <ArrowDownLeft className="h-5 w-5" />
                  <span className="font-medium text-sm">Salida</span>
                </div>
              </button>
            </div>
          </div>

          {/* Búsqueda de producto */}
          <div className="space-y-2 relative">
            <label htmlFor="product" className="block text-sm font-semibold text-[#101828]">
              Producto *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Search className="h-5 w-5" />
              </div>
              <input
                id="product"
                type="text"
                className={`w-full pl-10 pr-10 py-2.5 bg-[#F9FAFB] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#155DFC] focus:border-transparent text-sm transition-all ${
                  errors.product ? 'border-red-500' : 'border-[#D1D5DC]'
                }`}
                placeholder="Buscar por código o nombre..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  if (formData.product) setFormData({ ...formData, product: null })
                }}
                autoComplete="off"
              />
              {formData.product && (
                <button
                  type="button"
                  onClick={clearProduct}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
              {isSearching && (
                <div className="absolute inset-y-0 right-10 flex items-center">
                  <Loader2 className="h-5 w-5 text-[#155DFC] animate-spin" />
                </div>
              )}
            </div>
            
            {/* Dropdown de productos */}
            {showProductDropdown && products.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-[#D1D5DC] rounded-lg shadow-lg max-h-60 overflow-auto">
                {products.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => selectProduct(product)}
                    className="w-full text-left px-4 py-3 hover:bg-[#F9FAFB] flex justify-between items-center border-b border-[#F2F4F7] last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 text-[#155DFC] rounded-lg">
                        <Package size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#101828]">{product.name}</p>
                        <p className="text-xs text-[#667085]">{product.sku}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-[#667085]">Stock actual</p>
                      <p className={`text-sm font-bold ${product.stock <= product.minStock ? 'text-red-600' : 'text-[#101828]'}`}>
                        {product.stock}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
            {errors.product && <p className="text-xs text-red-600 font-medium">{errors.product}</p>}
            <p className="text-xs text-[#667085]">
              → Autocompletado muestra código y stock en tiempo real
            </p>
          </div>

          {/* Cantidad */}
          <div className="space-y-2">
            <label htmlFor="quantity" className="block text-sm font-semibold text-[#101828]">
              Cantidad *
            </label>
            <input
              id="quantity"
              type="number"
              min="1"
              className={`w-full px-4 py-2.5 bg-[#F9FAFB] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#155DFC] focus:border-transparent text-sm transition-all ${
                errors.quantity ? 'border-red-500' : 'border-[#D1D5DC]'
              }`}
              placeholder="0"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            />
            {errors.quantity && <p className="text-xs text-red-600 font-medium">{errors.quantity}</p>}
            <p className="text-xs text-[#667085]">
              → Validación en tiempo real para salidas
            </p>
          </div>

          {/* Motivo */}
          <div className="space-y-2">
            <label htmlFor="reason" className="block text-sm font-semibold text-[#101828]">
              Motivo *
            </label>
            <div className="relative">
              <select
                id="reason"
                className={`appearance-none w-full px-4 py-2.5 pr-10 bg-[#F9FAFB] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#155DFC] focus:border-transparent text-sm cursor-pointer transition-all ${
                  errors.reason ? 'border-red-500' : 'border-[#D1D5DC]'
                }`}
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              >
                <option value="">Seleccionar motivo...</option>
                {reasons[formData.type].map((reason) => (
                  <option key={reason} value={reason}>
                    {reason}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#667085] pointer-events-none" />
            </div>
            {errors.reason && <p className="text-xs text-red-600 font-medium">{errors.reason}</p>}
          </div>

          {/* Observaciones */}
          <div className="space-y-2">
            <label htmlFor="notes" className="block text-sm font-semibold text-[#101828]">
              Observaciones (opcional)
            </label>
            <textarea
              id="notes"
              rows={3}
              className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#D1D5DC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#155DFC] focus:border-transparent text-sm transition-all resize-none"
              placeholder="Agregar notas adicionales..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          {/* Summary (Stock Preview) */}
          {formData.product && formData.quantity && (
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] p-4 flex items-center justify-between">
              <div className="text-xs text-[#64748B]">
                Stock actual: <span className="font-bold text-[#101828]">{formData.product.stock}</span>
              </div>
              <div className="text-xs font-bold text-[#D0D5DD]">→</div>
              <div className="text-xs text-[#64748B]">
                Stock proyectado: <span className={`font-bold ${formData.type === 'entrada' ? 'text-[#039855]' : 'text-[#D92D20]'}`}>
                  {getNewStock()}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="px-8 py-6 bg-[#F9FAFB] border-t border-[#D1D5DC] flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex-1 px-4 py-2.5 border border-[#D1D5DC] bg-white text-sm font-semibold text-[#101828] rounded-lg hover:bg-[#F9FAFB] transition-all"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2.5 bg-[#155DFC] text-sm font-semibold text-white rounded-lg hover:bg-[#004EEB] transition-all shadow-sm flex items-center justify-center gap-2"
          >
            Continuar
          </button>
        </div>
      </form>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold text-[#101828]">Confirmar Movimiento</h2>
              <p className="text-[#4A5565] text-sm">
                ¿Estás seguro de registrar esta {formData.type === 'entrada' ? 'entrada' : 'salida'}?
              </p>
            </div>

            <div className="bg-[#F9FAFB] rounded-xl p-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[#667085]">Producto:</span>
                <span className="font-bold text-[#101828]">{formData.product?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#667085]">Cantidad:</span>
                <span className="font-bold text-[#101828]">{formData.quantity} unidades</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#667085]">Motivo:</span>
                <span className="font-bold text-[#101828]">{formData.reason}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 px-4 py-2 border border-[#D1D5DC] text-[#4A5565] font-medium rounded-lg hover:bg-[#F9FAFB] transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirm}
                disabled={isLoading}
                className="flex-1 px-4 py-2 bg-[#155DFC] text-white font-medium rounded-lg hover:bg-[#004EEB] transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
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
