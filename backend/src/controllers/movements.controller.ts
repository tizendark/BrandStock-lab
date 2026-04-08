import { Response, NextFunction } from 'express'
import { AuthRequest } from '../middleware/auth'
import * as MovementsService from '../services/movements.service'

export const getAll = async (_req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const movements = await MovementsService.getAll()
    res.json({ success: true, data: movements })
  } catch (error) {
    next(error)
  }
}

export const getByProduct = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const productId = parseInt(req.params.productId, 10)
    const movements = await MovementsService.getByProduct(productId)
    res.json({ success: true, data: movements })
  } catch (error) {
    next(error)
  }
}

export const create = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user!.id
    const movement = await MovementsService.create({ ...req.body, userId })
    res.status(201).json({ success: true, data: movement })
  } catch (error) {
    next(error)
  }
}
