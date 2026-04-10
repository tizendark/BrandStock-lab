import { apiFetch } from '../lib/api';

export interface DashboardStats {
  totalProducts: number;
  lowStockCount: number;
  movementsToday: number;
}

export interface RecentMovement {
  id: number;
  productId: number;
  type: 'entrada' | 'salida' | 'merma';
  quantity: number;
  reason: string;
  notes?: string;
  createdAt: string;
  productName: string;
  productSku: string;
}

export interface CategoryStock {
  category: string;
  totalStock: number;
}

export interface DashboardData extends DashboardStats {
  recentMovements: RecentMovement[];
  stockByCategory: CategoryStock[];
}

export const getDashboardData = async (): Promise<DashboardData> => {
  const response = await apiFetch<{ success: boolean, data: DashboardData }>('/dashboard/stats');
  return response.data;
};
