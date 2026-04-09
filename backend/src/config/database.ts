import sql from 'mssql'
import dotenv from 'dotenv'
dotenv.config()

const sqlConfig: sql.config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  server: process.env.DB_SERVER!,
  port: 1433,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true,
    trustServerCertificate: false,
    enableArithAbort: true,
    connectTimeout: 30000,
    requestTimeout: 30000
  },
  connectionTimeout: 30000
}

let pool: sql.ConnectionPool | null = null

export const connectDB = async (): Promise<void> => {
  try {
    pool = await sql.connect(sqlConfig)
    console.log('✅ Conectado a Azure SQL Database: brandstock-db')
  } catch (err) {
    console.error('❌ Error de conexión a SQL Server:', err)
    process.exit(1)
  }
}

export const getPool = async (): Promise<sql.ConnectionPool> => {
  if (!pool) {
    pool = await sql.connect(sqlConfig)
  }
  return pool
}

export { sql }
