import { Router } from 'express'
import * as ProductsController from '../controllers/products.controller'
import { authenticate } from '../middleware/auth'
import { validate } from '../middleware/validation'
import { createProductSchema, updateProductSchema } from '../utils/validators'

const router = Router()

// All product routes require authentication
router.use(authenticate)

router.get('/', ProductsController.getAll)
router.get('/:id', ProductsController.getById)
router.post('/', validate(createProductSchema), ProductsController.create)
router.put('/:id', validate(updateProductSchema), ProductsController.update)
router.delete('/:id', ProductsController.remove)

export default router
