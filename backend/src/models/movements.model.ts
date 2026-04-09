import { sql, getPool } from '../config/database'

export const getAllMovements = async () => {
  const result = await sql.query`
    SELECT m.*, p.name as productName, p.sku as productSku
    FROM Movements m
    INNER JOIN Products p ON m.productId = p.id
    ORDER BY m.createdAt DESC
  `
  return result.recordset
}

export const getMovementsByProduct = async (productId: number) => {
  const result = await sql.query`
    SELECT m.*, p.name as productName
    FROM Movements m
    INNER JOIN Products p ON m.productId = p.id
    WHERE m.productId = ${productId}
    ORDER BY m.createdAt DESC
  `
  return result.recordset
}

export const createMovement = async (data: {
  productId: number; type: string; quantity: number;
  reason: string; notes?: string; userId: number
}) => {
  const result = await sql.query`
    INSERT INTO Movements (productId, type, quantity, reason, notes, userId, createdAt)
    OUTPUT INSERTED.*
    VALUES (${data.productId}, ${data.type}, ${data.quantity}, ${data.reason}, ${data.notes || null}, ${data.userId}, GETDATE())
  `
  return result.recordset[0]
}

export const getRecentMovements = async (limit: number = 5) => {
  const pool = await getPool()
  const result = await pool.request()
    .input('limit', sql.Int, limit)
    .query(`
      SELECT TOP (@limit) m.*, p.name as productName, p.sku as productSku
      FROM Movements m
      INNER JOIN Products p ON m.productId = p.id
      ORDER BY m.createdAt DESC
    `)
  return result.recordset
}
