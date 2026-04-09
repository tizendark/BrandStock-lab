import * as DashboardModel from '../models/dashboard.model'

/**
 * @description Aggregates all dashboard KPI data
 */
export const getStats = async () => {
  const [stats, recentMovements] = await Promise.all([
    DashboardModel.getStats(),
    DashboardModel.getRecentMovements(5)
  ])

  return {
    ...stats,
    recentMovements
  }
}
