import { Response, NextFunction } from 'express'
import { AuthRequest } from '../middleware/auth'
import * as ProductsService from '../services/products.service'

/**
 * Get all products with pagination, search, and category filter
 * Query params: page (default 1), limit (default 10), search, category
 */
export const getAll = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const search = req.query.search as string | undefined
    const category = req.query.category as string | undefined

    const result = await ProductsService.getAll({ page, limit, search, category })
    res.json({ success: true, data: result })
  } catch (error) {
    next(error)
  }
}

/**
 * Get a single product by ID
 */
export const getById = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10)
    const product = await ProductsService.getById(id)
    res.json({ success: true, data: product })
  } catch (error) {
    next(error)
  }
}

/**
 * Create a new product
 */
export const create = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const product = await ProductsService.create(req.body)
    res.status(201).json({ success: true, data: product })
  } catch (error) {
    next(error)
  }
}

/**
 * Update an existing product
 */
export const update = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10)
    const product = await ProductsService.update(id, req.body)
    res.json({ success: true, data: product })
  } catch (error) {
    next(error)
  }
}

/**
 * Toggle product active status
 */
export const updateStatus = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10)
    const { isActive } = req.body
    const product = await ProductsService.toggleStatus(id, isActive)
    res.json({ success: true, data: product })
  } catch (error) {
    next(error)
  }
}


