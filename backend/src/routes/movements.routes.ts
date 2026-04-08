import { Router } from 'express'
import * as MovementsController from '../controllers/movements.controller'
import { authenticate } from '../middleware/auth'
import { validate } from '../middleware/validation'
import { createMovementSchema } from '../utils/validators'

const router = Router()

// All movement routes require authentication
router.use(authenticate)

router.get('/', MovementsController.getAll)
router.get('/product/:productId', MovementsController.getByProduct)
router.post('/', validate(createMovementSchema), MovementsController.create)

export default router
