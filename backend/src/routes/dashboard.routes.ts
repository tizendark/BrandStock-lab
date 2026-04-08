import { Router } from 'express'
import { authenticate } from '../middleware/auth'

const router = Router()

// All dashboard routes require authentication
router.use(authenticate)

// GET /api/dashboard - Get dashboard KPIs
router.get('/', async (_req, res, next) => {
  try {
    // TODO: Implement dashboard KPI aggregation
    res.json({
      success: true,
      data: {
        totalProducts: 0,
        totalMovements: 0,
        lowStockCount: 0,
        recentMovements: []
      }
    })
  } catch (error) {
    next(error)
  }
})

export default router
