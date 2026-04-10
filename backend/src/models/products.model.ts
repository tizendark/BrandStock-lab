import { sql, getPool } from '../config/database'

interface GetAllProductsParams {
  page?: number
  limit?: number
  search?: string
  category?: string
  status?: string
}

interface PaginationResult {
  products: unknown[]
  total: number
}

export const getAllProducts = async (params: GetAllProductsParams = {}): Promise<PaginationResult> => {
  const pool = await getPool()
  const page = params.page || 1
  const limit = params.limit || 10
  const offset = (page - 1) * limit

  // Build dynamic WHERE clause for count query
  const whereConditions: string[] = []
  const countRequest = pool.request()

  if (params.search) {
    whereConditions.push("(name LIKE @search OR sku LIKE @search)")
    countRequest.input('search', sql.NVarChar, `%${params.search}%`)
  }

  if (params.category) {
    whereConditions.push("category = @category")
    countRequest.input('category', sql.NVarChar, params.category)
  }

  if (params.status) {
    whereConditions.push("status = @status")
    countRequest.input('status', sql.NVarChar, params.status)
  }

  const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : ''

  // Get total count
  const countResult = await countRequest.query(`SELECT COUNT(*) as total FROM Products ${whereClause}`)
  const total = countResult.recordset[0].total

  // Build data query with same WHERE conditions
  const dataRequest = pool.request()
    .input('offset', sql.Int, offset)
    .input('limit', sql.Int, limit)

  if (params.search) {
    dataRequest.input('search', sql.NVarChar, `%${params.search}%`)
  }

  if (params.category) {
    dataRequest.input('category', sql.NVarChar, params.category)
  }

  if (params.status) {
    dataRequest.input('status', sql.NVarChar, params.status)
  }

  const dataResult = await dataRequest.query(`
    SELECT * FROM Products 
    ${whereClause}
    ORDER BY createdAt DESC 
    OFFSET @offset ROWS 
    FETCH NEXT @limit ROWS ONLY
  `)

  return {
    products: dataResult.recordset,
    total
  }
}

export const getProductById = async (id: number) => {
  const result = await sql.query`SELECT * FROM Products WHERE id = ${id}`
  return result.recordset[0] || null
}

export const createProduct = async (data: {
  name: string; sku: string; description?: string;
  category: string; price: number; stock: number; minStock: number
}) => {
  const result = await sql.query`
    INSERT INTO Products (name, sku, description, category, price, stock, minStock, createdAt)
    OUTPUT INSERTED.*
    VALUES (
      ${data.name}, 
      ${data.sku}, 
      ${data.description || null}, 
      ${data.category}, 
      ${data.price}, 
      ${data.stock}, 
      ${data.minStock}, 
      GETDATE()
    )
  `
  return result.recordset[0]
}

export const updateProduct = async (id: number, data: Record<string, unknown>) => {
  const pool = await getPool()
  const request = pool.request().input('id', sql.Int, id)
  
  const setClauses: string[] = []
  if (data.name !== undefined) { request.input('name', sql.NVarChar, data.name as string); setClauses.push('name = @name') }
  if (data.sku !== undefined) { request.input('sku', sql.NVarChar, data.sku as string); setClauses.push('sku = @sku') }
  if (data.description !== undefined) { request.input('description', sql.NVarChar, data.description as string); setClauses.push('description = @description') }
  if (data.category !== undefined) { request.input('category', sql.NVarChar, data.category as string); setClauses.push('category = @category') }
  if (data.price !== undefined) { request.input('price', sql.Decimal(10, 2), data.price as number); setClauses.push('price = @price') }
  if (data.minStock !== undefined) { request.input('minStock', sql.Int, data.minStock as number); setClauses.push('minStock = @minStock') }

  if (setClauses.length === 0) return null

  setClauses.push('updatedAt = GETDATE()')
  const result = await request.query(`
    UPDATE Products SET ${setClauses.join(', ')} OUTPUT INSERTED.* WHERE id = @id
  `)
  return result.recordset[0] || null
}

export const updateProductStatus = async (id: number, isActive: boolean) => {
  const result = await sql.query`
    UPDATE Products 
    SET isActive = ${isActive}, updatedAt = GETDATE() 
    OUTPUT INSERTED.* 
    WHERE id = ${id}
  `
  return result.recordset[0] || null
}
