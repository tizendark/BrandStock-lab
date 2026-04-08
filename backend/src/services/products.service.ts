import * as ProductsModel from '../models/products.model'
import { ApiError } from '../middleware/errorHandler'

export const getAll = async () => {
  return await ProductsModel.getAllProducts()
}

export const getById = async (id: number) => {
  const product = await ProductsModel.getProductById(id)
  if (!product) {
    throw new ApiError(404, 'Product not found')
  }
  return product
}

export const create = async (data: {
  name: string; sku: string; description?: string;
  category: string; price: number; stock: number; minStock: number
}) => {
  return await ProductsModel.createProduct(data)
}

export const update = async (id: number, data: Record<string, unknown>) => {
  const product = await ProductsModel.updateProduct(id, data)
  if (!product) {
    throw new ApiError(404, 'Product not found')
  }
  return product
}

export const remove = async (id: number) => {
  const product = await ProductsModel.deleteProduct(id)
  if (!product) {
    throw new ApiError(404, 'Product not found')
  }
  return product
}
