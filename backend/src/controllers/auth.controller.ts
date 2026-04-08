import { Request, Response, NextFunction } from 'express'
import * as AuthService from '../services/auth.service'

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body
    const result = await AuthService.login(email, password)
    res.json({ success: true, data: result })
  } catch (error) {
    next(error)
  }
}

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, password, role } = req.body
    const result = await AuthService.register(name, email, password, role)
    res.status(201).json({ success: true, data: result })
  } catch (error) {
    next(error)
  }
}
