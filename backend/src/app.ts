import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { errorHandler } from './middleware/errorHandler'
import authRouter from './routes/auth.routes'
import apiRouter from './routes/index'

const app = express()

// CORS config para frontend en Vite
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true
}

// Middlewares
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev')) // Logging de requests

// Rutas API
app.use('/api/auth', authRouter)
app.use('/api/v1', apiRouter)

// Ruta base
app.get('/', (req, res) => {
  res.json({ 
    message: 'BrandStock Backend API', 
    version: '1.0.0',
    endpoints: '/api/docs' // Futuro: Swagger
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint no encontrado' })
})

// Error handler global
app.use(errorHandler)

export default app
