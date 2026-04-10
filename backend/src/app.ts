import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
import { errorHandler } from './middleware/errorHandler'
import authRouter from './routes/auth.routes'
import apiRouter from './routes/index'

const app = express()

// CORS config - PERMISIVA para diagnóstico
app.use(cors({
  origin: function(origin, callback) {
    // Permitir cualquier origen para diagnóstico
    // En producción, restrict this to specific domains
    console.log(`[CORS DEBUG] Origin: ${origin || 'no-origin'}`)
    callback(null, true)
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  credentials: true,
  optionsSuccessStatus: 200
}))

// Log todas las requests para diagnóstico
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
  next()
})

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// Servir archivos estáticos del Frontend si existe la ruta configurada
if (process.env.SERVE_FRONTEND === 'true') {
  const frontendPath = path.join(__dirname, '../../frontend/dist')
  app.use(express.static(frontendPath))
  
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

// 404 handler
if (process.env.SERVE_FRONTEND !== 'true') {
  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Endpoint no encontrado' })
  })
}

// Error handler global
app.use(errorHandler)

export default app
