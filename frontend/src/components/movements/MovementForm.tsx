import { useState, type ChangeEvent, type FormEvent } from 'react';
import { FiChevronDown } from 'react-icons/fi';

export interface MovementFormData {
  type: 'entrada' | 'salida' | 'merma';
  productId: string;
  quantity: number;
  reason: string;
  notes: string;
}

interface MovementFormProps {
  onSubmit: (data: MovementFormData) => void;
  initialProductId?: string;
}

export const MovementForm = ({ onSubmit, initialProductId = '' }: MovementFormProps) => {
  const [formData, setFormData] = useState<MovementFormData>({
    type: 'entrada',
    productId: initialProductId,
    quantity: 1,
    reason: '',
    notes: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.productId || formData.quantity <= 0 || !formData.reason) {
      console.log('⚠️ Validación fallida: Campos requeridos incompletos');
      return;
    }

    console.log('🚀 Enviando movimiento:', formData);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Tipo de Movimiento */}
      <div>
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
          Tipo de Operación
        </label>
        <div className="grid grid-cols-3 gap-3">
          {(['entrada', 'salida', 'merma'] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, type }))}
              className={`py-2 text-sm font-bold rounded-lg border transition-all capitalize ${
                formData.type === type
                  ? 'bg-primary-600 border-primary-600 text-white'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-primary-400'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Producto (Read-only if pre-selected) */}
      <div>
        <label htmlFor="productId" className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
          ID del Producto
        </label>
        <input
          type="text"
          id="productId"
          name="productId"
          value={formData.productId}
          onChange={handleChange}
          readOnly={!!initialProductId}
          className={`w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${
            initialProductId ? 'bg-gray-50 text-gray-500' : ''
          }`}
          placeholder="Ej: P001"
          required
        />
      </div>

      {/* Cantidad */}
      <div>
        <label htmlFor="quantity" className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
          Cantidad
        </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          min="1"
          value={formData.quantity}
          onChange={handleChange}
          className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
          required
        />
      </div>

      {/* Motivo */}
      <div className="relative">
        <label htmlFor="reason" className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
          Motivo / Concepto
        </label>
        <select
          id="reason"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm appearance-none focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
          required
        >
          <option value="">Selecciona un motivo</option>
          <option value="compra">Compra de stock</option>
          <option value="venta">Venta al cliente</option>
          <option value="devolucion">Devolución</option>
          <option value="ajuste">Ajuste de inventario</option>
          <option value="dano">Daño / Merma</option>
        </select>
        <FiChevronDown className="absolute right-4 bottom-3 text-gray-400 pointer-events-none" />
      </div>

      {/* Notas */}
      <div>
        <label htmlFor="notes" className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
          Notas adicionales (opcional)
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          value={formData.notes}
          onChange={handleChange}
          className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none"
          placeholder="Escribe observaciones aquí..."
        ></textarea>
      </div>

      {/* Hidden Submit Button (triggered by Modal) */}
      <button type="submit" id="movement-form-submit" className="hidden">Submit</button>
    </form>
  );
};
