import { useNavigate } from 'react-router-dom'
import { 
  Package, 
  AlertTriangle, 
  ArrowLeftRight, 
  Plus, 
  ArrowDownLeft, 
  ArrowUpRight,
  ChevronRight
} from 'lucide-react'

// Mock data based on wireframe
const kpiData = {
  totalProducts: 10,
  lowStock: 2,
  todayMovements: 5
}

const categoryData = [
  { name: 'Electrónica', value: 45 },
  { name: 'Accesorios', value: 80 },
  { name: 'Mobiliario', value: 25 },
  { name: 'Iluminación', value: 35 },
  { name: 'Papelería', value: 60 }
]

const recentMovements = [
  {
    id: 1,
    product: 'Mouse Logitech M185',
    type: 'Compra',
    quantity: 20,
    date: '2026-04-08 09:15',
    isEntry: true
  },
  {
    id: 2,
    product: 'Silla Ergonómica Office Pro',
    type: 'Venta',
    quantity: 3,
    date: '2026-04-08 10:30',
    isEntry: false
  },
  {
    id: 3,
    product: 'Cable HDMI 2m',
    type: 'Compra',
    quantity: 50,
    date: '2026-04-08 11:45',
    isEntry: true
  },
  {
    id: 4,
    product: 'Resma Papel A4 500 hojas',
    type: 'Venta',
    quantity: 15,
    date: '2026-04-08 14:20',
    isEntry: false
  },
  {
    id: 5,
    product: 'Laptop Dell Inspiron 15',
    type: 'Venta',
    quantity: 2,
    date: '2026-04-07 16:30',
    isEntry: false
  }
]

export default function Dashboard() {
  const navigate = useNavigate()

  const maxValue = Math.max(...categoryData.map(d => d.value))

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Principal</h1>
        <p className="text-gray-600 mt-1">Vista general del inventario</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Products */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Productos Activos</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{kpiData.totalProducts}</p>
              <p className="text-sm text-gray-500 mt-1">En catálogo</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Low Stock */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Stock Bajo (&lt;10)</p>
              <p className="text-3xl font-bold text-amber-600 mt-2">{kpiData.lowStock}</p>
              <p className="text-sm text-gray-500 mt-1">Requieren atención</p>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-amber-600" />
            </div>
          </div>
        </div>

        {/* Today's Movements */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Movimientos Hoy</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{kpiData.todayMovements}</p>
              <p className="text-sm text-gray-500 mt-1">Registrados hoy</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <ArrowLeftRight className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Recent Movements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stock by Category Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Stock por Categoría</h3>
          
          {/* Simple Bar Chart */}
          <div className="space-y-4">
            {categoryData.map((category) => (
              <div key={category.name} className="flex items-center gap-4">
                <span className="text-sm text-gray-600 w-24 truncate">{category.name}</span>
                <div className="flex-1 h-8 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary-600 rounded-full transition-all duration-500"
                    style={{ width: `${(category.value / maxValue) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-900 w-10 text-right">{category.value}</span>
              </div>
            ))}
          </div>
          
          <p className="text-xs text-gray-500 mt-6">
            → Visualización rápida de distribución de inventario
          </p>
        </div>

        {/* Recent Movements */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Últimos 5 Movimientos</h3>
          
          <div className="space-y-4">
            {recentMovements.map((movement) => (
              <div key={movement.id} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className={`p-2 rounded-lg ${movement.isEntry ? 'bg-green-50' : 'bg-red-50'}`}>
                  {movement.isEntry ? (
                    <ArrowDownLeft className="h-4 w-4 text-green-600" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 text-red-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{movement.product}</p>
                  <p className="text-xs text-gray-500">
                    {movement.type} · {movement.quantity} unid. · {movement.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => navigate('/products')}
            className="w-full mt-6 py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            Ver catálogo completo
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={() => navigate('/movements/new')}
        className="fixed bottom-6 right-6 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 transition-colors z-50"
      >
        <Plus className="h-5 w-5" />
        Nuevo Movimiento
      </button>
    </div>
  )
}
