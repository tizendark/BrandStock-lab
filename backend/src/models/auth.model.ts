import { sql, getPool } from '../config/database'

export const findUserByEmail = async (email: string) => {
  const pool = await getPool()
  const result = await pool.request()
    .input('email', sql.NVarChar, email)
    .query('SELECT * FROM Users WHERE email = @email')
  return result.recordset[0] || null
}

export const createUser = async (name: string, email: string, hashedPassword: string, role: string = 'employee') => {
  const pool = await getPool()
  const result = await pool.request()
    .input('name', sql.NVarChar, name)
    .input('email', sql.NVarChar, email)
    .input('password', sql.NVarChar, hashedPassword)
    .input('role', sql.NVarChar, role)
    .query(`
      INSERT INTO Users (name, email, password, role, createdAt)
      OUTPUT INSERTED.*
      VALUES (@name, @email, @password, @role, GETDATE())
    `)
  return result.recordset[0]
}
