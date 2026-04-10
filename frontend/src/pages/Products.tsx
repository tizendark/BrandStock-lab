import { useEffect, useState, useCallback } from 'react';
import { 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  Loader2,
  Package,
  AlertCircle,
  Search,
  Filter,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getProducts, type ProductsResponse } from '../services/productService';

const categories = ['Electrónica', 'Hogar', 'Ropa', 'Alimentos'];
const statuses = [
  { label: 'Activo', value: 'active' },
  { label: 'Inactivo', value: 'inactive' }
];

export default function Products() {
  const navigate = useNavigate();
  const [productsData, setProductsData] = useState<ProductsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const loadProducts = useCallback(async (page: number, search?: string, category?: string, status?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getProducts(page, 10, search, category, status);
      setProductsData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar productos');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadProducts(currentPage, searchQuery, selectedCategory, selectedStatus);
    }, 300);
    return () => clearTimeout(timer);
  }, [currentPage, searchQuery, selectedCategory, selectedStatus, loadProducts]);

  const handleOpenMovement = (id: number) => {
    navigate(`/movements/new?productId=${id}`);
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-8 pb-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-[#101828]">Catálogo de Productos</h1>
          <p className="text-[#4A5565]">{productsData?.pagination.total || 0} productos encontrados</p>
        </div>
        <button
          onClick={() => navigate('/products/new')}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#155DFC] text-white font-medium rounded-lg hover:bg-blue-700 transition-all shadow-sm"
        >
          <Plus size={20} />
          Nuevo Producto
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-6 rounded-xl border border-[#D1D5DC] shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          <div className="flex-1 w-full space-y-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por código o nombre..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#F9FAFB] border border-[#D1D5DC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#155DFC] transition-all text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <p className="text-xs text-[#667085] flex items-center gap-1">
              <span className="text-[#155DFC]">→</span> Autocompletado en tiempo real
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="relative min-w-[200px]">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                className="w-full pl-9 pr-8 py-2.5 bg-[#F9FAFB] border border-[#D1D5DC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#155DFC] transition-all text-sm appearance-none cursor-pointer"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Todas las categorías</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="relative min-w-[180px]">
              <select
                className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#D1D5DC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#155DFC] transition-all text-sm appearance-none cursor-pointer"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">Todos los estados</option>
                {statuses.map(status => (
                  <option key={status.value} value={status.value}>{status.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 text-red-700">
          <AlertCircle size={20} />
          <p>{error}</p>
          <button onClick={() => loadProducts(currentPage, searchQuery, selectedCategory, selectedStatus)} className="ml-auto font-bold underline">Reintentar</button>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-[#D1D5DC] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#D1D5DC]">
                <th className="px-6 py-4 text-xs font-bold text-[#667085] uppercase tracking-wider">Código</th>
                <th className="px-6 py-4 text-xs font-bold text-[#667085] uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-4 text-xs font-bold text-[#667085] uppercase tracking-wider">Categoría</th>
                <th className="px-6 py-4 text-xs font-bold text-[#667085] uppercase tracking-wider text-center">Stock</th>
                <th className="px-6 py-4 text-xs font-bold text-[#667085] uppercase tracking-wider">Unidad</th>
                <th className="px-6 py-4 text-xs font-bold text-[#667085] uppercase tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAECF0]">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <Loader2 className="h-8 w-8 text-[#155DFC] animate-spin mx-auto" />
                    <p className="text-[#667085] mt-2 font-medium">Cargando catálogo...</p>
                  </td>
                </tr>
              ) : productsData?.products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <Package className="h-10 w-10 text-[#D0D5DD] mx-auto mb-2" />
                    <p className="text-[#667085] font-medium">No se encontraron productos</p>
                  </td>
                </tr>
              ) : (
                productsData?.products.map((product) => (
                  <tr key={product.id} className="hover:bg-[#F9FAFB] transition-colors group">
                    <td className="px-6 py-4 text-sm font-medium text-[#101828]">
                      {product.sku}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-[#101828] font-medium">{product.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2.5 py-1 rounded-lg text-xs font-medium bg-[#F2F4F7] text-[#344054] border border-[#D0D5DD]">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`text-sm font-bold ${product.stock <= product.minStock ? 'text-[#D92D20]' : 'text-[#101828]'}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#667085]">
                      {product.unit || 'Unidad'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleOpenMovement(product.id)}
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-[#155DFC] hover:text-[#004EEB] transition-colors"
                      >
                        Movimiento
                        <ArrowRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {productsData && productsData.pagination.totalPages > 1 && (
          <div className="px-6 py-4 bg-[#F9FAFB] border-t border-[#EAECF0] flex items-center justify-between">
            <p className="text-sm text-[#667085]">
              Página <span className="font-bold text-[#101828]">{currentPage}</span> de {productsData.pagination.totalPages}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-[#D0D5DD] bg-white disabled:opacity-50 hover:bg-[#F9FAFB] transition-colors shadow-sm"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setCurrentPage(p => Math.min(productsData.pagination.totalPages, p + 1))}
                disabled={currentPage === productsData.pagination.totalPages}
                className="p-2 rounded-lg border border-[#D0D5DD] bg-white disabled:opacity-50 hover:bg-[#F9FAFB] transition-colors shadow-sm"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
