import * as DashboardModel from '../models/dashboard.model'

/**
 * @description Aggregates all dashboard KPI data
 */
export const getStats = async () => {
  const [stats, stockByCategory, recentMovements] = await Promise.all([
    DashboardModel.getStats(),
    DashboardModel.getStockByCategory(),
    DashboardModel.getRecentMovements(5)
  ])

  return {
    ...stats,
    stockByCategory,
    recentMovements
  }
}
