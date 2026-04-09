import { Package, User, LogOut } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const Header = () => {
  const { state, logout } = useAppContext();

  return (
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
              <span className="text-sm font-medium">{state.user?.name || 'Usuario'}</span>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span className="text-sm">Cerrar sesión</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
