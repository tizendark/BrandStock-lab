import { useEffect, useState } from 'react';
import { 
  FiPackage, 
  FiAlertTriangle, 
  FiTrendingUp,
  FiTrendingDown,
  FiRefreshCw
} from 'react-icons/fi';
import { PageTitle } from '../components/PageTitle';
import { InventoryContainer } from '../components/ui/InventoryContainer';
import { ProductCard, type Product } from '../components/products/ProductCard';
import { ActionModal } from '../components/ui/ActionModal';
import { MovementForm, type MovementFormData } from '../components/movements/MovementForm';
import { getDashboardData, type DashboardData } from '../services/dashboardService';
import { getProducts } from '../services/productService';
import { createMovement } from '../services/movementService';

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [stats, productsRes] = await Promise.all([
        getDashboardData(),
        getProducts(1, 4) // Solo 4 para el catálogo rápido
      ]);
      setDashboardData(stats);
      setProducts(productsRes.products);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar los datos');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

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
      alert(`Movimiento de ${data.type} registrado correctamente.`);
      handleCloseModal();
      loadData(); // Recargar datos para ver stock actualizado
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al registrar movimiento');
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <FiRefreshCw className="h-10 w-10 text-primary-600 animate-spin" />
        <p className="text-gray-500 font-medium">Cargando dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center max-w-2xl mx-auto mt-10">
        <FiAlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-lg font-bold text-red-900 mb-2">Error de Conexión</h2>
        <p className="text-red-700 mb-6">{error}</p>
        <button 
          onClick={loadData}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
        >
          Reintentar conexión
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageTitle 
        title="Dashboard de Inventario"
        subtitle="Monitoreo de stock y movimientos en tiempo real"
      />

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5">
          <div className="p-4 bg-blue-100 text-blue-600 rounded-xl">
            <FiPackage size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Productos</p>
            <p className="text-2xl font-black text-gray-900">{dashboardData?.totalProducts || 0}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5">
          <div className="p-4 bg-amber-100 text-amber-600 rounded-xl">
            <FiAlertTriangle size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Stock Bajo</p>
            <p className="text-2xl font-black text-amber-600">{dashboardData?.lowStockCount || 0}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5">
          <div className="p-4 bg-green-100 text-green-600 rounded-xl">
            <FiTrendingUp size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Movimientos Hoy</p>
            <p className="text-2xl font-black text-green-600">{dashboardData?.movementsToday || 0}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <InventoryContainer 
            title="Catálogo Rápido" 
            subtitle="Mapeo dinámico de productos desde la API"
          >
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {products.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAction={handleOpenMovement} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                <FiPackage className="mx-auto h-10 w-10 text-gray-400 mb-3" />
                <p className="text-gray-500">No hay productos en el catálogo</p>
              </div>
            )}
          </InventoryContainer>
        </div>

        <div className="space-y-6">
          <InventoryContainer 
            title="Actividad Reciente" 
            variant="info"
            subtitle="Últimos movimientos registrados"
          >
            <div className="space-y-3">
              {dashboardData?.recentMovements && dashboardData.recentMovements.length > 0 ? (
                dashboardData.recentMovements.map((mov) => (
                  <div key={mov.id} className="flex items-center gap-3 py-2 border-b border-blue-100 last:border-0">
                    {mov.type === 'entrada' ? (
                      <FiTrendingUp className="text-green-500" />
                    ) : (
                      <FiTrendingDown className="text-red-500" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-900 truncate">{mov.productName}</p>
                      <p className="text-[10px] text-gray-400">
                        {new Date(mov.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <p className={`text-xs font-black ${mov.type === 'entrada' ? 'text-green-600' : 'text-red-600'}`}>
                      {mov.type === 'entrada' ? '+' : '-'}{mov.quantity}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center py-4 text-xs text-gray-400">Sin actividad reciente</p>
              )}
            </div>
          </InventoryContainer>
        </div>
      </div>

      <ActionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Registrar Movimiento de Inventario"
        actions={[
          { 
            label: 'Confirmar Movimiento', 
            variant: 'primary', 
            onClick: () => {
              const formSubmitBtn = document.getElementById('movement-form-submit');
              if (formSubmitBtn) formSubmitBtn.click();
            } 
          }
        ]}
      >
        <p className="text-sm text-gray-500 mb-6">
          Completa los datos para actualizar el stock real en la base de datos.
        </p>
        <MovementForm 
          initialProductId={selectedProductId || ''}
          onSubmit={handleMovementSubmit}
        />
      </ActionModal>
    </div>
  );
}
