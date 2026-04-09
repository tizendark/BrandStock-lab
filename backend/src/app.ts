import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
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

// Servir archivos estáticos del Frontend si existe la ruta configurada
// Útil para despliegues conjuntos en un solo App Service
if (process.env.SERVE_FRONTEND === 'true') {
  const frontendPath = path.join(__dirname, '../../frontend/dist')
  app.use(express.static(frontendPath))
  
  // SPA support: Cualquier ruta no-API debe devolver el index.html
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'))
  })
}

// Rutas API
app.use('/api/v1', apiRouter)

// Ruta base
app.get('/', (req, res) => {
  res.json({ 
    message: 'BrandStock Backend API', 
    version: '1.0.0',
    endpoints: '/api/v1'
  })
})

// 404 handler (Solo si no estamos sirviendo el frontend)
if (process.env.SERVE_FRONTEND !== 'true') {
  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Endpoint no encontrado' })
  })
}

// Error handler global
app.use(errorHandler)

export default app
