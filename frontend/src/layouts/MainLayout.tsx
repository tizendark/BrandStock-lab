import { Outlet, useNavigate } from 'react-router-dom'
import { Package, LayoutDashboard, Boxes, LogOut, User } from 'lucide-react'

export default function MainLayout() {
  const navigate = useNavigate()

  const handleLogout = () => {
    // TODO: Implementar logout real
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary-600 text-white">
                <Package className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold text-gray-900">BrandStock</span>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-700">
                <User className="h-5 w-5" />
                <span className="text-sm font-medium">Usuario</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span className="text-sm">Cerrar sesión</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-[calc(100vh-64px)]">
          <nav className="p-4 space-y-2">
            <a
              href="/"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <LayoutDashboard className="h-5 w-5" />
              <span className="font-medium">Dashboard</span>
            </a>
            <a
              href="/products"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Boxes className="h-5 w-5" />
              <span className="font-medium">Catálogo de Productos</span>
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
