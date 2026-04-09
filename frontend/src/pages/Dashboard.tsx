import { useState } from 'react';
import { 
  FiPackage, 
  FiAlertTriangle, 
  FiArrowRight,
  FiTrendingUp,
  FiTrendingDown
} from 'react-icons/fi';
import { PageTitle } from '../components/PageTitle';
import { InventoryContainer } from '../components/ui/InventoryContainer';
import { ProductCard, type Product } from '../components/products/ProductCard';
import { ActionModal } from '../components/ui/ActionModal';
import { MovementForm, type MovementFormData } from '../components/movements/MovementForm';

// Mock Data for Reto #7
const mockProducts: Product[] = [
  { id: '1', code: 'PROD-001', name: 'Laptop Dell Inspiron', stock: 5, min_stock: 10, category: 'Electrónica' },
  { id: '2', code: 'PROD-002', name: 'Mouse Inalámbrico', stock: 45, min_stock: 15, category: 'Accesorios' },
  { id: '3', code: 'PROD-003', name: 'Monitor 24" LG', stock: 2, min_stock: 5, category: 'Electrónica' },
  { id: '4', code: 'PROD-004', name: 'Teclado Mecánico', stock: 20, min_stock: 10, category: 'Accesorios' },
];

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const handleOpenMovement = (id: string) => {
    setSelectedProductId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProductId(null);
  };

  const handleMovementSubmit = (data: MovementFormData) => {
    console.log('✅ Éxito: Movimiento registrado para el producto', data.productId);
    alert(`Movimiento de ${data.type} registrado correctamente.`);
    handleCloseModal();
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Page Header */}
      <PageTitle 
        title="Dashboard de Inventario"
        subtitle="Monitoreo de stock y movimientos en tiempo real"
      />

      {/* KPI Stats (Quick Overview) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5">
          <div className="p-4 bg-blue-100 text-blue-600 rounded-xl">
            <FiPackage size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Productos</p>
            <p className="text-2xl font-black text-gray-900">1,248</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5">
          <div className="p-4 bg-amber-100 text-amber-600 rounded-xl">
            <FiAlertTriangle size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Stock Bajo</p>
            <p className="text-2xl font-black text-amber-600">12</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5">
          <div className="p-4 bg-green-100 text-green-600 rounded-xl">
            <FiTrendingUp size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Movimientos Hoy</p>
            <p className="text-2xl font-black text-green-600">85</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Section: Product Catalog Mapping */}
        <div className="lg:col-span-2 space-y-6">
          <InventoryContainer 
            title="Catálogo Rápido" 
            subtitle="Mapeo dinámico de productos para registro veloz"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mockProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAction={handleOpenMovement} 
                />
              ))}
            </div>
          </InventoryContainer>
        </div>

        {/* Sidebar: Activity/Alerts */}
        <div className="space-y-6">
          <InventoryContainer 
            title="Alertas Críticas" 
            variant="alert"
            subtitle="Productos que requieren reposición inmediata"
          >
            <div className="space-y-4">
              {mockProducts.filter(p => p.stock <= p.min_stock).map(p => (
                <div key={p.id} className="flex items-center justify-between p-3 bg-white rounded-xl border border-amber-100 shadow-sm">
                  <div className="flex items-center gap-3">
                    <FiAlertTriangle className="text-amber-500" size={18} />
                    <div>
                      <p className="text-sm font-bold text-gray-900">{p.name}</p>
                      <p className="text-[10px] text-amber-600 font-bold uppercase">Stock: {p.stock} / {p.min_stock}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleOpenMovement(p.id)}
                    className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                  >
                    <FiArrowRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          </InventoryContainer>

          <InventoryContainer 
            title="Actividad Reciente" 
            variant="info"
            subtitle="Últimos 5 movimientos"
          >
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-blue-100 last:border-0">
                  {i % 2 === 0 ? <FiTrendingDown className="text-red-500" /> : <FiTrendingUp className="text-green-500" />}
                  <div className="flex-1">
                    <p className="text-xs font-bold text-gray-900">Venta de Laptop Dell</p>
                    <p className="text-[10px] text-gray-400">Hace {i * 10} minutos</p>
                  </div>
                  <p className="text-xs font-black text-gray-700">{i % 2 === 0 ? '-' : '+'}{i * 5}</p>
                </div>
              ))}
            </div>
          </InventoryContainer>
        </div>
      </div>

      {/* Reto #7 Modal & Form Integration */}
      <ActionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Registrar Movimiento de Inventario"
        actions={[
          { 
            label: 'Confirmar Movimiento', 
            variant: 'primary', 
            onClick: () => {
              // Triggering form submit programmatically
              const formSubmitBtn = document.getElementById('movement-form-submit');
              if (formSubmitBtn) formSubmitBtn.click();
            } 
          }
        ]}
      >
        <p className="text-sm text-gray-500 mb-6">
          Completa los datos para actualizar el stock del producto seleccionado.
        </p>
        <MovementForm 
          initialProductId={selectedProductId || ''}
          onSubmit={handleMovementSubmit}
        />
      </ActionModal>
    </div>
  );
}
