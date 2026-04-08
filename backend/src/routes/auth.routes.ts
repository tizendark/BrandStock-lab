import { Router } from 'express'
import * as AuthController from '../controllers/auth.controller'
import { validate } from '../middleware/validation'
import { loginSchema, registerSchema } from '../utils/validators'

const router = Router()

router.post('/login', validate(loginSchema), AuthController.login)
router.post('/register', validate(registerSchema), AuthController.register)

export default router
