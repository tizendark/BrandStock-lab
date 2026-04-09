import { Request, Response, NextFunction } from 'express'

interface AppError extends Error {
  statusCode?: number
  isOperational?: boolean
}

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  let statusCode = err.statusCode || 500
  let message = err.isOperational ? err.message : 'Internal Server Error'

  // Manejo específico de Timeouts de SQL Server
  if (err.message?.includes('Timeout') || err.code === 'ETIMEOUT') {
    statusCode = 504 // Gateway Timeout
    message = 'La base de datos está tardando demasiado en responder. Por favor, reintenta.'
  }

  console.error(`[ERROR] ${err.message}`, {
    statusCode,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  })

  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })
}

export class ApiError extends Error {
  statusCode: number
  isOperational: boolean

  constructor(statusCode: number, message: string) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = true
    Object.setPrototypeOf(this, ApiError.prototype)
  }
}
