import http from 'http'
import dotenv from 'dotenv'
dotenv.config()

import app from '../src/app'
import { connectDB } from '../src/config/database'

const PORT = process.env.PORT || 3080

const server = http.createServer(app)

const startServer = async (): Promise<void> => {
  try {
    await connectDB()
    server.listen(PORT, () => {
      console.log(`🚀 BrandStock API running on http://localhost:${PORT}`)
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`)
    })
  } catch (error) {
    console.error('❌ Failed to start server:', error)
    process.exit(1)
  }
}

startServer()
