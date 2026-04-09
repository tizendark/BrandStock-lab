import { Router } from 'express'
import * as MovementsController from '../controllers/movements.controller'
import { authenticate } from '../middleware/auth'
import { validate } from '../middleware/validation'
import { createMovementSchema } from '../utils/validators'

const router = Router()

// All movement routes require authentication
router.use(authenticate)

// GET /api/movements/recent - Get recent movements (MUST be before /:param routes)
router.get('/recent', MovementsController.getRecent)

// GET /api/movements - Get all movements history
router.get('/', MovementsController.getAll)

// POST /api/movements - Create a new movement
router.post('/', validate(createMovementSchema), MovementsController.create)

export default router
