import { type ReactNode } from 'react';

interface InventoryContainerProps {
  title: string;
  subtitle?: string;
  variant?: 'default' | 'alert' | 'info';
  children: ReactNode;
}

export const InventoryContainer = ({ 
  title, 
  subtitle, 
  variant = 'default', 
  children 
}: InventoryContainerProps) => {
  const variantStyles = {
    default: 'bg-white border-gray-200',
    alert: 'bg-amber-50 border-amber-200',
    info: 'bg-blue-50 border-blue-200'
  };

  const titleStyles = {
    default: 'text-gray-900',
    alert: 'text-amber-900',
    info: 'text-blue-900'
  };

  return (
    <section className={`rounded-xl border p-6 shadow-sm transition-all ${variantStyles[variant]}`}>
      <div className="mb-6">
        <h2 className={`text-lg font-bold ${titleStyles[variant]}`}>{title}</h2>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      <div className="w-full">
        {children}
      </div>
    </section>
  );
};
