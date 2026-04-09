import { useEffect, useState } from 'react';
import { 
  FiPlus, 
  FiChevronLeft, 
  FiChevronRight,
  FiRefreshCw,
  FiPackage,
  FiAlertTriangle
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { ActionButton } from '../components/ActionButton';
import { PageTitle } from '../components/PageTitle';
import { ProductCard } from '../components/products/ProductCard';
import { getProducts, type ProductsResponse } from '../services/productService';
import { ActionModal } from '../components/ui/ActionModal';
import { MovementForm, type MovementFormData } from '../components/movements/MovementForm';
import { createMovement } from '../services/movementService';

export default function Products() {
  const navigate = useNavigate();
  const [productsData, setProductsData] = useState<ProductsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const loadProducts = async (page: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getProducts(page, 10);
      setProductsData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar productos');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts(currentPage);
  }, [currentPage]);

  const handleOpenMovement = (id: string) => {
    setSelectedProductId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProductId(null);
  };

  const handleMovementSubmit = async (data: MovementFormData) => {
    try {
      await createMovement(data);
      alert('Movimiento registrado con éxito');
      handleCloseModal();
      loadProducts(currentPage);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al registrar movimiento');
    }
  };

  if (isLoading && !productsData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <FiRefreshCw className="h-10 w-10 text-primary-600 animate-spin" />
        <p className="text-gray-500 font-medium">Cargando catálogo...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageTitle 
        title="Catálogo de Productos"
        subtitle={`${productsData?.pagination.total || 0} productos encontrados`}
        action={
          <ActionButton onClick={() => navigate('/products/new')}>
            <FiPlus className="h-5 w-5 mr-2" />
            Nuevo Producto
          </ActionButton>
        }
      />

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 text-red-700">
          <FiAlertTriangle />
          <p>{error}</p>
          <button onClick={() => loadProducts(currentPage)} className="ml-auto font-bold underline">Reintentar</button>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {productsData?.products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAction={handleOpenMovement} 
          />
        ))}
      </div>

      {productsData?.products.length === 0 && !isLoading && (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
          <FiPackage className="mx-auto h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No hay productos</h3>
          <p className="text-gray-500">Comienza agregando un nuevo producto al catálogo.</p>
        </div>
      )}

      {/* Pagination */}
      {productsData && productsData.pagination.totalPages > 1 && (
        <div className="flex items-center justify-between bg-white px-6 py-4 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500">
            Página <span className="font-bold text-gray-900">{currentPage}</span> de {productsData.pagination.totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-200 disabled:opacity-50 hover:bg-gray-100 transition-colors"
            >
              <FiChevronLeft />
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(productsData.pagination.totalPages, p + 1))}
              disabled={currentPage === productsData.pagination.totalPages}
              className="p-2 rounded-lg border border-gray-200 disabled:opacity-50 hover:bg-gray-100 transition-colors"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      )}

      <ActionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Registrar Movimiento"
        actions={[
          { 
            label: 'Confirmar', 
            variant: 'primary', 
            onClick: () => document.getElementById('movement-form-submit')?.click() 
          }
        ]}
      >
        <MovementForm 
          initialProductId={selectedProductId || ''}
          onSubmit={handleMovementSubmit}
        />
      </ActionModal>
    </div>
  );
}
