import { Request, Response, NextFunction } from 'express'
import * as DashboardService from '../services/dashboard.service'

/**
 * @route GET /api/v1/dashboard/stats
 * @description Returns aggregated KPI statistics for the dashboard
 */
export const getStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await DashboardService.getStats()
    res.json({ success: true, data })
  } catch (error) {
    next(error)
  }
}
