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

export interface DashboardData extends DashboardStats {
  recentMovements: RecentMovement[];
}

export const getDashboardData = async (): Promise<DashboardData> => {
  return apiFetch<DashboardData>('/dashboard/stats');
};
