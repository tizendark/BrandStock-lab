import { FiPackage, FiAlertTriangle, FiArrowRight } from 'react-icons/fi';
import { ActionButton } from '../ActionButton';

export interface Product {
  id: number;
  sku: string;
  name: string;
  stock: number;
  minStock: number;
  category: string;
  price: number;
  description?: string;
  status: 'active' | 'inactive';
  unit?: string;
  createdAt: string;
  updatedAt?: string;
}

interface ProductCardProps {
  product: Product;
  onAction: (id: number) => void;
}

export const ProductCard = ({ product, onAction }: ProductCardProps) => {
  const isLowStock = product.stock <= product.minStock;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-gray-50 rounded-lg text-gray-500">
          <FiPackage size={20} />
        </div>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
          isLowStock 
            ? 'bg-red-100 text-red-700' 
            : 'bg-green-100 text-green-700'
        }`}>
          {isLowStock ? 'Stock Bajo' : 'Stock OK'}
        </span>
      </div>

      <div className="mb-4">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{product.sku}</span>
        <h3 className="text-base font-bold text-gray-900 truncate" title={product.name}>
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 mt-1">{product.category}</p>
      </div>

      <div className="flex items-center justify-between py-3 border-t border-b border-gray-50 mb-4">
        <div className="text-center flex-1">
          <p className="text-[10px] text-gray-400 font-bold uppercase">Actual</p>
          <p className={`text-lg font-bold ${isLowStock ? 'text-red-600' : 'text-gray-900'}`}>
            {product.stock}
          </p>
        </div>
        <div className="w-px h-8 bg-gray-100"></div>
        <div className="text-center flex-1">
          <p className="text-[10px] text-gray-400 font-bold uppercase">Mínimo</p>
          <p className="text-lg font-bold text-gray-900">{product.minStock}</p>
        </div>
      </div>

      <ActionButton 
        variant={isLowStock ? 'primary' : 'secondary'} 
        size="sm" 
        className="w-full justify-center"
        onClick={() => onAction(product.id)}
      >
        <span>Movimiento</span>
        <FiArrowRight size={14} />
      </ActionButton>
      
      {isLowStock && (
        <div className="mt-3 flex items-center gap-1.5 text-red-600">
          <FiAlertTriangle size={12} />
          <span className="text-[10px] font-bold uppercase">Reponer stock urgente</span>
        </div>
      )}
    </div>
  );
};
