import { useEffect, type ReactNode } from 'react';
import { FiX } from 'react-icons/fi';
import { ActionButton } from '../ActionButton';

interface Action {
  label: string;
  variant: 'primary' | 'danger' | 'secondary';
  onClick: () => void;
}

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  actions: Action[];
}

export const ActionModal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  actions 
}: ActionModalProps) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 max-h-[70vh] overflow-y-auto">
          {children}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 flex flex-row-reverse gap-3">
          {actions.map((action, index) => (
            <ActionButton
              key={index}
              variant={action.variant}
              onClick={action.onClick}
              size="md"
            >
              {action.label}
            </ActionButton>
          ))}
          <ActionButton
            variant="ghost"
            onClick={onClose}
            size="md"
          >
            Cancelar
          </ActionButton>
        </div>
      </div>
    </div>
  );
};
