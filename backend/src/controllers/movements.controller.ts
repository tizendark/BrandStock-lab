import { Response, NextFunction } from 'express'
import { AuthRequest } from '../middleware/auth'
import * as MovementsService from '../services/movements.service'

/**
 * Get all movements history with product information
 * Returns all movements ordered by most recent first
 */
export const getAll = async (_req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const movements = await MovementsService.getAll()
    res.json({ success: true, data: movements })
  } catch (error) {
    next(error)
  }
}

/**
 * Get movements for a specific product
 * Returns movements filtered by productId with product information
 */
export const getByProduct = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const productId = parseInt(req.params.productId, 10)
    const movements = await MovementsService.getByProduct(productId)
    res.json({ success: true, data: movements })
  } catch (error) {
    next(error)
  }
}

/**
 * Get the 5 most recent movements with product information
 * Used for dashboard activity feed
 */
export const getRecent = async (_req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const movements = await MovementsService.getRecent()
    res.json({ success: true, data: movements })
  } catch (error) {
    next(error)
  }
}

/**
 * Create a new movement (entrada or salida)
 * Validates stock availability for salida movements
 * Updates product stock after creating the movement
 */
export const create = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user!.id
    const movement = await MovementsService.create({ ...req.body, userId })
    res.status(201).json({ success: true, data: movement })
  } catch (error) {
    next(error)
  }
}
