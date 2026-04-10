import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
import { errorHandler } from './middleware/errorHandler'
import authRouter from './routes/auth.routes'
import apiRouter from './routes/index'

const app = express()

// CORS config para frontend en Vite y GitHub Pages
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://tizendark.github.io',
      'https://brandstock-app-ddcgedc9fag8b4ha.brazilsouth-01.azurewebsites.net'
    ]
    // Permitir requests sin origen (Postman, curl, etc.) o orígenes permitidos
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      console.log(`CORS bloqueado para origen: ${origin}`)
      callback(new Error('Not allowed by CORS'), false)
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true
}

// Middlewares
app.use(cors(corsOptions))
app.options('*', cors(corsOptions)) // Habilitar preflight para todos los endpoints
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
