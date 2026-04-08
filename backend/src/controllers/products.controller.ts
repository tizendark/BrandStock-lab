import { Response, NextFunction } from 'express'
import { AuthRequest } from '../middleware/auth'
import * as ProductsService from '../services/products.service'

export const getAll = async (_req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const products = await ProductsService.getAll()
    res.json({ success: true, data: products })
  } catch (error) {
    next(error)
  }
}

export const getById = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10)
    const product = await ProductsService.getById(id)
    res.json({ success: true, data: product })
  } catch (error) {
    next(error)
  }
}

export const create = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const product = await ProductsService.create(req.body)
    res.status(201).json({ success: true, data: product })
  } catch (error) {
    next(error)
  }
}

export const update = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10)
    const product = await ProductsService.update(id, req.body)
    res.json({ success: true, data: product })
  } catch (error) {
    next(error)
  }
}

export const remove = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10)
    const product = await ProductsService.remove(id)
    res.json({ success: true, message: 'Product deleted', data: product })
  } catch (error) {
    next(error)
  }
}
