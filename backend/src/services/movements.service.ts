import * as MovementsModel from '../models/movements.model'
import * as ProductsModel from '../models/products.model'
import { ApiError } from '../middleware/errorHandler'
import { sql, getPool } from '../config/database'

export const getAll = async () => {
  return await MovementsModel.getAllMovements()
}

export const getByProduct = async (productId: number) => {
  const product = await ProductsModel.getProductById(productId)
  if (!product) {
    throw new ApiError(404, 'Product not found')
  }
  return await MovementsModel.getMovementsByProduct(productId)
}

export const create = async (data: {
  productId: number; type: string; quantity: number;
  reason: string; notes?: string; userId: number
}) => {
  // Verify product exists
  const product = await ProductsModel.getProductById(data.productId)
  if (!product) {
    throw new ApiError(404, 'Product not found')
  }

  // Validate stock for outgoing movements
  if (data.type === 'out' && product.stock < data.quantity) {
    throw new ApiError(400, `Insufficient stock. Available: ${product.stock}, Requested: ${data.quantity}`)
  }

  // Create movement
  const movement = await MovementsModel.createMovement(data)

  // Update product stock
  const newStock = data.type === 'in' 
    ? product.stock + data.quantity 
    : product.stock - data.quantity

  const pool = await getPool()
  await pool.request()
    .input('id', sql.Int, data.productId)
    .input('stock', sql.Int, newStock)
    .query('UPDATE Products SET stock = @stock, updatedAt = GETDATE() WHERE id = @id')

  return movement
}
