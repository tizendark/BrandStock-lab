import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Plus, 
  Search, 
  ChevronDown, 
  Edit2, 
  Eye, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react'

// Mock data based on wireframe
const productsData = [
  {
    id: 'P001',
    name: 'Laptop Dell Inspiron 15',
    category: 'Electrónica',
    stock: 5,
    unit: 'Unidad',
    status: 'active'
  },
  {
    id: 'P002',
    name: 'Mouse Logitech M185',
    category: 'Accesorios',
    stock: 45,
    unit: 'Unidad',
    status: 'active'
  },
  {
    id: 'P003',
    name: 'Teclado Mecánico RGB',
    category: 'Accesorios',
    stock: 8,
    unit: 'Unidad',
    status: 'active'
  },
  {
    id: 'P004',
    name: 'Monitor Samsung 24"',
    category: 'Electrónica',
    stock: 2,
    unit: 'Unidad',
    status: 'active'
  },
  {
    id: 'P005',
    name: 'Silla Ergonómica Office Pro',
    category: 'Mobiliario',
    stock: 12,
    unit: 'Unidad',
    status: 'active'
  }
]

const categories = ['Todas las categorías', 'Electrónica', 'Accesorios', 'Mobiliario', 'Iluminación', 'Papelería']
const statuses = ['Todos los estados', 'Activo', 'Inactivo']

export default function Products() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todas las categorías')
  const [selectedStatus, setSelectedStatus] = useState('Todos los estados')
  const [currentPage, setCurrentPage] = useState(1)
  
  const itemsPerPage = 5
  const totalItems = 10 // Mock total
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  // Filter products (mock filtering)
  const filteredProducts = productsData.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'Todas las categorías' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleRowClick = (productId: string) => {
    navigate(`/products/${productId}`)
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Electrónica': 'bg-blue-100 text-blue-800',
      'Accesorios': 'bg-green-100 text-green-800',
      'Mobiliario': 'bg-amber-100 text-amber-800',
      'Iluminación': 'bg-yellow-100 text-yellow-800',
      'Papelería': 'bg-purple-100 text-purple-800'
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Catálogo de Productos</h1>
          <p className="text-gray-600 mt-1">{totalItems} productos encontrados</p>
        </div>
        <button 
          onClick={() => navigate('/products/new')}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Nuevo Producto
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por código o nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">→ Autocompletado en tiempo real</p>
          </div>
          
          {/* Category Filter */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none w-full md:w-48 px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
          
          {/* Status Filter */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="appearance-none w-full md:w-48 px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Código</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Nombre</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Categoría</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Stock</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Unidad</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr 
                  key={product.id} 
                  onClick={() => handleRowClick(product.id)}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(product.category)}`}>
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {product.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <button 
                        onClick={() => navigate(`/products/${product.id}/edit`)}
                        className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => navigate(`/products/${product.id}`)}
                        className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        title="Ver detalle"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Mostrando {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, totalItems)} de {totalItems}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === page 
                      ? 'bg-primary-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="inline-flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Siguiente
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Note */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
        <p className="text-xs text-blue-700">
          <strong>→ Interacciones:</strong> Click en fila completa abre detalle del producto. Botones de edición y vista disponibles en la columna de acciones.
        </p>
      </div>
    </div>
  )
}
