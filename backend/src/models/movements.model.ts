import { sql, getPool } from '../config/database'

export const getAllMovements = async () => {
  const pool = await getPool()
  const result = await pool.request()
    .query(`
      SELECT m.*, p.name as productName, p.sku as productSku
      FROM Movements m
      INNER JOIN Products p ON m.productId = p.id
      ORDER BY m.createdAt DESC
    `)
  return result.recordset
}

export const getMovementsByProduct = async (productId: number) => {
  const pool = await getPool()
  const result = await pool.request()
    .input('productId', sql.Int, productId)
    .query(`
      SELECT m.*, p.name as productName
      FROM Movements m
      INNER JOIN Products p ON m.productId = p.id
      WHERE m.productId = @productId
      ORDER BY m.createdAt DESC
    `)
  return result.recordset
}

export const createMovement = async (data: {
  productId: number; type: string; quantity: number;
  reason: string; notes?: string; userId: number
}) => {
  const pool = await getPool()
  const result = await pool.request()
    .input('productId', sql.Int, data.productId)
    .input('type', sql.NVarChar, data.type)
    .input('quantity', sql.Int, data.quantity)
    .input('reason', sql.NVarChar, data.reason)
    .input('notes', sql.NVarChar, data.notes || null)
    .input('userId', sql.Int, data.userId)
    .query(`
      INSERT INTO Movements (productId, type, quantity, reason, notes, userId, createdAt)
      OUTPUT INSERTED.*
      VALUES (@productId, @type, @quantity, @reason, @notes, @userId, GETDATE())
    `)
  return result.recordset[0]
}
