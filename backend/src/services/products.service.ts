import * as ProductsModel from '../models/products.model'
import { ApiError } from '../middleware/errorHandler'

interface GetAllParams {
  page?: number
  limit?: number
  search?: string
  category?: string
  status?: string
}

interface PaginationResult {
  products: unknown[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export const getAll = async (params: GetAllParams = {}): Promise<PaginationResult> => {
  const page = params.page || 1
  const limit = params.limit || 10

  const { products, total } = await ProductsModel.getAllProducts({ page, limit, search: params.search, category: params.category, status: params.status })

  const totalPages = Math.ceil(total / limit)

  return {
    products,
    pagination: {
      page,
      limit,
      total,
      totalPages
    }
  }
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

export const toggleStatus = async (id: number, isActive: boolean) => {
  const product = await ProductsModel.updateProductStatus(id, isActive)
  if (!product) {
    throw new ApiError(404, 'Product not found')
  }
  return product
}
