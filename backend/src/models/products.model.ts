import { sql, getPool } from '../config/database'

export const getAllProducts = async () => {
  const pool = await getPool()
  const result = await pool.request()
    .query('SELECT * FROM Products ORDER BY createdAt DESC')
  return result.recordset
}

export const getProductById = async (id: number) => {
  const pool = await getPool()
  const result = await pool.request()
    .input('id', sql.Int, id)
    .query('SELECT * FROM Products WHERE id = @id')
  return result.recordset[0] || null
}

export const createProduct = async (data: {
  name: string; sku: string; description?: string;
  category: string; price: number; stock: number; minStock: number
}) => {
  const pool = await getPool()
  const result = await pool.request()
    .input('name', sql.NVarChar, data.name)
    .input('sku', sql.NVarChar, data.sku)
    .input('description', sql.NVarChar, data.description || null)
    .input('category', sql.NVarChar, data.category)
    .input('price', sql.Decimal(10, 2), data.price)
    .input('stock', sql.Int, data.stock)
    .input('minStock', sql.Int, data.minStock)
    .query(`
      INSERT INTO Products (name, sku, description, category, price, stock, minStock, createdAt)
      OUTPUT INSERTED.*
      VALUES (@name, @sku, @description, @category, @price, @stock, @minStock, GETDATE())
    `)
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

export const deleteProduct = async (id: number) => {
  const pool = await getPool()
  const result = await pool.request()
    .input('id', sql.Int, id)
    .query('DELETE FROM Products OUTPUT DELETED.* WHERE id = @id')
  return result.recordset[0] || null
}
