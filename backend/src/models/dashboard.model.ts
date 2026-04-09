import { sql, getPool } from '../config/database'

/**
 * @description Retrieves aggregated KPI statistics for the dashboard
 * @returns Object containing totalProducts, lowStockCount, movementsToday
 */
export const getStats = async () => {
  const pool = await getPool()

  const [productsResult, lowStockResult, movementsTodayResult] = await Promise.all([
    pool.request().query('SELECT COUNT(*) as total FROM Products'),
    pool.request().query('SELECT COUNT(*) as total FROM Products WHERE stock <= minStock'),
    pool.request().query('SELECT COUNT(*) as total FROM Movements WHERE CAST(createdAt AS DATE) = CAST(GETDATE() AS DATE)')
  ])

  return {
    totalProducts: productsResult.recordset[0].total,
    lowStockCount: lowStockResult.recordset[0].total,
    movementsToday: movementsTodayResult.recordset[0].total
  }
}

/**
 * @description Retrieves the most recent movements with product information
 * @param limit Number of recent movements to return (default: 5)
 */
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
